// Data: impact-2026.js
// Estimated reach for the 2026 June cycle. "Reach" = total program capacity,
// NOT attribution to GFF; one person may appear in multiple programs. Figures
// are estimates from grant size, program type, and sector benchmarks — meant
// for directional scale, to be refined with grantee-reported numbers.
// Capital / research / sponsorship line items carry reach:0 (shown as "—").

DATA[2026] = DATA[2026] || {};

DATA[2026].impactFootnote = `<strong style="color:var(--text-muted)">Community Economic Return:</strong> Independent cost-benefit research (e.g., Dr. Steve Nivin's study of Haven for Hope) finds high downstream community value per dollar of social investment. Applying sector ROI ratios conservatively — homelessness ($8–42:1), healthcare ($4–6:1), education ($7–12:1) — to the $8.55M June 2026 cycle yields an estimated <strong style="color:var(--gold-light)">$250M–$400M in community economic return</strong>. Reach figures above are program-capacity estimates, not attribution, and will be refined with grantee-reported data. · Sector benchmarks: Nivin (2025); RAND Corp.`;

DATA[2026].impact = [
  // ── HOMELESSNESS & BASIC NEEDS ──────────────────────────────────────────
  {org:'Haven for Hope',                         amt:2000000, cat:'Homelessness & Basic Needs', reach:9800, unit:'people', detail:'Operations + 15th Anniversary Capital Campaign (Phase III). Campus serves ~9,800 unique individuals/yr (~1,700/day) across 75+ on-campus partner services.'},
  {org:'Faith Kitchen',                          amt:75000,   cat:'Homelessness & Basic Needs', reach:3000, unit:'people', detail:'Food ministry serving ~3,000 individuals annually; 300+ meals/day.'},
  {org:'Guardian House',                         amt:30000,   cat:'Homelessness & Basic Needs', reach:200,  unit:'families', detail:'Supervised visitation and safe exchange for families navigating custody or domestic violence.'},
  {org:'Hill Country Daily Bread Ministries',    amt:25000,   cat:'Homelessness & Basic Needs', reach:250,  unit:'people', detail:'Hunger relief and support for rural Hill Country families.'},
  {org:'Texas Ramp Project',                     amt:25000,   cat:'Homelessness & Basic Needs', reach:120,  unit:'ramps', detail:'Wheelchair ramps built for low-income elderly and disabled Bexar County residents.'},
  {org:'Christian Assistance Ministry',          amt:25000,   cat:'Homelessness & Basic Needs', reach:1200, unit:'people', detail:'Utility, food, and clothing assistance for low-income households.'},
  {org:'Prospera Housing Community Services',    amt:20000,   cat:'Homelessness & Basic Needs', reach:60,   unit:'residents', detail:'Resident services at The Terraces at Haven affordable housing.'},
  {org:'Blueprint Ministries',                   amt:15000,   cat:'Homelessness & Basic Needs', reach:20,   unit:'homes', detail:'Volunteer home repairs for low-income Bexar County homeowners.'},
  {org:'Brighter Bites',                         amt:15000,   cat:'Homelessness & Basic Needs', reach:500,  unit:'families', detail:'Fresh-produce distribution paired with nutrition education.'},
  {org:'Street2Feet',                            amt:10000,   cat:'Homelessness & Basic Needs', reach:100,  unit:'people', detail:'Support for Haven for Hope participants experiencing homelessness.'},
  {org:'Thrive Youth Center',                    amt:10000,   cat:'Homelessness & Basic Needs', reach:60,   unit:'youth', detail:'Emergency shelter for LGBTQ youth experiencing homelessness.'},
  {org:'Woodland Church — Child of God Bed Ministry', amt:10000, cat:'Homelessness & Basic Needs', reach:150, unit:'beds', detail:'Beds built and delivered to Bexar County families in need.'},
  {org:'Transformation House',                   amt:5000,    cat:'Homelessness & Basic Needs', reach:40,   unit:'people', detail:'Coordinated reentry and recovery housing support.'},

  // ── CHILDREN'S CAUSES ───────────────────────────────────────────────────
  {org:'Roy Maas Youth Alternatives',           amt:75000,   cat:"Children's Causes", reach:600,  unit:'youth', detail:'General operations; residential and therapeutic care for abused and neglected youth.'},
  {org:'Boysville, Inc.',                        amt:70000,   cat:"Children's Causes", reach:200,  unit:'children', detail:'Passenger van for transportation at the residential children\'s campus.'},
  {org:'Child Advocates San Antonio (CASA)',    amt:50000,   cat:"Children's Causes", reach:1500, unit:'children', detail:'Volunteer court advocates for children in the foster-care and court systems.'},
  {org:'Brighton Center',                        amt:50000,   cat:"Children's Causes", reach:400,  unit:'children', detail:'Early intervention and therapy for children with developmental delays or disabilities.'},
  {org:'SJRC Texas',                             amt:50000,   cat:"Children's Causes", reach:500,  unit:'youth', detail:'Belong program; foster-care and residential youth services.'},
  {org:'Big Brothers Big Sisters of South Texas', amt:40000, cat:"Children's Causes", reach:800,  unit:'youth', detail:'One-to-one mentoring matches across Bexar County.'},
  {org:'Back-to-School Drive (5 partner agencies)', amt:30000, cat:"Children's Causes", reach:1500, unit:'children', detail:'Shoes and backpacks for children served by Haven, SJRC, Boysville, Roy Maas, and Arms of Hope.'},
  {org:'Discovery Camps, Inc.',                  amt:30000,   cat:"Children's Causes", reach:150,  unit:'campers', detail:'Camperships for Bexar County children.'},
  {org:'ChildSafe',                              amt:30000,   cat:"Children's Causes", reach:5000, unit:'children', detail:'Child-abuse assessment, forensic interviews, and therapy services.'},
  {org:'Barshop Jewish Community Center',        amt:25000,   cat:"Children's Causes", reach:80,   unit:'children', detail:'Inclusion camp for Bexar County children with disabilities.'},
  {org:'Young Life San Antonio',                 amt:25000,   cat:"Children's Causes", reach:600,  unit:'youth', detail:'Campus-based mentoring programs for area teens.'},
  {org:'Boys & Girls Clubs of San Antonio',     amt:20000,   cat:"Children's Causes", reach:1000, unit:'youth', detail:'Academic Recovery & Success program.'},
  {org:'Kinetic Kids, Inc.',                     amt:20000,   cat:"Children's Causes", reach:500,  unit:'children', detail:'Adaptive sports and recreation for children with disabilities.'},
  {org:'Camp Aranzazu',                          amt:15000,   cat:"Children's Causes", reach:80,   unit:'campers', detail:'Camperships for children with special needs and chronic illness.'},
  {org:'Undies for Everyone',                    amt:15000,   cat:"Children's Causes", reach:8000, unit:'children', detail:'New underwear for SAISD students in need.'},
  {org:'Girls Inc of San Antonio',              amt:15000,   cat:"Children's Causes", reach:1000, unit:'girls', detail:'Program support; STEM, leadership, and life-skills for girls.'},
  {org:'Girls Inc. — Luncheon Sponsorship',     amt:10000,   cat:"Children's Causes", reach:0,    unit:'sponsorship', detail:'Power of the Purse luncheon sponsorship (honoring Kathy Mays Johnson and Paige Johnson Bonar).'},
  {org:'Sleep in Heavenly Peace',               amt:10000,   cat:"Children's Causes", reach:200,  unit:'beds', detail:'Beds built for Bexar County children who do not have one.'},
  {org:'The Ferrari Kid',                         amt:10000,   cat:"Children's Causes", reach:100,  unit:'children', detail:'Hope Tank support for children facing cancer and serious illness.'},
  {org:'Wheelchairs 4 Kids',                     amt:10000,   cat:"Children's Causes", reach:15,   unit:'children', detail:'Custom wheelchairs and mobility equipment for children.'},
  {org:'Believe It Foundation',                  amt:4535,    cat:"Children's Causes", reach:2,    unit:'campers', detail:'Two camperships for children with disabilities.'},

  // ── EDUCATION ───────────────────────────────────────────────────────────
  {org:'Witte Museum',                           amt:1540000, cat:'Education', reach:50000, unit:'visits', detail:'Multi-year capital commitment (part of a $3M pledge) plus Witte for All free/subsidized admission (~50K visits).'},
  {org:'Texas A&M-San Antonio Foundation',       amt:1000000, cat:'Education', reach:30,   unit:'students', detail:'Addition to the GFF First-Gen Scholarship endowment (~30 first-generation students supported annually).'},
  {org:"St. Mary's University",                  amt:600000,  cat:'Education', reach:0,    unit:'capital', detail:'New arena scoreboards (capital), honoring founder Bill Greehey.'},
  {org:'The University of Texas at San Antonio', amt:598334,  cat:'Education', reach:200,  unit:'students', detail:'Be Bold scholarships + football scholarships + UTSA community arts education programs.'},
  {org:'YWCA San Antonio',                       amt:100000,  cat:'Education', reach:300,  unit:'children', detail:'Capital: Women\'s Live & Learn Campus and Early Childhood Education & Care Center (Najim match).'},
  {org:'The DoSeum',                             amt:50000,   cat:'Education', reach:40000, unit:'visits', detail:'Museum for All — free/subsidized admission for low-income families.'},
  {org:'Texas Business Hall of Fame',            amt:45000,   cat:'Education', reach:3,    unit:'students', detail:"St. Mary's scholarship ($15K awarded in 2026, 2027, and 2028)."},
  {org:'San Antonio Museum of Art',              amt:40000,   cat:'Education', reach:20000, unit:'visits', detail:'Family Days free community admission.'},
  {org:'San Antonio Education Partnership',      amt:35000,   cat:'Education', reach:500,  unit:'students', detail:'Road to Success college-access program.'},
  {org:"SA Young Women's Leadership Academy",    amt:25000,   cat:'Education', reach:800,  unit:'students', detail:'Support for the all-girls public school.'},
  {org:'Alamo Heights School Foundation',        amt:25000,   cat:'Education', reach:300,  unit:'students', detail:'Teacher support and education programs.'},
  {org:'SAY Sí',                                 amt:25000,   cat:'Education', reach:300,  unit:'students', detail:'Year-round multidisciplinary arts education for youth.'},
  {org:'Youth Orchestras of San Antonio',        amt:25000,   cat:'Education', reach:400,  unit:'students', detail:'General operations; youth orchestra training.'},
  {org:'SA Life Academy',                        amt:25000,   cat:'Education', reach:150,  unit:'students', detail:'Program support; alternative education.'},
  {org:'NPower',                                 amt:20000,   cat:'Education', reach:60,   unit:'students', detail:'Free tech workforce training for young adults and veterans.'},
  {org:'Somerset ISD Education Foundation',      amt:20000,   cat:'Education', reach:200,  unit:'students', detail:'Teacher support and education programs.'},
  {org:'The Holdsworth Center',                  amt:20000,   cat:'Education', reach:50,   unit:'leaders', detail:'SAISD leadership development for educators.'},
  {org:'Briscoe Western Art Museum',             amt:15000,   cat:'Education', reach:10000, unit:'visits', detail:"Community and locals' free admission days."},
  {org:'Majestic Empire Foundation',             amt:15000,   cat:'Education', reach:20,   unit:'students', detail:'Bexar County scholarships.'},
  {org:'Winston School San Antonio',             amt:15000,   cat:'Education', reach:150,  unit:'students', detail:'Teacher support; school for students with learning differences.'},
  {org:'Contemporary at Blue Star',              amt:10000,   cat:'Education', reach:200,  unit:'people', detail:'FRAME direct services and arts access.'},
  {org:'Junior Achievement of South Texas',      amt:10000,   cat:'Education', reach:2000, unit:'students', detail:'Financial-literacy and work-readiness programs.'},
  {org:'San Antonio Book Festival',              amt:10000,   cat:'Education', reach:1500, unit:'students', detail:'Authors in Schools program.'},
  {org:"St. Mary's University Athletics",        amt:10000,   cat:'Education', reach:0,    unit:'sponsorship', detail:'Athletic program support.'},
  {org:'Children\'s Chorus of San Antonio',      amt:5000,    cat:'Education', reach:150,  unit:'children', detail:'Choral music education (Haven program).'},
  {org:'San Pedro Playhouse',                    amt:5000,    cat:'Education', reach:500,  unit:'students', detail:'Education nights for Bexar County students.'},

  // ── HEALTH & HUMAN WELFARE ──────────────────────────────────────────────
  {org:'San Antonio Christian Dental Clinic',    amt:220000,  cat:'Health & Human Welfare', reach:1500, unit:'people', detail:'Free dental care and prosthetics on the Haven for Hope campus.'},
  {org:'AugustHeart',                            amt:150000,  cat:'Health & Human Welfare', reach:5000, unit:'youth', detail:'Free heart screenings for Bexar County youth.'},
  {org:'UT Health SA — Dr. Usatine (Haven Clinic)', amt:125000, cat:'Health & Human Welfare', reach:1200, unit:'people', detail:'Dermatology clinic serving Haven for Hope residents.'},
  {org:"Morgan's",                               amt:100000,  cat:'Health & Human Welfare', reach:0,    unit:'capital', detail:"Morgan's Camp capital safety improvements (ultra-accessible inclusion camp)."},
  {org:'Greehey Children\'s Cancer Research Institute', amt:100000, cat:'Health & Human Welfare', reach:0, unit:'research', detail:'Research on chemotherapy mitigation using melatonin (UT Foundation).'},
  {org:'Rise Recovery',                          amt:50000,   cat:'Health & Human Welfare', reach:2000, unit:'people', detail:'Substance-use recovery support for youth and families.'},
  {org:'HeartGift',                              amt:35000,   cat:'Health & Human Welfare', reach:8,    unit:'children', detail:'Life-saving heart surgeries for children (San Antonio surgeries).'},
  {org:'Sight Savers America',                   amt:30000,   cat:'Health & Human Welfare', reach:200,  unit:'children', detail:'Vision and blindness aids for Bexar County children and individuals.'},
  {org:'The Village at Incarnate Word',          amt:25000,   cat:'Health & Human Welfare', reach:100,  unit:'seniors', detail:'In-home program for low-income seniors.'},
  {org:'Muscular Dystrophy Association',         amt:20000,   cat:'Health & Human Welfare', reach:300,  unit:'people', detail:'San Antonio Care Center clinical services.'},
  {org:'SLEW Cancer Wellness Center',            amt:20000,   cat:'Health & Human Welfare', reach:300,  unit:'people', detail:'Emotional well-being support for cancer patients and families.'},
  {org:'Veterans Assistance Dogs of Texas',      amt:20000,   cat:'Health & Human Welfare', reach:1,    unit:'service dog', detail:'Service dog placed with a Bexar County veteran.'},
  {org:'The Arc of San Antonio',                 amt:20000,   cat:'Health & Human Welfare', reach:250,  unit:'adults', detail:'Adult life-enrichment for people with intellectual & developmental disabilities.'},
  {org:'Guide Dogs of Texas',                    amt:15000,   cat:'Health & Human Welfare', reach:5,    unit:'guide dogs', detail:'Guide dogs for Texans who are blind or visually impaired.'},
  {org:'Life Skills for Living',                 amt:15000,   cat:'Health & Human Welfare', reach:100,  unit:'people', detail:'Independent-living skills (Haven program).'},
  {org:'Texas Society to Prevent Blindness',     amt:10000,   cat:'Health & Human Welfare', reach:2000, unit:'people', detail:'Vision screenings across Bexar County.'},
  {org:'Empower House SA',                       amt:10000,   cat:'Health & Human Welfare', reach:200,  unit:'people', detail:'Salaries and programs; family support services.'},
  {org:'Alamo Breast Cancer Foundation',         amt:6000,    cat:'Health & Human Welfare', reach:300,  unit:'women', detail:'Mobile mammography screenings for Bexar County.'},
  {org:'PKD Foundation',                         amt:5000,    cat:'Health & Human Welfare', reach:100,  unit:'people', detail:'Local polycystic kidney disease support.'},
  {org:'Threads of Love (SARAH Chapter)',        amt:5000,    cat:'Health & Human Welfare', reach:500,  unit:'families', detail:'Handmade garments and support for NICU and bereaved families.'},

  // ── COMMUNITY CAUSES ────────────────────────────────────────────────────
  {org:'Animal Defense League of Texas',         amt:120000,  cat:'Community Causes', reach:5000, unit:'animals', detail:'Capital campaign + operations; no-kill animal shelter and adoption.'},
  {org:'United Way SA & Bexar County',           amt:106000,  cat:'Community Causes', reach:0,    unit:'umbrella', detail:'General operations + Power of the Purse; umbrella funder (reach counted within partner agencies).'},
  {org:'Sound Off',                              amt:50000,   cat:'Community Causes', reach:5000, unit:'students', detail:'Multi-year civic engagement / student voice program.'},
  {org:'San Antonio Botanical Garden',           amt:50000,   cat:'Community Causes', reach:30000, unit:'visits', detail:'Splendor underwriting supporting public garden access.'},
  {org:'American Red Cross (Greater SA)',         amt:25000,   cat:'Community Causes', reach:2000, unit:'people', detail:'Home Fire program — smoke alarms and disaster response.'},
  {org:'S.A.L.E. (Livestock Exposition)',        amt:18000,   cat:'Community Causes', reach:50,   unit:'students', detail:'Youth agriculture programs and scholarships.'},
  {org:'DaisyCares',                             amt:15000,   cat:'Community Causes', reach:1000, unit:'pets', detail:'Pet-food assistance for low-income families.'},
  {org:'Episcopal Diocese of West Texas',        amt:15000,   cat:'Community Causes', reach:80,   unit:'campers', detail:'Camperships.'},
  {org:'San Antonio Pets Alive',                 amt:10000,   cat:'Community Causes', reach:2000, unit:'animals', detail:'No-kill lifesaving pet care.'},
  {org:'Green Spaces Alliance of South Texas',   amt:5000,    cat:'Community Causes', reach:100,  unit:'youth', detail:'PYW program; conservation and green-space stewardship.'},
];

