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
    depHtml+=`<tr><td style="font-weight:500;color:var(--text)">${dd.org}</td><td style="text-align:center;font-family:'DM Mono',monospace;color:var(--text-muted)">${dd.grants}${dd.grants>=3?'<span class="conc-tag">3×</span>':''}</td><td class="mono gold-text">${fmtFull(dd.total)}</td><td><div style="display:flex;align-items:center;gap:8px"><div class="dep-bar-wrap"><div class="dep-bar-fill" style="width:${barW}%;background:var(--gold);opacity:0.7"></div></div><span style="font-size:11px;font-family:'DM Mono',monospace;color:var(--text-dim)">${pct}%</span></div><div style="font-size:10px;color:var(--text-dim);margin-top:2px">${dd.estimate}</div></td><td><span class="risk-badge ${riskMap[dd.risk]}">${riskLabel[dd.risk]}</span></td><td style="font-size:11.5px;color:var(--text-muted)">${dd.notes}</td></tr>`;
  });
  document.getElementById('dep-table').innerHTML=depHtml+'</tbody>';

  const multiGrants = d.multiGrants || [];
  let mgHtml='';
  multiGrants.forEach((m,i)=>{
    mgHtml+=`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(42,48,80,0.4)"><div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text-dim);width:22px;flex-shrink:0">${i+1}</div><div style="flex:1"><div style="font-size:13px;color:var(--text)">${m.org}</div><div style="font-size:10.5px;color:var(--text-dim);margin-top:2px">${m.note}</div></div><div style="text-align:right;flex-shrink:0"><div style="font-family:'DM Mono',monospace;font-size:12px;color:var(--gold-light)">${fmtFull(m.total)}</div><div style="font-size:10px;color:var(--text-dim)">${m.count} grants</div></div></div>`;
  });
  document.getElementById('multi-grant-list').innerHTML=mgHtml;
}
