// Data: financial-2025.js
// Auto-extracted from the original monolith. Static data only.

DATA[2025] = DATA[2025] || {};

DATA[2025].portfolio = [
  {label:"General Equities",      book:98918530,  fmv:164671941, color:"#5b8dee"},
  {label:"Mutual Funds / UIT",    book:34731291,  fmv:36635834,  color:"#c9a84c"},
  {label:"Covenant Global (K-1)", book:19179110,  fmv:25774449,  color:"#9b72d9"},
  {label:"Other Alternatives",    book:4803942,   fmv:7633769,   color:"#4ec9a4"},
  {label:"US Gov Securities",     book:3956745,   fmv:3819274,   color:"#8899bb"},
  {label:"Corporate Bonds",       book:2016960,   fmv:2024870,   color:"#e07a3c"},
  {label:"Cash",                  book:6833626,   fmv:6833626,   color:"#78c87a"},
];

DATA[2025].complianceData = [
  {year:2023, required:10200000, actual:11500000,  status:"ok",   label:"✓ Compliant", est:false,
   tip:"Required: ~$10.2M · Paid: ~$11.5M · Surplus carried forward"},
  {year:2024, required:11692575, actual:7056631,   status:"bad",  label:"⚠ Shortfall", est:false,
   tip:"Required: $11.69M · Paid: $7.06M · $1.93M undistributed carryforward to 2025"},
  {year:2025, required:14483980, actual:13500000,  status:"warn", label:"~ Est. Gap",   est:true,
   tip:"Required: $14.48M (incl. $1.93M 2024 carryforward) · Paid: ~$13.5M · Est. $984K gap — cure window open until 12/31/2026"},
  {year:2026, required:15000000, actual:8552869,   status:"proj", label:"Projected",    est:true,
   tip:"2026 distribution target: $15M · Committed in the June cycle: ~$8.55M · November cycle expected to close the remainder"},
];

DATA[2025].treadmill = [
  {year:2022, fmv:180000000, rmd:8600000},
  {year:2023, fmv:204000000, rmd:9800000},
  {year:2024, fmv:251883734, rmd:11692575},
  {year:2025, fmv:268000000, rmd:12555000, est:true},
  {year:2026, fmv:265000000, rmd:12900000, est:true},
];

DATA[2025].expenses = [
  {label:"Investment Mgmt Fees", amt:1116232, color:"#e05c5c"},
  {label:"Other Professional",   amt:213540,  color:"#e07a3c"},
  {label:"Officer Compensation", amt:80000,   color:"#c9a84c"},
  {label:"Accounting Fees",      amt:80134,   color:"#9b72d9"},
  {label:"Taxes (Excise/Foreign)",amt:175715, color:"#5b8dee"},
  {label:"Occupancy",            amt:25196,   color:"#4ec9a4"},
  {label:"Legal Fees",           amt:15146,   color:"#8899bb"},
  {label:"Staff Salaries",       amt:29531,   color:"#78c87a"},
];

DATA[2025].capacityItems = [
  {label:"2026 Distribution Target", amt:-15000000, color:"var(--red)"},
  {label:"Less: Locked Pledge Obligations", amt:-1958000,  color:"var(--orange)"},
  {label:"Less: Est. Operating Expenses",   amt:-1752000,  color:"var(--text-dim)"},
];

DATA[2025].govRows = [
  {name:"William E. Greehey",       title:"Chair / Director",        comp:"$0",      note:"Founder"},
  {name:"Louree B. Greehey",        title:"Vice Chair / Director",   comp:"$0",      note:""},
  {name:"Lisa Greehey Rosenbloom",  title:"Director / President",    comp:"$20,000", note:""},
  {name:"Cheryl Brown Greehey",     title:"Secretary / Director",    comp:"$20,000", note:""},
  {name:"Leslie Greehey",           title:"Director",                comp:"$20,000", note:""},
  {name:"Margaret Greehey",         title:"Director",                comp:"$20,000", note:""},
];

DATA[2025].finInsights = [
  {title:"Payout Shortfall — 2024 Was ~$2M Short", body:"The 990 confirms a $1,928,980 undistributed income balance that had to be distributed in 2025. The 2025 grant surge of ~$13.5M addressed the majority of this shortfall. Any remaining gap is subject to the standard IRS make-up window under Section 4942."},
  {title:"Unrealized Gains Create a Silent Obligation", body:"The $78.4M gap between book and fair market value is real wealth — but it also increases the annual 5% payout floor. The IRS taxes on FMV, not book, meaning every dollar of appreciation in the portfolio adds $0.05 to the annual required distribution."},
  {title:"Investment Return Was 7.7% in 2024 — Below Market", body:"The S&P 500 returned 25% in 2024. The foundation captured roughly 30% of that — reflecting the diversified alternatives portfolio and bond holdings which act as drag during equity bull markets. The alternatives do provide downside protection however."},
  {title:"A Growing Endowment Raises the Floor", body:"At ~$265M current FMV, the 5% minimum-distribution floor rises automatically each year as assets appreciate. The Foundation's $15M 2026 distribution target sits comfortably above that floor, but the structural point stands: grantmaking must keep growing with the endowment just to stay ahead of the rising minimum."},
  {title:"Management Fees Deserve Review at $300M+", body:"The $1.116M investment management fee represents 0.46% of AUM — reasonable but negotiable. As assets cross $300M, a renegotiation to 0.35% would free up ~$330K annually — enough to fund 6–7 mid-size grants."},
  {title:"Governance is Lean — Capacity May Be a Risk", body:"No employees earn over $50K. The entire foundation is operated by a small staff with family directors compensated at $20K each. As the portfolio approaches $300M and grantmaking complexity increases, governance capacity is worth examining."},
];
