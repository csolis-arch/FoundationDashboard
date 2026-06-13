// Org Dependency Risk tab. Renders the grantee dependency-risk matrix and
// the multi-grant recipients list.

function renderDependency(year) {
  const d = DATA[year] || {};
  const depData = d.depData || [];
  const hasData = setTabData('dependency', depData.length > 0,
    'Dependency-risk analysis for 2026 will appear once the grant cycle is imported.');
  if (!hasData) return;

  const depYear = document.getElementById('dep-year');
  if (depYear) depYear.textContent = year;

  const depKpiRow = document.getElementById('dep-kpi-row');
  if (depKpiRow) depKpiRow.innerHTML = (d.depKpis || []).map(k =>
    `<div class="kpi-box ${k.cls}"><div class="kpi-val2">${k.val}</div><div class="kpi-label2">${k.label}</div></div>`).join('');

  const depInsightsList = document.getElementById('dep-insights-list');
  if (depInsightsList) depInsightsList.innerHTML = (d.depInsights || []).map(ins =>
    `<div class="insight-box"><div class="insight-box-title">${ins.title}</div><div class="insight-box-body">${ins.body}</div></div>`).join('');

  const grants = d.grants || [];
  const totalAmt = grants.reduce((s,g)=>s+g.amt,0) || depData.reduce((s,x)=>s+x.total,0);

  const riskOrder={high:0,medium:1,watch:2,low:3};
  const sorted=[...depData].sort((a,b)=>riskOrder[a.risk]-riskOrder[b.risk]||b.total-a.total);
  const maxDepTotal=Math.max(...depData.map(d=>d.total));
  const riskMap={high:'risk-high',medium:'risk-medium',watch:'risk-watch',low:'risk-low'};
  const riskLabel={high:'⚠ High',medium:'◑ Medium',watch:'◔ Watch',low:'✓ Low'};

  let depHtml=`<thead><tr><th>Organization</th><th># Grants</th><th>${year} Total</th><th>Share of Giving</th><th>Risk Level</th><th>Analyst Note</th></tr></thead><tbody>`;
  sorted.forEach(dd=>{
    const pct=(dd.total/totalAmt*100).toFixed(1);
    const barW=Math.round(dd.total/maxDepTotal*100);
    depHtml+=`<tr><td data-label="Organization" style="font-weight:500;color:var(--text)">${dd.org}<button class="dep-990-btn" data-org="${_depAttr(dd.org)}" data-total="${dd.total}" onclick="depLookup(this)" title="Pull this grantee's latest IRS Form 990">IRS&nbsp;990 ▾</button></td><td data-label="# Grants" style="text-align:center;font-family:'DM Mono',monospace;color:var(--text-muted)">${dd.grants}${dd.grants>=3?'<span class="conc-tag">3×</span>':''}</td><td data-label="${year} Total" class="mono gold-text">${fmtFull(dd.total)}</td><td data-label="Share of Giving" data-block><div style="display:flex;align-items:center;gap:8px"><div class="dep-bar-wrap"><div class="dep-bar-fill" style="width:${barW}%;background:var(--gold);opacity:0.7"></div></div><span style="font-size:11px;font-family:'DM Mono',monospace;color:var(--text-dim)">${pct}%</span></div><div style="font-size:10px;color:var(--text-dim);margin-top:2px">${dd.estimate}</div></td><td data-label="Risk Level"><span class="risk-badge ${riskMap[dd.risk]}">${riskLabel[dd.risk]}</span></td><td data-label="Analyst Note" data-block style="font-size:11.5px;color:var(--text-muted)">${dd.notes}</td></tr>`;
  });
  document.getElementById('dep-table').innerHTML=depHtml+'</tbody>';

  const multiGrants = d.multiGrants || [];
  let mgHtml='';
  multiGrants.forEach((m,i)=>{
    mgHtml+=`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(42,48,80,0.4)"><div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text-dim);width:22px;flex-shrink:0">${i+1}</div><div style="flex:1"><div style="font-size:13px;color:var(--text)">${m.org}</div><div style="font-size:10.5px;color:var(--text-dim);margin-top:2px">${m.note}</div></div><div style="text-align:right;flex-shrink:0"><div style="font-family:'DM Mono',monospace;font-size:12px;color:var(--gold-light)">${fmtFull(m.total)}</div><div style="font-size:10px;color:var(--text-dim)">${m.count} grants</div></div></div>`;
  });
  document.getElementById('multi-grant-list').innerHTML=mgHtml;
}

// ---- Live IRS 990 lookup (ProPublica via /api/grantee) ----------------------

function _depAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function _depStat(label, val, cls) {
  return '<div class="dep-stat ' + (cls || '') + '"><div class="dep-stat-label">' +
    label + '</div><div class="dep-stat-val">' + val + '</div></div>';
}

// Build a compact multi-year revenue/expense trend from the 990 history array.
function _depTrend(history) {
  if (!Array.isArray(history) || history.length < 2) return '';
  const maxV = Math.max(1, ...history.map(h =>
    Math.max(h.totalRevenue || 0, h.totalExpenses || 0)));
  const rows = history.map(h => {
    const rev = h.totalRevenue || 0, exp = h.totalExpenses || 0;
    return `<div class="dep-trend-row">
      <div class="dep-trend-yr">FY${h.fiscalYear}</div>
      <div class="dep-trend-bars">
        <div class="dep-trend-bar"><div class="dep-trend-fill rev" style="width:${(rev / maxV * 100).toFixed(1)}%"></div><span class="dep-trend-bar-lbl">${rev ? fmt(rev) : '—'}</span></div>
        <div class="dep-trend-bar"><div class="dep-trend-fill exp" style="width:${(exp / maxV * 100).toFixed(1)}%"></div><span class="dep-trend-bar-lbl">${exp ? fmt(exp) : '—'}</span></div>
      </div>
    </div>`;
  }).join('');
  return `<div class="dep-trend">
    <div class="dep-trend-title">${history.length}-Year Trend (per 990 filings)</div>
    ${rows}
    <div class="dep-trend-legend">
      <span><span class="dep-trend-swatch" style="background:rgba(91,141,238,0.6)"></span>Total revenue</span>
      <span><span class="dep-trend-swatch" style="background:rgba(201,168,76,0.6)"></span>Total expenses</span>
    </div>
  </div>`;
}

