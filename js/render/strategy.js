// Overall Strategy tab — an analyst synthesis of the 2026 giving so far:
// concentration, overlapping clusters, apparent gaps, and concrete ideas to
// connect/collaborate/innovate across grantees. This is interpretive analysis
// (clearly labeled as such), built on the imported 2026 grant + impact data.

function renderStrategy() {
  const el = document.getElementById('strategy-content');
  if (!el) return;

  // A few figures pulled live from the 2026 data so the narrative stays honest.
  const g = (DATA[2026] && DATA[2026].grants) || [];
  const total = g.reduce((s, x) => s + x.amt, 0);
  const orgs = new Set(g.map(x => x.org)).size;
  const catTotals = {};
  g.forEach(x => { catTotals[x.cat] = (catTotals[x.cat] || 0) + x.amt; });
  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0] || ['—', 0];
  const orgTotals = {};
  g.forEach(x => { orgTotals[x.org] = (orgTotals[x.org] || 0) + x.amt; });
  const top5 = Object.values(orgTotals).sort((a, b) => b - a).slice(0, 5).reduce((s, v) => s + v, 0);
  const top5Pct = total ? Math.round(top5 / total * 100) : 0;

  const card = (title, body) =>
    `<div class="card" style="margin-bottom:20px"><div class="card-title">${title}</div>${body}</div>`;

  const box = (title, body, color) =>
    `<div style="background:var(--surface2);border:1px solid var(--border);border-left:3px solid ${color || 'var(--gold)'};border-radius:8px;padding:14px 16px">
      <div style="font-weight:600;color:var(--text);font-size:13px;margin-bottom:5px">${title}</div>
      <div style="font-size:12.5px;color:var(--text-muted);line-height:1.65">${body}</div>
    </div>`;

  const grid = inner => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${inner}</div>`;

  el.innerHTML = `
    <div class="callout cblue" style="margin-bottom:22px">
      <div class="callout-icon">🧭</div>
      <div class="callout-text"><strong>About this analysis.</strong> This is an interpretive strategic synthesis of the 2026 giving to date (the June cycle: ${fmt(total)} across ${orgs} organizations), intended as a discussion starter for the family and board. It highlights where giving is concentrated, where programs overlap, where there may be gaps, and where grantees could be connected for greater collective impact. Figures are committed-to-date; a second 2026 cycle is expected. <em>These are observations and ideas, not directives.</em></div>
    </div>

    ${card('The Shape of 2026 Giving', `
      <div style="font-size:12.5px;color:var(--text-muted);line-height:1.7;margin-bottom:14px">
        The June 2026 cycle is <strong>capital-heavy and concentrated</strong>. ${topCat[0]} leads at roughly ${fmt(topCat[1])}, and the five largest recipients account for about <strong>${top5Pct}% of the cycle</strong>. The remaining organizations share the balance, mostly in grants between $5K and $75K. This is a deliberate "big investments plus broad base" pattern: a handful of transformational institutional investments alongside a wide net of community grants. The strategic question for the November cycle is whether to <strong>deepen</strong> (more capacity for existing grantees) or <strong>broaden</strong> (new organizations and underserved areas).
      </div>
      ${grid(
        box('Strength: institutional anchoring', 'Major multi-year investments (Witte, Texas A&amp;M-San Antonio, Haven Phase III, UTSA) build durable community infrastructure and signal long-term commitment.', 'var(--green)') +
        box('Tension: concentration risk', `With ~${top5Pct}% in five names, cycle outcomes are tied to a few large institutions. The broad small-grant base is the strategic counterweight — and where collaboration can multiply impact.`, 'var(--orange)')
      )}
    `)}

    ${card('Overlapping Clusters — Opportunities to Coordinate', `
      <div style="font-size:12.5px;color:var(--text-muted);line-height:1.7;margin-bottom:14px">
        Several groups of grantees work in the same lane. This is not wasteful duplication — it reflects genuine community need — but it is an opportunity to <strong>convene grantees, align outcomes, and reduce friction</strong> rather than fund in parallel.
      </div>
      ${grid(
        box('🎭 Arts &amp; cultural access', 'Witte, The DoSeum, San Antonio Museum of Art, Briscoe, Blue Star, San Pedro Playhouse, SAY Sí, Youth Orchestras, and Children\'s Chorus all expand cultural access. A shared free-admission + school-transportation compact could turn nine separate gifts into one coordinated cultural pipeline for Title I students.', '#c9a84c') +
        box('🧒 Foster &amp; child-welfare continuum', 'Roy Maas, Boysville, SJRC, CASA, and Brighton Center span the same continuum (residential, advocacy, early intervention). Convening them around shared case-flow data would surface hand-off gaps between programs.', '#5b8dee') +
        box('🍞 Food &amp; basic needs', 'Faith Kitchen, Hill Country Daily Bread, Christian Assistance Ministry, Brighter Bites, and Street2Feet all address food security. A light coordination table could align coverage by geography and reduce overlap.', '#e05c5c') +
        box('🐾 Animal welfare', 'Animal Defense League, San Antonio Pets Alive, and DaisyCares overlap on rescue, adoption, and pet-food assistance — candidates for a shared intake/referral approach.', '#e07a3c') +
        box('👁️ Vision &amp; sensory services', 'Sight Savers, Guide Dogs of Texas, and the Texas Society to Prevent Blindness all serve vision needs — screening through assistance — and could form a single referral chain.', '#4ec9a4') +
        box('🎓 Education ladder', 'Texas A&amp;M-SA First-Gen, UTSA Be Bold, SA Education Partnership, and The Holdsworth Center touch the same student journey. Connecting them creates a measurable cradle-to-career pathway.', '#9b72d9')
      )}
    `)}

    ${card('Apparent Gaps — Areas That May Be Underweighted', `
      <div style="font-size:12.5px;color:var(--text-muted);line-height:1.7;margin-bottom:14px">
        Relative to San Antonio's needs and the breadth elsewhere in the portfolio, a few areas look light in the June cycle and may merit attention in November:
      </div>
      ${grid(
        box('🧠 Behavioral &amp; mental health', 'Beyond Rise Recovery and SLEW, direct mental-health capacity is modest this cycle despite high regional demand — especially youth behavioral health and crisis services.', 'var(--blue)') +
        box('💼 Workforce &amp; economic mobility', 'NPower is the main workforce play. Job training, financial empowerment, and small-business / entrepreneurship pathways are an opening for durable poverty reduction.', 'var(--blue)') +
        box('🏠 Housing stability &amp; prevention', 'Outside the Haven ecosystem, eviction prevention, rapid re-housing, and affordable-housing support are limited relative to the scale of need.', 'var(--blue)') +
        box('🎖️ Veterans &amp; seniors', 'Veterans (largely one service-dog grant) and low-income seniors (Village at Incarnate Word) are lightly funded given San Antonio\'s large military and aging populations.', 'var(--blue)')
      )}
    `)}

    ${card('Ideas to Connect, Collaborate &amp; Innovate', `
      <div style="font-size:12.5px;color:var(--text-muted);line-height:1.7;margin-bottom:14px">
        High-leverage moves that use the Foundation's convening power — not just its checkbook:
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${box('1 · Stand up a "Haven Campus Cohort"', 'The Foundation already funds ~9 organizations operating on or with the Haven for Hope campus (see the Haven ecosystem below). Convening them into a single funded cohort — shared outcome metrics, a common client-data view, and joint planning — would turn parallel grants into coordinated wraparound care and make impact measurable end-to-end.', 'var(--gold)')}
        ${box('2 · Create a capacity-building pool for small, high-dependency grantees', 'Several small grantees (Faith Kitchen, SLEW, Empower House, Transformation House, Threads of Love) rely heavily on Foundation support — a public-support-test "tipping" risk. A modest shared pool for fundraising infrastructure, finance, and board development reduces that risk and strengthens sustainability. (See Org Dependency Risk.)', 'var(--orange)')}
        ${box('3 · Move from "reach" to outcomes', 'Adopt a light, shared measurement standard across cohorts (a handful of common indicators) so next year\'s Impact tab can report attributable outcomes, not just program-capacity reach. Pair a few flagship grants with a third-party evaluation (building on the Nivin Haven ROI work).', 'var(--green)')}
        ${box('4 · A coordinated cultural-access pipeline', 'Bundle the arts grantees into one initiative that guarantees free admission plus transportation for a defined set of Title I schools — a single, trackable "every child visits a museum and hears live music" promise.', '#c9a84c')}
        ${box('5 · Multi-year challenge / match structures', 'For institutional anchors, structure portions as challenge grants to crowd in other donors — extending the Foundation\'s dollars and deepening community ownership of these investments.', 'var(--blue)')}
      </div>
    `)}

    ${card('The Haven for Hope Ecosystem', `
      <div style="font-size:12.5px;color:var(--text-muted);line-height:1.7">
        The Foundation's most distinctive strategic pattern is its <strong>investment in the Haven for Hope ecosystem</strong>: beyond direct support to Haven (operations + the 15th Anniversary Capital Campaign, Phase III), it funds a cluster of organizations that deliver services on or alongside the Haven campus —
        <strong>San Antonio Christian Dental Clinic</strong>, <strong>Dr. Usatine's dermatology clinic (UT Health SA)</strong>, <strong>Thrive Youth Center</strong>, <strong>Faith Kitchen</strong>, <strong>Street2Feet</strong>, <strong>Children's Chorus of San Antonio</strong>, <strong>Life Skills for Living</strong>, <strong>Prospera Housing (The Terraces at Haven)</strong>, and the multi-agency back-to-school drive.
        Taken together, this is a coordinated investment in a single proven platform — and the clearest candidate for formal cohort funding (idea&nbsp;#1 above).
      </div>
    `)}

    <div style="font-size:10.5px;color:var(--text-dim);line-height:1.7;border-top:1px solid var(--border);padding-top:12px;margin-top:4px">
      Analyst synthesis based on the imported 2026 grant and impact data. Clusters and gaps are interpretive and meant to prompt discussion; dollar figures are committed-to-date for the June cycle and exclude the anticipated November cycle.
    </div>
  `;
}
