// Data: funding-2026.js
// Funding-type methodology cards for the 2026 cycle. Classification itself is
// computed at render time by classifyType() from each grant's memo/purpose.

DATA[2026] = DATA[2026] || {};

DATA[2026].typeMethodology = [
  {type:"Program",color:TYPE_COLORS["Program"],desc:"Grant restricted to a named program, service, or initiative — the majority of grants (76 this cycle). Examples: 'Bexar County Programs', 'Camperships', 'Mobile Mammography'."},
  {type:"Operational",color:TYPE_COLORS["Operational"],desc:"Explicitly for general operations — staff, overhead, and day-to-day costs. Identified by 'General Operations' or 'Operations' in the memo (Haven, United Way, SA Christian Dental, Animal Defense League)."},
  {type:"Capital",color:TYPE_COLORS["Capital"],desc:"Buildings, renovations, major equipment, endowments and scholarship funds — the dominant type at ~$5.2M. Includes Witte ($1.5M), Haven Phase III ($1.5M), Texas A&M First-Gen endowment ($1M), and St. Mary's scoreboards ($600K)."},
  {type:"Events & Sponsorships",color:TYPE_COLORS["Events & Sponsorships"],desc:"Galas, luncheons, and sponsorships where benefit is relationship- and visibility-driven. This cycle: Girls Inc. luncheon, United Way Power of the Purse, and Texas Business Hall of Fame."},
  {type:"In Memoriam",color:TYPE_COLORS["In Memoriam"],desc:"Grants made in memory of an individual. None this cycle — the St. Mary's scoreboards honoring Mr. Greehey (living founder) are classified as Capital, not memorial."},
  {type:"Admin & Fees",color:TYPE_COLORS["Admin & Fees"],desc:"Foundation membership dues and professional fees. None recorded in the June 2026 cycle."},
  {type:"Unrestricted",color:TYPE_COLORS["Unrestricted"],desc:"No specific restriction on use — blank memo or general support. This cycle: S.A.L.E., SA Young Women's Leadership Academy, and Sound Off."},
];
