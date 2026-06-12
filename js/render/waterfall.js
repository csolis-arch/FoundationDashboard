// Pledge Waterfall tab. Renders the annual obligation waterfall chart,
// the future-year breakdown, and the full pledge registry table.

function renderWaterfall(year) {
  const d = DATA[year] || {};
  const wfPledges = d.wfPledges || [];
  const hasData = setTabData('waterfall', wfPledges.length > 0,
    'Multi-year pledge commitments for 2026 will appear once they are recorded.');
  if (!hasData) return;

  const wfKpiRow = document.getElementById('wf-kpi-row');
  if (wfKpiRow) wfKpiRow.innerHTML = (d.wfKpis || []).map(k =>
    `<div class="kpi-box ${k.cls}"><div class="kpi-val2">${k.val}</div><div class="kpi-label2">${k.label}</div></div>`).join('');

  const yearMap={};
  wfPledges.forEach(p=>p.schedule.forEach(s=>{
    if(!yearMap[s.year])yearMap[s.year]=[];
    yearMap[s.year].push({org:p.org,amt:s.amt,memo:s.memo,paid:s.paid,color:p.color,category:p.category});
  }));
  const wfYears=Object.keys(yearMap).map(Number).sort();
  const maxYearAmt=Math.max(...wfYears.map(y=>yearMap[y].reduce((s,i)=>s+i.amt,0)));

  let chartHtml='';
  wfYears.forEach(yr=>{
    const items=yearMap[yr],total=items.reduce((s,i)=>s+i.amt,0);
    const barH=Math.max(8,Math.round(total/maxYearAmt*180));
    const unpaid=items.filter(i=>!i.paid).reduce((s,i)=>s+i.amt,0);
    let segHtml='';
    items.forEach(item=>{
      const segH=Math.max(4,Math.round(item.amt/total*barH));
      segHtml+=`<div class="wf-segment" style="height:${segH}px;background:${item.color};opacity:${item.paid?0.45:0.9}"><div class="seg-tip">${item.org}<br><strong>${fmt(item.amt)}</strong><br>${item.memo}</div></div>`;
    });
    chartHtml+=`<div class="wf-col"><div class="wf-bar-wrap">${segHtml}</div><div class="wf-year">${yr}</div><div class="wf-total">${fmt(total)}</div><div class="wf-label">${yr<=2025?'✓ Paid':`${fmt(unpaid)} owed`}</div></div>`;
  });
  document.getElementById('wf-chart').innerHTML=chartHtml;

  const legendColors={};
  wfPledges.forEach(p=>{legendColors[p.category]=p.color;});
  document.getElementById('wf-legend').innerHTML=Object.entries(legendColors).map(([cat,col])=>`<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted)"><div style="width:10px;height:10px;border-radius:2px;background:${col}"></div>${cat}</div>`).join('')+`<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted)"><div style="width:10px;height:10px;border-radius:2px;background:#888;opacity:0.45"></div>Paid/Complete</div>`;

  const futureYears=wfYears.filter(y=>y>=2026);
  let ybHtml='';
  futureYears.forEach(yr=>{
    const items=yearMap[yr].filter(i=>!i.paid);
    if(!items.length)return;
    const total=items.reduce((s,i)=>s+i.amt,0);
    ybHtml+=`<div class="yr-row"><div class="yr-label">${yr}</div><div class="yr-items">${items.map(item=>`<div class="yr-item"><div class="yr-item-dot" style="background:${item.color}"></div><div class="yr-item-org">${item.org}</div><div class="yr-item-detail">${item.memo}</div><div class="yr-item-amt">${fmtFull(item.amt)}</div></div>`).join('')}<div class="yr-total"><div class="yr-total-label">Total Obligated ${yr}</div><div class="yr-total-amt">${fmtFull(total)}</div></div></div></div>`;
  });
  document.getElementById('year-breakdown').innerHTML=ybHtml;

  const statusLabel=p=>{
    const unpaid=p.schedule.filter(s=>!s.paid);
    if(!unpaid.length)return'<span class="status-pill status-complete">Complete</span>';
    if(!p.schedule.filter(s=>s.paid).length)return'<span class="status-pill status-early">Not Started</span>';
    return'<span class="status-pill status-active">In Progress</span>';
  };
  let regHtml=`<thead><tr><th>Organization</th><th>Category</th><th>Total Pledge</th><th>Paid to Date</th><th>% Complete</th><th>Remaining</th><th>Status</th></tr></thead><tbody>`;
  wfPledges.forEach(p=>{
    const paidAmt=p.schedule.filter(s=>s.paid).reduce((s,x)=>s+x.amt,0);
    const pct=Math.round(paidAmt/p.totalPledge*100);
    const remaining=p.totalPledge-paidAmt;
    regHtml+=`<tr><td data-label="Organization" style="font-weight:500;color:var(--text)">${p.org}</td><td data-label="Category" style="font-size:11px;color:var(--text-dim)">${p.category}</td><td data-label="Total Pledge" class="mono gold-text">${fmtFull(p.totalPledge)}</td><td data-label="Paid to Date" class="mono" style="color:var(--green)">${fmtFull(paidAmt)}</td><td data-label="% Complete"><div style="display:flex;align-items:center;gap:8px"><div class="pct-wrap"><div class="pct-fill" style="width:${pct}%;background:${p.color}"></div></div><span class="mono dim" style="font-size:11px">${pct}%</span></div></td><td data-label="Remaining" class="mono" style="color:${remaining>0?'var(--red)':'var(--text-dim)'}">${remaining>0?fmtFull(remaining):'—'}</td><td data-label="Status">${statusLabel(p)}</td></tr>`;
  });
  document.getElementById('pledge-registry').innerHTML=regHtml+'</tbody>';
}
