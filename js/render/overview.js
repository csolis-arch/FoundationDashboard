// Portfolio Overview tab. Computes per-year aggregations and renders the
// header KPIs, insight cards, focus-area bars, donut, month bars, recipients,
// size distribution, active pledges, and strategic-observation insights.

let _donutTotal = 0; // shared with donut hover handlers below

function renderOverview(year) {
  const d = DATA[year] || {};
  const grants = d.grants || [];
  const hasData = setTabData('overview', grants.length > 0,
    'The 2026 grant cycle has not been imported yet. Once the grant list is loaded, the full portfolio analysis will appear here.');

  if (!hasData) {
    document.getElementById('header-kpis').innerHTML = '';
    return;
  }

  const totalAmt = grants.reduce((s,g)=>s+g.amt,0);
  _donutTotal = totalAmt;
  const totalGrants = grants.length;
  const uniqueOrgs = [...new Set(grants.map(g=>g.org))].length;

  const catTotals={}, catCounts={};
  grants.forEach(g=>{
    catTotals[g.cat]=(catTotals[g.cat]||0)+g.amt;
    catCounts[g.cat]=(catCounts[g.cat]||0)+1;
  });
  const cats=Object.entries(catTotals).sort((a,b)=>b[1]-a[1]);

  const orgTotals={}, orgCats={}, orgCounts={};
  grants.forEach(g=>{
    orgTotals[g.org]=(orgTotals[g.org]||0)+g.amt;
    orgCats[g.org]=g.cat;
    orgCounts[g.org]=(orgCounts[g.org]||0)+1;
  });
  const topOrgs=Object.entries(orgTotals).sort((a,b)=>b[1]-a[1]).slice(0,15);

  const monthTotals={}, monthCounts={};
  grants.forEach(g=>{
    const m=parseInt(g.d.split('/')[0]);
    monthTotals[m]=(monthTotals[m]||0)+g.amt;
    monthCounts[m]=(monthCounts[m]||0)+1;
  });

  const sizeRanges=[
    {label:"≤ $5K",max:5000},{label:"$5K–$25K",max:25000},
    {label:"$25K–$100K",max:100000},{label:"$100K–$500K",max:500000},{label:"> $500K",max:Infinity}
  ];
  const sizeCounts=sizeRanges.map(r=>({...r,n:0,total:0}));
  grants.forEach(g=>{
    let prev=0;
    for(let i=0;i<sizeRanges.length;i++){
      if(g.amt>prev&&g.amt<=sizeRanges[i].max){sizeCounts[i].n++;sizeCounts[i].total+=g.amt;break;}
      prev=sizeRanges[i].max;
    }
  });

  const ovPledges = d.ovPledges || [];

  const novTotal=grants.filter(g=>g.d.startsWith('11')).reduce((s,g)=>s+g.amt,0);
  const novPct=Math.round(novTotal/totalAmt*100);

  // Prior-year reference figures (shown as a neutral "vs YYYY" line, not a
  // signed delta — the current year may be mid-cycle, which would mislead).
  const prev = DATA[year - 1];
  const pg = (prev && prev.grants) || [];
  // Only show the prior-year comparison when that year is enabled in the UI
  // (2025 is hidden pending re-verification — see YEARS_ENABLED in app.js).
  const prevEnabled = (typeof YEARS_ENABLED === 'undefined') || YEARS_ENABLED.includes(year - 1);
  const hasPrev = pg.length > 0 && prevEnabled;
  const pTot = pg.reduce((s, g) => s + g.amt, 0);
  const pOrg = new Set(pg.map(g => g.org)).size;
  const pCats = new Set(pg.map(g => g.cat)).size;
  const ref = v => hasPrev ? `<div class="kpi-ref">vs ${year - 1}: ${v}</div>` : '';

  document.getElementById('header-kpis').innerHTML=`
    <div class="kpi"><div class="kpi-val">${fmt(totalAmt)}</div><div class="kpi-label">Total Disbursed</div>${ref(fmt(pTot))}</div>
    <div class="kpi-divider"></div>
    <div class="kpi"><div class="kpi-val">${totalGrants}</div><div class="kpi-label">Grant Transactions</div>${ref(pg.length)}</div>
    <div class="kpi-divider"></div>
    <div class="kpi"><div class="kpi-val">${uniqueOrgs}</div><div class="kpi-label">Unique Recipients</div>${ref(pOrg)}</div>
    <div class="kpi-divider"></div>
    <div class="kpi"><div class="kpi-val">${cats.length}</div><div class="kpi-label">Focus Areas</div>${ref(pCats)}</div>
  `;

  // 5% distribution (RMD) compliance status — the family-facing headline.
  const comp = d.meta && d.meta.compliance;
  const statusEl = document.getElementById('overview-status');
  if (statusEl) {
    if (comp) {
      const cls = comp.status === 'ontrack' ? 'ok' : 'warn';
      const link = comp.linkTab
        ? `<button class="ov-status-link" onclick="switchTabById('${comp.linkTab}')">View 990 detail →</button>`
        : '';
      statusEl.innerHTML = `<div class="ov-status">
        <span class="status-chip ${cls}" title="${comp.detail || ''}"><span class="status-dot"></span>5% Distribution · ${comp.label}</span>
        <span class="ov-status-text">${comp.headline}</span>
        ${link}
      </div>`;
    } else {
      statusEl.innerHTML = '';
    }
  }

  document.getElementById('insight-grid').innerHTML = d.insightCards
    ? d.insightCards.map(c=>`<div class="insight-card ${c.cls}"><div class="insight-icon">${c.icon}</div><div class="insight-num">${c.num}</div><div class="insight-label">${c.label}</div></div>`).join('')
    : `
    <div class="insight-card gold"><div class="insight-icon">🏆</div><div class="insight-num">${fmt(cats[0][1])}</div><div class="insight-label">Largest bucket: <strong>${cats[0][0]}</strong> (${Math.round(cats[0][1]/totalAmt*100)}%)</div></div>
    <div class="insight-card blue"><div class="insight-icon">🏢</div><div class="insight-num">${fmt(topOrgs[0][1])}</div><div class="insight-label">Top recipient: <strong>${topOrgs[0][0].replace('Of Bexar County','').trim()}</strong></div></div>
    <div class="insight-card green"><div class="insight-icon">📅</div><div class="insight-num">${novPct}%</div><div class="insight-label">Disbursed in <strong>November</strong> — primary grant cycle</div></div>
    <div class="insight-card orange"><div class="insight-icon">🗂️</div><div class="insight-num">${cats.length}</div><div class="insight-label"><strong>Strategic giving buckets</strong> across the portfolio</div></div>
  `;

  // 2025-centric RMD/outlook card is hidden for years that opt out (e.g. 2026)
  const outlookCard = document.getElementById('overview-outlook');
  if (outlookCard) outlookCard.style.display =
    (d.meta && d.meta.config && d.meta.config.showOutlook === false) ? 'none' : '';

  const maxCatAmt=cats[0][1];
  let catHtml=`<div style="display:flex;gap:4px;font-size:10px;color:var(--text-dim);margin-bottom:8px"><div style="width:190px">FOCUS AREA</div><div style="flex:1">AMOUNT</div><div style="width:100px;text-align:right">TOTAL</div><div style="width:38px;text-align:right">#</div></div>`;
  cats.forEach(([cat,amt])=>{
    const color=CAT_COLORS[cat]||'#888';
    catHtml+=`<div class="cat-row"><div class="cat-label">${cat}</div><div class="cat-bar-wrap"><div class="cat-bar" style="width:${(amt/maxCatAmt*100).toFixed(1)}%;background:${color};opacity:0.85"></div></div><div class="cat-amt">${fmt(amt)}</div><div class="cat-count">${catCounts[cat]}</div></div>`;
  });
  const catBarsEl = document.getElementById('cat-bars');
  if(catBarsEl) catBarsEl.innerHTML=catHtml;

  const donutR=70,cx=85,cy=85;
  const donutData=[...cats.slice(0,9),cats.length>9?["Other",cats.slice(9).reduce((s,[,v])=>s+v,0)]:null].filter(Boolean);
  // Interactive paths
  let interactivePaths = '';
  let angleI = -Math.PI/2;
  donutData.forEach(([cat, amt]) => {
    const pct = amt/totalAmt, a1 = angleI, a2 = angleI + pct*2*Math.PI;
    const x1=cx+donutR*Math.cos(a1),y1=cy+donutR*Math.sin(a1),x2=cx+donutR*Math.cos(a2),y2=cy+donutR*Math.sin(a2);
    const ir=donutR*0.55,ix1=cx+ir*Math.cos(a1),iy1=cy+ir*Math.sin(a1),ix2=cx+ir*Math.cos(a2),iy2=cy+ir*Math.sin(a2);
    const color=cat==="Other"?"#444":CAT_COLORS[cat]||"#888";
    interactivePaths += `<path data-cat="${cat}" data-amt="${amt}" data-pct="${(pct*100).toFixed(1)}" d="M ${ix1} ${iy1} L ${x1} ${y1} A ${donutR} ${donutR} 0 ${pct>.5?1:0} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${ir} ${ir} 0 ${pct>.5?1:0} 0 ${ix1} ${iy1} Z" fill="${color}" opacity="0.85" stroke="var(--bg)" stroke-width="1.5" style="cursor:pointer;transition:opacity 0.15s" onmouseenter="donutHover(this)" onmouseleave="donutReset()"/>`;
    angleI = a2;
  });
  // Per-cat detail rows for right panel
  let detailHtml = '';
  donutData.forEach(([cat, amt]) => {
    const color = cat==="Other"?"#444":CAT_COLORS[cat]||"#888";
    detailHtml += `<div class="detail-row" data-cat="${cat}" style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;margin-bottom:4px;cursor:pointer;transition:background 0.15s" onmouseenter="donutHover2('${cat}')" onmouseleave="donutReset()">
      <div style="width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0"></div>
      <div style="flex:1;font-size:12px;color:var(--text-muted)">${cat}</div>
      <div style="font-family:'DM Mono',monospace;font-size:12px;color:${color};font-weight:600">${fmt(amt)}</div>
      <div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text-dim);width:38px;text-align:right">${(amt/totalAmt*100).toFixed(1)}%</div>
    </div>`;
  });
  document.getElementById('donut-area').innerHTML=`<svg class="donut-svg" width="190" height="190" viewBox="0 0 170 170" id="donut-svg">${interactivePaths}<text id="donut-label" x="${cx}" y="${cy-8}" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-family="DM Sans">TOTAL</text><text id="donut-amt" x="${cx}" y="${cy+9}" text-anchor="middle" fill="var(--gold-light)" font-size="13" font-weight="700" font-family="Playfair Display">${fmt(totalAmt)}</text><text id="donut-pct" x="${cx}" y="${cy+23}" text-anchor="middle" fill="var(--text-dim)" font-size="8" font-family="DM Sans"></text></svg>`;
  document.getElementById('donut-detail').innerHTML = `<div style="font-size:9px;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-dim);margin-bottom:8px;padding-left:12px">Hover a slice to explore</div>` + detailHtml;

  // Month bars (skipped when the year has no usable dates)
  const showMonthly = !(d.meta && d.meta.config && d.meta.config.showMonthly === false);
  const monthCard = document.getElementById('month-card');
  if (monthCard) monthCard.style.display = showMonthly ? '' : 'none';
  if (showMonthly) {
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const maxMonth=Math.max(...Object.values(monthTotals));
    let barsHtml='';
    for(let m=1;m<=12;m++){
      const amt=monthTotals[m]||0,cnt=monthCounts[m]||0;
      const h=amt>0?Math.max(8,Math.round(amt/maxMonth*130)):0;
      const color=m===11?"var(--gold)":m===6||m===7?"var(--accent1)":"var(--accent3)";
      barsHtml+=`<div class="month-col"><div class="month-bar-outer"><div class="month-bar-inner" style="height:${h}px;background:${color}">${amt>0?`<div class="tooltip">${months[m-1]}<br><strong>${fmt(amt)}</strong><br>${cnt} grant${cnt>1?'s':''}</div>`:''}</div></div><div class="month-label">${months[m-1]}</div><div class="month-amt">${amt>0?fmt(amt):'—'}</div></div>`;
    }
    document.getElementById('month-bars').innerHTML=barsHtml;
  }

  let tblHtml=`<thead><tr><th style="width:28px">#</th><th>Organization</th><th>Area</th><th>Grants</th><th>Total</th></tr></thead><tbody>`;
  topOrgs.forEach(([org,amt],i)=>{
    const color=CAT_COLORS[orgCats[org]]||'#888',cnt=orgCounts[org],short=org.length>32?org.slice(0,31)+'…':org;
    tblHtml+=`<tr><td class="rank-cell" data-label="Rank"><span class="rank-badge${i<3?' top3':''}">${i+1}</span></td><td data-label="Organization">${short}${cnt>1?`<span class="multi-grant">${cnt}×</span>`:''}</td><td data-label="Area"><span class="cat-pill" style="background:${color}22;color:${color}">${orgCats[org].split(' ')[0]}</span></td><td data-label="Grants" style="text-align:center;font-family:'DM Mono',monospace;font-size:12px;color:var(--text-dim)">${cnt}</td><td data-label="Total" class="amt-cell">${fmtFull(amt)}</td></tr>`;
  });
  document.getElementById('recipients-table').innerHTML=tblHtml+'</tbody>';

  const maxSizeN=Math.max(...sizeCounts.map(r=>r.n));
  let distHtml='<div style="margin-bottom:16px">';
  sizeCounts.forEach(r=>{distHtml+=`<div class="dist-row"><div class="dist-label">${r.label}</div><div class="dist-bar-wrap"><div class="dist-bar" style="width:${r.n/maxSizeN*100}%;background:var(--gold);opacity:0.7"></div></div><div class="dist-info">${r.n} grants · ${fmt(r.total)}</div></div>`;});
  distHtml+=`</div><div class="note">Median: ${fmtFull(grants.map(g=>g.amt).sort((a,b)=>a-b)[Math.floor(grants.length/2)])} · Largest: ${fmtFull(Math.max(...grants.map(g=>g.amt)))}</div>`;
  document.getElementById('dist-section').innerHTML=distHtml;

  let pledgeHtml='';
  ovPledges.forEach(p=>{pledgeHtml+=`<div class="pledge-row"><div><div class="pledge-org">${p.org}</div><div class="pledge-detail">${p.detail}</div></div><div class="pledge-right"><div class="pledge-amt">${p.total}</div><div class="pledge-progress-wrap"><div class="pledge-progress" style="width:${p.paid}%"></div></div></div></div>`;});
  document.getElementById('pledge-section').innerHTML=pledgeHtml;

  const insights = d.insights || [
    {title:"Highly Concentrated November Cycle",body:`${novPct}% of total annual giving (~${fmt(novTotal)}) was disbursed in a single November grant cycle. The June 18 cycle (${fmt(grants.filter(g=>g.d==='6/18').reduce((s,g)=>s+g.amt,0))}) represents a substantial secondary round.`},
    {title:"Education Dominates at 37% — Driven by Witte",body:`Education is the largest bucket at ~${fmt(catTotals['Education']||0)}, elevated by the Witte Museum Year 1 student pledge ($1.5M) and the arts-to-education reclassification. Without Witte, Education and Health & Human Welfare would be roughly equal.`},
    {title:"Haven for Hope as Strategic Platform",body:`At least 10 distinct organizations received grants to deliver services at Haven for Hope, in addition to ~$1.25M in direct capital and operations support within Homelessness & Basic Needs. Total Haven ecosystem investment likely exceeds $2M.`},
    {title:"Capital Campaign Concentration",body:`Major capital investments: Witte Museum ($1.5M), Madonna Center ($350K), Haven for Hope Phase II ($250K), Lifetime Recovery ($250K), and Children's Hospital epilepsy program ($250K). These commitments represent strategic multi-year investments rather than operational grants.`},
    {title:"Children's Causes — Broad but Deep",body:`Children's Causes spans ${catCounts["Children's Causes"]||0} grants across residential care, mentoring, camps, holiday giving, and child advocacy — reflecting a "no child left behind" philosophy covering the full child welfare continuum from infancy through teen years.`},
    {title:"Health & Human Welfare — Full Pipeline",body:`At ~${fmt(catTotals['Health & Human Welfare']||0)}, this bucket spans mental health policy (Meadows $400K), clinical guidance (Clarity $290K), addiction recovery, disability services, elder care, and medical research — covering prevention through intervention.`},
    {title:"Multi-Year Pledge Obligations",body:`At least $5.6M in multi-year pledges are in active fulfillment. Future year commitments — especially the Witte Museum ($1.5M remaining in 2026) and UTSA ($333K remaining) — should be stress-tested against future investment returns. See Pledge Waterfall tab.`},
    {title:"Emergency & Responsive Giving",body:`At least 8 grants were flagged as emergency funding — Meals on Wheels ($150K), Pay It Forward ($50K), SA Food Bank ($100K emergency), United Way ($100K emergency) — totaling over $500K, showing the Foundation maintains crisis-response capacity outside normal cycles.`},
  ];
  document.getElementById('insights-text').innerHTML=insights.map(ins=>`<div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:16px"><div style="font-weight:600;color:var(--gold-light);font-size:13px;margin-bottom:6px">${ins.title}</div><div style="font-size:12.5px;color:var(--text-muted);line-height:1.6">${ins.body}</div></div>`).join('');

  // fade-ins
  const fadeEls=document.querySelectorAll('.fade-in');
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),80);obs.unobserve(e.target);}});},{threshold:0.05});
  fadeEls.forEach(el=>obs.observe(el));
}

