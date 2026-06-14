// Data: overview-2026.js
// Year-specific Overview content: the four insight cards and the
// "Strategic Observations & Analyst Notes" for the 2026 June cycle.

DATA[2026] = DATA[2026] || {};

DATA[2026].insightCards = [
  { cls:'gold',   icon:'🏆', num:'$4.29M', label:'Largest bucket: <strong>Education</strong> (50%)' },
  { cls:'blue',   icon:'🏢', num:'$2.0M',  label:'Top recipient: <strong>Haven for Hope</strong>' },
  { cls:'green',  icon:'🎯', num:'57%',    label:'Of the <strong>$15M 2026 target</strong> committed in the June cycle' },
  { cls:'orange', icon:'🗂️', num:'90',     label:'<strong>Organizations funded</strong> across 5 focus areas' },
];

DATA[2026].insights = [
  { title:'First Cycle of a $15M Year',
    body:'The June 2026 cycle commits <strong>$8.55M across 90 organizations</strong> — about 57% of the Foundation\'s <strong>$15M</strong> distribution target. Additional cycles are expected later in the year to close the remaining ~$6.45M.' },
  { title:'A Capital-Heavy Cycle — Largely in Service of Education',
    body:'Capital commitments dominate at <strong>~$5.23M (61% of the cycle)</strong> — but "capital" here is a funding <em>type</em>, not a focus area, and most of it advances <strong>education</strong>. The two largest capital items are education investments: the <strong>Witte Museum</strong> ($1.5M, part of a $3M pledge) is a museum/education program, and the <strong>Texas A&amp;M-San Antonio First-Gen Scholarship endowment</strong> ($1M) funds scholarships. The clearest non-education capital gifts are Haven for Hope\'s 15th Anniversary Campaign Phase III ($1.5M) and St. Mary\'s new arena scoreboards ($600K).' },
  { title:'Education Leads at 50%',
    body:'Education is the largest focus area at <strong>~$4.29M</strong>, elevated by major higher-ed and museum commitments. Texas A&amp;M, UTSA (3 grants, $598K), St. Mary\'s, and the Witte together account for the bulk.' },
  { title:'Haven for Hope as Strategic Platform',
    body:'Beyond $2M in direct support (operations + capital), the Foundation funds a cluster of organizations delivering services on or with the Haven campus — Dr. Usatine\'s dermatology clinic ($125K), SA Christian Dental ($220K), Thrive Youth Center, Faith Kitchen, Street2Feet, Children\'s Chorus of San Antonio, Life Skills for Living, Prospera Housing (The Terraces at Haven), and the multi-org back-to-school drive — pushing total Haven-ecosystem investment well above $2.3M.' },
  { title:'High Concentration at the Top',
    body:'The five largest recipients (Haven $2M, Witte $1.54M, Texas A&amp;M $1M, St. Mary\'s $600K, UTSA $598K) represent <strong>~67% of the entire cycle</strong>. The remaining 85 organizations share the other third, mostly in grants between $5K and $75K.' },
  { title:'Multi-Year Commitments in Motion',
    body:'Several grants are installments of multi-year pledges — Witte (part of $3M), UTSA Be Bold Scholarships ($333K, ~1/3 of $1M), and the Texas Business Hall of Fame / St. Mary\'s scholarship ($15K each in 2026–2028). See the <strong>Pledge Waterfall</strong> tab for forward obligations.' },
  { title:'A Broad Small-Grant Base',
    body:'Setting the headline gifts aside, the cycle funds a wide range of $5K–$75K grants across children\'s services, basic needs, disability and health — Kinetic Kids, Guide Dogs, Sleep in Heavenly Peace, Texas Ramp Project, Threads of Love and dozens more — reflecting continued breadth alongside the large investments.' },
  { title:'Health & Human Welfare — Targeted Investments',
    body:'At ~$981K, this bucket leans on a few sizable grants: SA Christian Dental ($220K), AugustHeart ($150K), Dr. Usatine\'s Haven clinic ($125K), Morgan\'s ($100K), and the Greehey Children\'s Cancer Research melatonin study ($100K).' },
];

// Decisions & Recommendations for the Board (consolidated on the Overview tab).
// Bodies may use the tokens {remaining} and {target}, filled with live figures.
DATA[2026].decisions = [
  { n:1, title:'Adopt a pledge-reserve policy',
    body:'Set aside roughly 1–2× the next year\'s pledge obligations in a designated fund so investment swings can\'t force a pledge default. Multi-year pledges (Witte, UTSA, A&amp;M-SA) are in active fulfillment.',
    tab:'waterfall', linkLabel:'Pledge Waterfall' },
  { n:2, title:'Adopt a grantee-dependency policy',
    body:'Confirm a guideline that no single grantee should rely on the Foundation for more than ~20–30% of its operating budget, and stage 12–18 month transitions for high-dependency orgs. Several small grantees are flagged for review.',
    tab:'dependency', linkLabel:'Org Dependency Risk' },
  { n:3, title:'Confirm the November-cycle plan to reach the $15M target',
    body:'About {remaining} remains after the June cycle to meet the {target} distribution target. Confirm the grant slate and timing for the November cycle so the year closes on target.',
    scroll:true, linkLabel:'Target progress' },
];
