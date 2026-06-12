// 990 Financial Analysis tab. Renders portfolio bars, payout-compliance,
// the RMD treadmill, operating expenses, capacity model, governance, and
// analyst observations. Static figures live in the index.html for now;
// they are gated together with the JS-rendered charts via the placeholder.

function renderFinancial(year) {
  const d = DATA[year] || {};
  const portfolio = d.portfolio || [];
  const hasData = setTabData('financial', portfolio.length > 0,
    'The 2026 Form 990-PF has not been filed yet (foundation 990s are public ~12–18 months after year-end). Once available, the financial analysis will be pulled in here.');
  if (!hasData) return;

  // Portfolio bars
  const maxFmv = Math.max(...portfolio.map(p=>p.fmv));
  let pbHtml = '';
  portfolio.forEach(p=>{
    pbHtml += `<div class="port-row">
      <div class="port-label">${p.label}</div>
      <div class="port-bar-wrap" style="position:relative">
        <div class="port-bar" style="width:${(p.book/maxFmv*100).toFixed(1)}%;background:var(--surface);border:1px solid var(--border);position:absolute;top:0;left:0;height:100%;border-radius:4px"></div>
        <div class="port-bar" style="width:${(p.fmv/maxFmv*100).toFixed(1)}%;background:${p.color};opacity:0.7"></div>
      </div>
      <div class="port-book">${fmt(p.book)}</div>
      <div class="port-fmv">${fmt(p.fmv)}</div>
    </div>`;
  });
  document.getElementById('portfolio-bars').innerHTML = pbHtml;

  // Compliance tracker
  const complianceData = d.complianceData || [];
  const maxComp = Math.max(...complianceData.map(c=>Math.max(c.required, c.actual||0)));
  let compHtml = '';
  complianceData.forEach(c=>{
    const reqW = (c.required/maxComp*100).toFixed(1);
    const actW = c.actual ? (c.actual/maxComp*100).toFixed(1) : 0;
    const actColor = c.status==='ok' ? 'var(--green)' : c.status==='warn' ? 'var(--orange)' : c.status==='bad' ? 'var(--red)' : 'rgba(91,141,238,0.6)';
    const statusColor = c.status==='ok' ? 'var(--green)' : c.status==='warn' ? 'var(--orange)' : c.status==='bad' ? 'var(--red)' : 'var(--blue)';
    const yearColor = c.est ? 'var(--text-dim)' : 'var(--text-muted)';
    const barBorder = c.status==='proj' ? 'border: 1px dashed rgba(91,141,238,0.4);' : '';
    compHtml += `<div class="compliance-row">
      <div class="comp-year" style="color:${yearColor}">${c.year}${c.est?'*':''}</div>
      <div class="comp-tooltip-wrap">
        <div class="comp-tooltip">${c.tip}</div>
        <div style="position:relative;height:22px;background:var(--surface2);border-radius:4px;overflow:hidden;cursor:help;${barBorder}">
          <div style="position:absolute;top:0;left:0;height:100%;width:${reqW}%;background:rgba(42,48,80,0.9);border-right:2px dashed rgba(255,255,255,0.1)"></div>
          ${c.actual ? `<div style="position:absolute;top:0;left:0;height:100%;width:${actW}%;background:${actColor};opacity:${c.est?0.5:0.75}"></div>` : ''}
          <div style="position:absolute;inset:0;display:flex;align-items:center;padding:0 8px;font-size:10px;color:rgba(255,255,255,0.45);font-family:'DM Mono',monospace">
            ${c.actual ? `${c.status==='proj'?'Projected':'Paid'} ${fmt(c.actual)} of ${fmt(c.required)} req.` : `${fmt(c.required)} required`}
          </div>
        </div>
      </div>
      <div class="comp-amt">${fmt(c.required)}</div>
      <div class="comp-status"><span style="font-size:10px;color:${statusColor};font-weight:600">${c.label}</span></div>
    </div>`;
  });
  document.getElementById('compliance-rows').innerHTML = compHtml + '<div style="font-size:10px;color:var(--text-dim);margin-top:6px">* Estimated — hover bars for detail</div>';

  // Treadmill rows
  const treadmill = d.treadmill || [];
  const maxRmd = Math.max(...treadmill.map(t=>t.rmd));
  let trHtml = '';
  treadmill.forEach(t=>{
    trHtml += `<div class="treadmill-row">
      <div class="treadmill-year">${t.year}${t.est?'*':''}</div>
      <div class="treadmill-bar-wrap">
        <div class="treadmill-bar" style="width:${(t.rmd/maxRmd*100).toFixed(1)}%;background:${t.est?'rgba(91,141,238,0.4)':'rgba(91,141,238,0.75)'}">
          <span class="treadmill-val" style="color:${t.est?'var(--text-dim)':'var(--text)'}">${fmt(t.rmd)}${t.est?' (est.)':''}</span>
        </div>
      </div>
    </div>`;
  });
  document.getElementById('treadmill-rows').innerHTML = trHtml + '<div style="font-size:10px;color:var(--text-dim);margin-top:8px">* Estimated based on FMV projections</div>';

  // Expense bars
  const expenses = d.expenses || [];
  const maxExp = Math.max(...expenses.map(e=>e.amt));
  let expHtml = '';
  expenses.forEach(e=>{
    expHtml += `<div class="dist-row">
      <div class="dist-label" style="font-size:11.5px">${e.label}</div>
      <div class="dist-bar-wrap"><div class="dist-bar" style="width:${(e.amt/maxExp*100).toFixed(1)}%;background:${e.color};opacity:0.75"></div></div>
      <div class="dist-info">${fmtFull(e.amt)}</div>
    </div>`;
  });
  document.getElementById('expense-bars').innerHTML = expHtml;

  // Capacity rows
  const capacityItems = d.capacityItems || [];
  let capHtml = '';
  capacityItems.forEach(item=>{
    capHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(42,48,80,0.4)">
      <div style="font-size:12.5px;color:var(--text-muted)">${item.label}</div>
      <div style="font-family:'DM Mono',monospace;font-size:12px;color:${item.color}">${fmtFull(item.amt)}</div>
    </div>`;
  });
  document.getElementById('capacity-rows').innerHTML = capHtml;

  // Governance
  const govRows = d.govRows || [];
  let govHtml = '';
  govRows.forEach(g=>{
    govHtml += `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(42,48,80,0.4)">
      <div style="flex:1">
        <div style="font-size:13px;color:var(--text)">${g.name}</div>
        <div style="font-size:11px;color:var(--text-dim)">${g.title}</div>
      </div>
      <div style="font-family:'DM Mono',monospace;font-size:12px;color:${g.comp==='$0'?'var(--text-dim)':'var(--gold-light)'}">${g.comp}</div>
    </div>`;
  });
  document.getElementById('governance-rows').innerHTML = govHtml;

  // Financial insights
  const finInsights = d.finInsights || [];
  document.getElementById('fin-insights').innerHTML = finInsights.map(i=>`
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:16px">
      <div style="font-weight:600;color:var(--gold-light);font-size:13px;margin-bottom:6px">${i.title}</div>
      <div style="font-size:12.5px;color:var(--text-muted);line-height:1.6">${i.body}</div>
    </div>`).join('');
}