function _depDetailInner(d, org, ourTotal) {
  if (d && d.error && !d.matched) return '<div class="dep-detail-err">990 lookup error: ' + d.error + '</div>';
  if (!d || !d.matched) return '<div class="dep-detail-err">No reliable IRS / 990 match found for &ldquo;' + org + '&rdquo;. The organization may file under a different legal name.</div>';

  const m = d.matched, fin = d.financials, irs = d.irs || {};
  const einFmt = m.ein ? String(m.ein).replace(/^(\d{2})(\d+)$/, '$1-$2') : '';
  const low = d.confidence === 'low';
  const name = m.name || 'Name not published';

  const verifyLink = d.profileUrl
    ? ' <a class="dep-detail-link" href="' + d.profileUrl + '" target="_blank" rel="noopener">Verify on ProPublica ↗</a>'
    : '';

  // Detail record exists in the IRS search index, but ProPublica has no
  // machine-readable 990 to show — surface the match + a plain-English reason
  // instead of a raw error so the row is still actionable.
  if (d.noDetail) {
    return `<div class="dep-detail-head">
        <div><span class="dep-detail-name">${name}</span> ${m.ein ? '<span class="dep-detail-ein">EIN ' + einFmt + '</span>' : ''}</div>
        <span class="dep-match-flag warn">⚠ No 990 financials</span>
      </div>
      <div class="dep-detail-note">${d.note || 'No detailed filing available.'}</div>
      <div class="dep-detail-src">Source: ${d.source}.${verifyLink}</div>`;
  }

  const items = [];
  items.push(_depStat('IRS status', irs.subsection
    ? irs.subsection + (irs.rulingYear ? ' · IRS ruling ' + irs.rulingYear : '')
    : 'Not reported'));
  if (fin) {
    const fyVal = fin.pdfUrl
      ? '<a class="dep-detail-link" href="' + fin.pdfUrl + '" target="_blank" rel="noopener">FY' + fin.fiscalYear + ' ↗</a>'
      : 'FY' + fin.fiscalYear;
    items.push(_depStat('Latest 990', fyVal));
    if (fin.totalExpenses) items.push(_depStat('Total expenses', fmtFull(fin.totalExpenses)));
    if (fin.totalRevenue) items.push(_depStat('Total revenue', fmtFull(fin.totalRevenue)));
    if (fin.totalAssets) items.push(_depStat('Net assets (EOY)', fmtFull(fin.totalAssets)));
    if (fin.totalExpenses && ourTotal) {
      const share = ourTotal / fin.totalExpenses * 100;
      const shareStr = share >= 1 ? share.toFixed(1) + '%' : '<1%';
      items.push(_depStat('GFF grant ÷ their budget', shareStr, share >= 10 ? 'hot' : ''));
    }
  } else {
    items.push(_depStat('Latest 990', 'No financial filing on record'));
  }

  const flag = low
    ? '<span class="dep-match-flag warn">⚠ Possible match — verify</span>'
    : '<span class="dep-match-flag ok">✓ Matched</span>';

  return `<div class="dep-detail-head">
      <div><span class="dep-detail-name">${name}</span> <span class="dep-detail-ein">EIN ${einFmt}${m.city ? (' · ' + m.city + ', ' + m.state) : ''}</span></div>
      ${flag}
    </div>
    <div class="dep-detail-grid">${items.join('')}</div>
    ${_depTrend(d.history)}
    <div class="dep-detail-src">Source: ${d.source}. Figures reflect the most recent electronically filed Form 990 — confirm the matched entity above before relying on these numbers.${verifyLink}</div>`;
}

// Shared expand/collapse + fetch for any table row carrying a 990 lookup button
// (data-org, optional data-total). `colspan` matches the host table's columns so
// the inserted detail row spans the full width. Used by both the Dependency Risk
// matrix and the All-Grants registry.
function grantee990Expand(btn, colspan) {
  const org = btn.getAttribute('data-org');
  const total = parseFloat(btn.getAttribute('data-total')) || 0;
  const tr = btn.closest('tr');
  const next = tr.nextElementSibling;
  if (next && next.classList.contains('dep-detail-row')) {
    next.remove();
    btn.classList.remove('open');
    return;
  }
  const detail = document.createElement('tr');
  detail.className = 'dep-detail-row';
  detail.innerHTML = '<td colspan="' + colspan + '"><div class="dep-detail"><div class="dep-detail-loading">Pulling IRS 990 data from ProPublica…</div></div></td>';
  tr.parentNode.insertBefore(detail, tr.nextSibling);
  btn.classList.add('open');
  const cell = detail.querySelector('.dep-detail');
  fetch('/api/grantee?q=' + encodeURIComponent(org))
    .then(r => r.json())
    .then(d => { cell.innerHTML = _depDetailInner(d, org, total); })
    .catch(() => {
      cell.innerHTML = '<div class="dep-detail-err">Could not load 990 data. This live lookup only works on the deployed site — it needs the server function, so it won\'t run when the dashboard is opened directly from disk.</div>';
    });
}

function depLookup(btn) { grantee990Expand(btn, 6); }
