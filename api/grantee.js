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
function nameOverlap(a, b) {
  const A = new Set(tokens(a)), B = new Set(tokens(b));
  if (!A.size || !B.size) return 0;
  let hit = 0; A.forEach(t => { if (B.has(t)) hit++; });
  return hit / Math.max(A.size, B.size);
}

async function getJSON(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'GFF-Dashboard/1.0' } });
  if (!r.ok) throw new Error('upstream ' + r.status);
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
          o._ov = nameOverlap(q, o.name);
          o._score = o._ov * 5 + ((o.city || '').toLowerCase().includes('san antonio') ? 2 : 0);
        });
        orgs.sort((a, b) => b._score - a._score);
        const best = orgs[0];
        ein = String(best.ein);
        matched = { name: best.name, ein, city: best.city, state: best.state };
        confidence = best._ov >= 0.6 ? 'high' : 'low';
      }
    }

    if (!ein) {
      res.status(200).json({ query: q, matched: null, confidence: 'none',
        source: 'ProPublica Nonprofit Explorer' });
      return;
    }

    const od = await getJSON(`${PP}/organizations/${ein}.json`);
    const org = od.organization || {};
    if (!matched) {
      matched = { name: org.name, ein: String(ein), city: org.city, state: org.state };
      confidence = 'high';
    }

    const filings = (od.filings_with_data || [])
      .filter(f => f && (f.totfuncexpns || f.totrevenue))
      .sort((a, b) => (b.tax_prd_yr || 0) - (a.tax_prd_yr || 0));
    const f = filings[0] || null;

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
      } : null,
      source: 'ProPublica Nonprofit Explorer (IRS Form 990)',
    });
  } catch (e) {
    res.status(200).json({ error: String((e && e.message) || e), matched: null, confidence: 'none' });
  }
};
