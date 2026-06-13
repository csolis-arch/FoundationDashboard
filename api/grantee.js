// Vercel serverless function — grantee 990 / IRS lookup via ProPublica Nonprofit Explorer.
//
// Why a server function: ProPublica's API does not send CORS headers, so the
// browser can't call it directly. This thin proxy also lets Vercel's CDN cache
// responses (s-maxage) so we don't hammer the upstream.
//
// Query:  /api/grantee?q=<org name>   (optionally &ein=123456789 for an exact match)
// Returns a normalized record with the matched entity, IRS status, and the most
// recent 990 financials — plus a confidence flag so the UI can flag weak matches.

const PP = 'https://projects.propublica.org/nonprofits/api/v2';

// Words that don't help identify an org (so name-matching focuses on the distinctive parts).
const STOP = new Set(['inc', 'incorporated', 'the', 'of', 'for', 'and', 'a', 'an',
  'fund', 'assn', 'association', 'co', 'llc', 'ltd', 'org', 'organization']);

function tokens(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)
    .filter(t => t && !STOP.has(t));
}
// How many of the QUERY's words appear in the candidate name (query coverage).
// This rewards "Haven for Hope" -> "Haven For Hope Of Bexar County" as a strong
// match, since extra words in the legal name shouldn't be penalized.
function coverage(query, name) {
  const Q = tokens(query), N = new Set(tokens(name));
  if (!Q.length || !N.size) return 0;
  let hit = 0; Q.forEach(t => { if (N.has(t)) hit++; });
  return hit / Q.length;
}
// Symmetric similarity, used as a secondary tie-breaker in scoring.
function jaccard(a, b) {
  const A = new Set(tokens(a)), B = new Set(tokens(b));
  if (!A.size || !B.size) return 0;
  let hit = 0; A.forEach(t => { if (B.has(t)) hit++; });
  return hit / (A.size + B.size - hit);
}

async function getJSON(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'GFF-Dashboard/1.0' } });
  if (!r.ok) {
    const err = new Error('upstream ' + r.status);
    err.status = r.status;
    throw err;
  }
  return r.json();
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
  try {
    const q = (req.query.q || '').toString().trim();
    let ein = (req.query.ein || '').toString().replace(/\D/g, '');
    if (!q && !ein) { res.status(400).json({ error: 'missing q or ein' }); return; }

    let matched = null, confidence = 'none';

    if (!ein) {
      const sr = await getJSON(`${PP}/search.json?q=${encodeURIComponent(q)}&state%5Bid%5D=TX`);
      const orgs = sr.organizations || [];
      if (orgs.length) {
        orgs.forEach(o => {
          o._cov = coverage(q, o.name);
          o._score = o._cov * 4 + jaccard(q, o.name) * 2 +
            ((o.city || '').toLowerCase().includes('san antonio') ? 2 : 0);
        });
        orgs.sort((a, b) => b._score - a._score);
        const best = orgs[0];
        ein = String(best.ein);
        matched = { name: best.name, ein, city: best.city, state: best.state };
        // Strong when the grantee's name is essentially contained in the match.
        confidence = best._cov >= 0.75 ? 'high' : 'low';
      }
    }

    if (!ein) {
      res.status(200).json({ query: q, matched: null, confidence: 'none',
        source: 'ProPublica Nonprofit Explorer' });
      return;
    }

    // Deep link to the matched org's ProPublica profile so a reviewer can
    // open the underlying filings and confirm we matched the right entity.
    const profileUrl = 'https://projects.propublica.org/nonprofits/organizations/' + ein;

    // The org-detail endpoint can 404 even when search returned a name+EIN —
    // typically for 990-N "e-postcard" filers, auto-revoked orgs, or subordinates
    // under a group ruling that carry no machine-readable financial record.
    // In that case, still return what we DID find (name/EIN) plus a plain-English
    // note, rather than discarding everything as a raw "upstream 404".
    let od, org;
    try {
      od = await getJSON(`${PP}/organizations/${ein}.json`);
      org = od.organization || {};
    } catch (e) {
      const is404 = (e && e.status === 404);
      res.status(200).json({
        query: q,
        matched: matched || { name: null, ein: String(ein) },
        confidence: 'low',
        noDetail: true,
        note: is404
          ? 'No machine-readable Form 990 financials are published for this EIN. This is common for small organizations that file a 990-N "e-postcard" (under ~$50K in revenue), groups covered under a parent\u2019s group ruling, or organizations whose exempt status has lapsed. Use the link below to confirm on ProPublica.'
          : 'Could not retrieve this organization\u2019s detailed filing from ProPublica right now. The name match below is from the IRS search index; verify directly before relying on it.',
        irs: { subsection: null, rulingYear: null },
        financials: null,
        history: [],
        profileUrl,
        source: 'ProPublica Nonprofit Explorer',
      });
      return;
    }

    if (!matched) {
      matched = { name: org.name, ein: String(ein), city: org.city, state: org.state };
      confidence = 'high';
    }

    const filings = (od.filings_with_data || [])
      .filter(f => f && (f.totfuncexpns || f.totrevenue))
      .sort((a, b) => (b.tax_prd_yr || 0) - (a.tax_prd_yr || 0));
    const f = filings[0] || null;

    // Multi-year trend: up to the 5 most recent filed years, oldest → newest,
    // so the UI can chart the grantee's revenue/expense trajectory over time.
    const history = filings.slice(0, 5).map(x => ({
      fiscalYear: x.tax_prd_yr,
      totalRevenue: x.totrevenue,
      totalExpenses: x.totfuncexpns,
      totalAssets: x.totassetsend,
    })).reverse();

    // An active grantee should have a recent 990 on file. No filing, or a stale
    // one (>3 yrs old), often means the search hit a defunct shell or the wrong
    // subsidiary rather than the operating entity — flag it for human review.
    if (confidence === 'high') {
      const staleBefore = new Date().getFullYear() - 3;
      if (!f || (f.tax_prd_yr || 0) < staleBefore) confidence = 'low';
    }

    const subLabel = org.subsection_code === 3
      ? '501(c)(3)'
      : (org.subsection_code ? '501(c)(' + org.subsection_code + ')' : null);

    res.status(200).json({
      query: q,
      matched,
      confidence,
      irs: {
        subsection: subLabel,
        rulingYear: org.ruling_date ? String(org.ruling_date).slice(0, 4) : null,
      },
      financials: f ? {
        fiscalYear: f.tax_prd_yr,
        totalRevenue: f.totrevenue,
        totalExpenses: f.totfuncexpns,
        totalAssets: f.totassetsend,
        // Direct link to the filing PDF on ProPublica, when one is published.
        pdfUrl: f.pdf_url || null,
      } : null,
      history,
      profileUrl,
      source: 'ProPublica Nonprofit Explorer (IRS Form 990)',
    });
  } catch (e) {
    res.status(200).json({ error: String((e && e.message) || e), matched: null, confidence: 'none' });
  }
};