// ── Donut hover handlers (global; referenced by inline SVG events) ──
function donutHover(path) {
  const cat = path.dataset.cat, amt = parseFloat(path.dataset.amt), pct = path.dataset.pct;
  document.querySelectorAll('#donut-svg path').forEach(p => p.style.opacity = p === path ? '1' : '0.3');
  document.querySelectorAll('.detail-row').forEach(r => r.style.background = r.dataset.cat === cat ? 'var(--surface2)' : '');
  document.getElementById('donut-label').textContent = cat.length > 18 ? cat.slice(0,17)+'…' : cat;
  document.getElementById('donut-label').setAttribute('font-size','7.5');
  document.getElementById('donut-amt').textContent = fmt(amt);
  document.getElementById('donut-pct').textContent = pct + '%';
}
function donutHover2(cat) {
  const path = document.querySelector(`#donut-svg path[data-cat="${cat}"]`);
  if (path) donutHover(path);
}
function donutReset() {
  document.querySelectorAll('#donut-svg path').forEach(p => p.style.opacity = '0.85');
  document.querySelectorAll('.detail-row').forEach(r => r.style.background = '');
  const label = document.getElementById('donut-label');
  if (!label) return;
  label.textContent = 'TOTAL';
  label.setAttribute('font-size','9');
  document.getElementById('donut-amt').textContent = fmt(_donutTotal);
  document.getElementById('donut-pct').textContent = '';
}