DATA[2026].heroes1 = [
  { label:'Total Committed — June Cycle', value:'$8.55M', color:'#c9a84c',
    note:'97 grants to 90 organizations — about 57% of the Foundation\'s $15M 2026 distribution target.' },
  { label:'People Facing Homelessness Reached', value:'~15,000', color:'#e05c5c',
    note:'Haven for Hope (~9,800/yr) + Faith Kitchen (3,000) + Christian Assistance Ministry, Hill Country Daily Bread, Street2Feet, Thrive and others across the basic-needs portfolio.' },
  { label:'Children & Youth Served', value:'~25,000', color:'#5b8dee',
    note:'CASA, ChildSafe (~5,000), Big Brothers Big Sisters, Boys & Girls Clubs, Undies for Everyone (~8,000), plus camps and mentoring programs.' },
  { label:'Students & Museum Visitors', value:'~200,000', color:'#c9a84c',
    note:'Witte, DoSeum, SAMA and Briscoe free/subsidized admission (~120K) plus scholarships and in-school programs via UTSA, Texas A&M, and SAISD partners.' },
];

DATA[2026].heroes2 = [
  { label:'Capital & Endowment Invested', value:'$5.2M', color:'#9b72d9',
    note:'Witte ($1.5M), Haven Phase III ($1.5M), Texas A&M First-Gen endowment ($1M), St. Mary\'s scoreboards ($600K) and more — long-term institutional capacity.' },
  { label:'Health Screenings & Care', value:'~12,000', color:'#4ec9a4',
    note:'AugustHeart heart screenings (~5,000), SA Christian Dental, Dr. Usatine\'s Haven clinic, Rise Recovery, vision screenings and mobile mammography.' },
  { label:'Animals Cared For', value:'~8,000', color:'#e07a3c',
    note:'Animal Defense League, San Antonio Pets Alive, and DaisyCares pet-food assistance, plus service and guide dogs for veterans and people who are blind.' },
  { label:'Multi-Year Pledges Active', value:'$4.8M', color:'#5b8dee',
    note:'Witte, UTSA Be Bold, Dr. Usatine, Sound Off, SAYWLA and others — with $255K still owed across 2027–2028. See the Pledge Waterfall tab.' },
];
