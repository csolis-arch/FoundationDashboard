// Data: dependency-2026.js
// Grantee dependency-risk matrix for the 2026 cycle. Risk is ESTIMATED from
// grant size vs. typical org size for that type (nonprofit financials not
// attached) — a flag for due diligence, not a certainty. "Total" is the org's
// aggregated 2026 commitment across all line items.

DATA[2026] = DATA[2026] || {};

DATA[2026].depData = [
  {org:"San Antonio Christian Dental Clinic",grants:2,total:220000,risk:"high",notes:"Operations + prosthetics for a single-site clinic on the Haven campus; Foundation likely top funder",estimate:"Est. 50%+ of budget"},
  {org:"Faith Kitchen",grants:1,total:75000,risk:"high",notes:"Small food ministry; a $75K grant is core operating funding",estimate:"Est. 30–60% of budget"},
  {org:"UT Health SA – Dr. Usatine (Haven Clinic)",grants:1,total:125000,risk:"medium",notes:"Program-level dependency: funds a specific Haven dermatology clinic; institution itself is large",estimate:"Program reliant on grant"},
  {org:"Animal Defense League of Texas",grants:2,total:120000,risk:"medium",notes:"Capital campaign + operations; mid-size org with diversified support",estimate:"Est. 10–20% of budget"},
  {org:"Morgan's",grants:1,total:100000,risk:"medium",notes:"Camp capital/safety improvements; well-funded inclusion org, one-time capital",estimate:"Est. 5–15% of budget"},
  {org:"Brighton Center",grants:1,total:50000,risk:"medium",notes:"Early-childhood/special-needs org; $50K is significant for its size",estimate:"Est. 10–20% of budget"},
  {org:"SLEW Cancer Wellness Center",grants:1,total:20000,risk:"medium",notes:"Small cancer-wellness nonprofit; general support likely a meaningful share",estimate:"Est. 15–30% of budget"},
  {org:"Empower House SA",grants:1,total:10000,risk:"medium",notes:"Small org; salaries & programs support is core funding",estimate:"Est. 15–30% of budget"},
  {org:"Guardian House",grants:1,total:30000,risk:"watch",notes:"Supervised-visitation org; single sizable grant",estimate:"Est. 10–20% of budget"},
  {org:"Kinetic Kids, Inc.",grants:1,total:20000,risk:"watch",notes:"Adaptive-sports nonprofit; review annually",estimate:"Est. 10–15% of budget"},
  {org:"Thrive Youth Center, Inc.",grants:1,total:10000,risk:"watch",notes:"Small LGBTQ youth shelter operating with Haven; monitor",estimate:"Est. 10–20% of budget"},
  {org:"Woodland Church (Bed Ministry)",grants:1,total:10000,risk:"watch",notes:"Volunteer bed ministry; grant funds materials directly",estimate:"Est. program-level"},
  {org:"Transformation House",grants:1,total:5000,risk:"watch",notes:"Small recovery/reentry program; single grant = program",estimate:"Est. 10–20% of budget"},
  {org:"Threads of Love (SARAH Chapter)",grants:1,total:5000,risk:"watch",notes:"Volunteer NICU-garment ministry; small budget",estimate:"Est. program-level"},
  {org:"Haven for Hope",grants:2,total:2000000,risk:"low",notes:"Major institution; Foundation is a key but not sole funder. $1.5M is capital campaign",estimate:"Est. 5–15% of budget"},
  {org:"Witte Museum",grants:2,total:1540000,risk:"low",notes:"Large museum; $1.5M is a multi-year capital pledge, not operating dependency",estimate:"Est. <5% of operating budget"},
  {org:"The University of Texas at San Antonio",grants:3,total:598334,risk:"low",notes:"Major university; scholarships + arts education, highly diversified",estimate:"Est. <1% of budget"},
  {org:"United Way SA & Bexar County",grants:2,total:106000,risk:"low",notes:"Large umbrella org; fully diversified funder base",estimate:"Est. <2% of budget"},
];

DATA[2026].depKpis = [
  {cls:'kred',   val:'2',       label:'High Dependency Orgs'},
  {cls:'korange',val:'12',      label:'Medium Risk / Watch List'},
  {cls:'kgold',  val:'~$720K',  label:'In High/Medium-Risk Orgs'},
  {cls:'kblue',  val:'6',       label:'Orgs Receiving 2+ Grants (2026)'},
];

DATA[2026].depInsights = [
  {title:'SA Christian Dental Clinic — Single-Site Dependency', body:'$220K (operations + prosthetics) to a clinic operating on the Haven for Hope campus. As a single-site provider, the Foundation is likely its largest funder — request a full budget and Form 990 before renewal.'},
  {title:'Faith Kitchen — Small-Org Concentration', body:'Faith Kitchen ($75K) is a mission-specific food ministry where a grant of this size can represent 30–60% of annual revenue. Excellent mission fit, but monitor for over-reliance and consider capacity-building support.'},
  {title:'IRS Public Support Test — "Tipping" Watch', body:'Several small grantees (Faith Kitchen, SLEW Cancer Wellness, Empower House, Transformation House, Threads of Love) likely receive a high share of their budget from this Foundation. Under IRC §509(a)(1)/(2), more than 33% of support from a single donor over a 5-year rolling period risks losing public charity status ("tipping"). A Schedule B review is prudent before renewal.'},
];

DATA[2026].multiGrants = [
  {org:"Haven for Hope",count:2,total:2000000,note:"Operations + 15th Anniversary Capital Campaign, Phase III"},
  {org:"Witte Museum",count:2,total:1540000,note:"Multi-year capital commitment + Witte for All"},
  {org:"The University of Texas at San Antonio",count:3,total:598334,note:"Be Bold Scholarships + Football + Community Arts"},
  {org:"San Antonio Christian Dental Clinic",count:2,total:220000,note:"Operations + Prosthetics"},
  {org:"Animal Defense League of Texas",count:2,total:120000,note:"Capital Campaign + Operations"},
  {org:"United Way SA & Bexar County",count:2,total:106000,note:"General Operations + Power of the Purse"},
];
