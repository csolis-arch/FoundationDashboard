// Type of Funding tab. Classifies every grant by funding type and renders
// the KPI row, horizontal bars, top grants per type, and methodology cards.

function renderFunding(year) {
  const d = DATA[year] || {};
  const grants = d.grants || [];
  const hasData = setTabData('funding', grants.length > 0,
    'Funding-type classification for 2026 will appear once the grant cycle is imported.');
  if (!hasData) return;

  const totalAmt = grants.reduce((s,g)=>s+g.amt,0);
  const totalGrants = grants.length;

  const typeTotals = {}, typeCounts = {}, typeGrants = {};
  Object.keys(TYPE_COLORS).forEach(t => { typeTotals[t]=0; typeCounts[t]=0; typeGrants[t]=[]; });

  grants.forEach(g => {
    const t = classifyType(g.org, g.memo);
    typeTotals[t] = (typeTotals[t]||0) + g.amt;
    typeCounts[t] = (typeCounts[t]||0) + 1;
    if (!typeGrants[t]) typeGrants[t] = [];
    typeGrants[t].push(g);
  });

  const typesSorted = Object.entries(typeTotals).sort((a,b)=>b[1]-a[1]);
  const maxTypeAmt = typesSorted[0][1];

  // KPI row
  document.getElementById('type-kpi-row').innerHTML = typesSorted.map(([type, amt])=>`
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px 16px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;width:3px;height:100%;background:${TYPE_COLORS[type]}"></div>
      <div style="font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:#fff;line-height:1">${fmt(amt)}</div>
      <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-top:4px;line-height:1.3">${type}</div>
      <div style="font-family:'DM Mono',monospace;font-size:10px;color:var(--text-dim);margin-top:3px">${typeCounts[type]} grants</div>
    </div>`).join('');

  // Horizontal bar chart
  let typeBarsHtml = '<div style="display:flex;gap:4px;font-size:10px;color:var(--text-dim);margin-bottom:10px;padding:0 4px"><div style="width:180px">TYPE</div><div style="flex:1">AMOUNT</div><div style="width:70px;text-align:right">TOTAL</div><div style="width:64px;text-align:right">AVG SIZE</div><div style="width:50px;text-align:right">% GIVING</div></div>';
  typesSorted.forEach(([type, amt])=>{
    const pct = (amt/totalAmt*100).toFixed(1);
    const barW = (amt/maxTypeAmt*100).toFixed(1);
    const avg = Math.round(amt / typeCounts[type]);
    typeBarsHtml += `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:0 4px">
      <div style="width:180px;flex-shrink:0;font-size:12.5px;color:var(--text);display:flex;align-items:center;gap:7px">
        <div style="width:8px;height:8px;border-radius:2px;flex-shrink:0;background:${TYPE_COLORS[type]}"></div>${type}
      </div>
      <div style="flex:1;background:var(--surface2);border-radius:4px;height:24px;overflow:hidden">
        <div style="height:100%;width:${barW}%;background:${TYPE_COLORS[type]};opacity:0.8;border-radius:4px;display:flex;align-items:center;padding-left:8px">
          <span style="font-size:10px;font-family:'DM Mono',monospace;color:rgba(255,255,255,0.8);white-space:nowrap">${typeCounts[type]} grants</span>
        </div>
      </div>
      <div style="width:70px;text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:var(--gold-light);flex-shrink:0">${fmt(amt)}</div>
      <div style="width:64px;text-align:right;font-family:'DM Mono',monospace;font-size:11px;color:var(--text-muted);flex-shrink:0">${fmt(avg)}</div>
      <div style="width:50px;text-align:right;font-family:'DM Mono',monospace;font-size:11px;color:var(--text-dim);flex-shrink:0">${pct}%</div>
    </div>`;
  });
  document.getElementById('type-bars').innerHTML = typeBarsHtml;

  // Summary table (optional element)
  let typeTableHtml = `<thead><tr>
    <th style="text-align:left;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-dim);padding:0 8px 10px;border-bottom:1px solid var(--border)">Type</th>
    <th style="text-align:right;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-dim);padding:0 8px 10px;border-bottom:1px solid var(--border)">Total</th>
    <th style="text-align:right;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-dim);padding:0 8px 10px;border-bottom:1px solid var(--border)">Grants</th>
    <th style="text-align:right;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-dim);padding:0 8px 10px;border-bottom:1px solid var(--border)">Avg Size</th>
    <th style="text-align:right;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-dim);padding:0 8px 10px;border-bottom:1px solid var(--border)">% of Total</th>
  </tr></thead><tbody>`;
  typesSorted.forEach(([type, amt])=>{
    const avg = Math.round(amt / typeCounts[type]);
    const pct = (amt/totalAmt*100).toFixed(1);
    typeTableHtml += `<tr>
      <td style="padding:9px 8px;font-size:12.5px;border-bottom:1px solid rgba(42,48,80,0.4)">
        <span style="display:inline-flex;align-items:center;gap:6px">
          <span style="width:8px;height:8px;border-radius:2px;background:${TYPE_COLORS[type]};flex-shrink:0;display:inline-block"></span>
          ${type}
        </span>
      </td>
      <td style="padding:9px 8px;text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:var(--gold-light);border-bottom:1px solid rgba(42,48,80,0.4)">${fmtFull(amt)}</td>
      <td style="padding:9px 8px;text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:var(--text-muted);border-bottom:1px solid rgba(42,48,80,0.4)">${typeCounts[type]}</td>
      <td style="padding:9px 8px;text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:var(--text-muted);border-bottom:1px solid rgba(42,48,80,0.4)">${fmt(avg)}</td>
      <td style="padding:9px 8px;text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:var(--text-dim);border-bottom:1px solid rgba(42,48,80,0.4)">${pct}%</td>
    </tr>`;
  });
  typeTableHtml += `<tr><td style="padding:9px 8px;font-weight:600;color:var(--text);font-size:12.5px">Total</td>
    <td style="padding:9px 8px;text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:var(--gold-light);font-weight:600">${fmtFull(totalAmt)}</td>
    <td style="padding:9px 8px;text-align:right;font-family:'DM Mono',monospace;font-size:12px;color:var(--text-muted)">${totalGrants}</td>
    <td colspan="2"></td></tr>`;
  const typeTableEl = document.getElementById('type-table');
  if (typeTableEl) typeTableEl.innerHTML = typeTableHtml + '</tbody>';

  // Top grants per type
  let topGrantsHtml = '';
  typesSorted.forEach(([type])=>{
    const top = [...(typeGrants[type]||[])].sort((a,b)=>b.amt-a.amt).slice(0,3);
    if (!top.length) return;
    topGrantsHtml += `<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid rgba(42,48,80,0.4)">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
        <div style="width:8px;height:8px;border-radius:2px;background:${TYPE_COLORS[type]}"></div>
        <div style="font-size:11px;font-weight:600;color:var(--text);text-transform:uppercase;letter-spacing:0.06em">${type}</div>
      </div>
      ${top.map(g=>`<div style="display:flex;justify-content:space-between;align-items:baseline;padding:3px 0">
        <div style="font-size:12px;color:var(--text-muted);flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${g.org.length>32?g.org.slice(0,31)+'…':g.org}</div>
        <div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--gold-light);flex-shrink:0;margin-left:8px">${fmtFull(g.amt)}</div>
      </div>`).join('')}
    </div>`;
  });
  document.getElementById('type-top-grants').innerHTML = topGrantsHtml;

  // Methodology
  const typeMethodology = d.typeMethodology || [];
  document.getElementById('type-methodology').innerHTML = typeMethodology.map(t=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:14px;border-top:2px solid ${t.color}">
      <div style="font-size:11.5px;font-weight:600;color:#fff;margin-bottom:6px">${t.type}</div>
      <div style="font-size:11px;color:var(--text-muted);line-height:1.6">${t.desc}</div>
    </div>`).join('');
}
