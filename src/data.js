export const NAV_LINKS = ["About", "Philosophy", "Experience", "Impact", "Digital R&D", "Publications", "Contact"];

export function toSlug(value) {
  return value.toLowerCase().replace(/\s+/g, "-").replace("&", "and");
}

export const NAV_SLUGS = NAV_LINKS.map(toSlug);

export const PHILOSOPHY_ITEMS = [
  {
    num: "01",
    heading: "Leave it better than you found it",
    text: "Product lines, labs, teams, processes. My measure of success is whether things are meaningfully better because I was involved. I hate waste. I love solving problems. If something's broken, I'm probably already sketching a fix.",
  },
  {
    num: "02",
    heading: "Translate, don't gatekeep",
    text: "The best R&D leaders are bilingual: they speak science and they speak business. I sit between the lab and the P&L and make both sides feel understood. Customer requirements become technical specifications. Data becomes a story executives can act on.",
  },
  {
    num: "03",
    heading: "Build the team, then get out of the way",
    text: "Hire well, set clear goals, remove blockers, and trust people to deliver. I invest in structured onboarding and real development conversations. Good scientists don't need micromanagement. They need a culture where they can say 'I don't know' without getting punished for it. They need air cover.",
  },
  {
    num: "04",
    heading: "Innovation is the fire, not the spark",
    text: "Invention creates something new. Innovation turns it into business value. I didn't invent polyketone or graphite materials. I built the systems, IP strategy, and commercial pathways that turned them into revenue. That distinction matters to me, and it shapes how I run R&D.",
  },
];

export const EXPERIENCE_ITEMS = [
  {
    company: "NeoGraf Solutions",
    role: "Director of R&D",
    date: "2024 — 2026",
    desc: "Inherited a four-person R&D team, grew it from four to eight at its peak. Turned it into a stage-gate organization and grew the NPI pipeline to $18M+ across thermal, flame retardant, fuel cell, and sealing applications. Wrote the IP policy from scratch (25 documents condensed to 4 people would actually read), deployed electronic lab notebooks, and built patent analytics and portfolio reviews. Helped manage a $2M DOE-funded program for fuel cell bipolar plate development. Presented innovation strategy quarterly to the Board. Zero safety incidents in 24 months.",
  },
  {
    company: "Avient Corporation",
    role: "Technology Manager — Specialty Engineered Materials",
    date: "2022 — 2024",
    desc: "Led a team of 6 scientists delivering customized solutions across 22 engineered thermoplastic product lines. Generated $12M+ in new revenue through product launches and global technology transfers. Reduced R&D working capital by 93% through strategic inventory management. Doubled year-over-year invention records. Hosted R&D Leadership Development Program rotations, mentoring early-career scientists through structured product line and project assignments. Designed digital workflow systems that streamlined project management for a 25-person organization.",
  },
  {
    company: "Avient Corporation",
    role: "Lead R&D Engineer — Specialty Engineered Materials",
    date: "2018 — 2022",
    desc: "Identified aliphatic polyketone as a compounding opportunity and developed patented blend families that grew into a $53M global sales pipeline across four international business units, earning three Technology Excellence Awards. Developed biodegradable packaging generating a $34.5M pipeline. Led rapid customer co-development programs including a $1.53M product launch for a major consumer electronics brand.",
  },
  {
    company: "PolyOne Corporation",
    role: "Senior R&D Engineer — Leadership Development Program",
    date: "2016 — 2018",
    desc: "Selected for competitive corporate R&D leadership program with rotations across Lean Six Sigma, DOE, thermoplastic composite formulation, processing, and analytical methods. Learned how a $3B company actually moves products from lab to market.",
  },
  {
    company: "University of Akron",
    role: "Ph.D. Polymer Science — NSF Graduate Research Fellow",
    date: "2011 — 2016",
    labName: "Joy Lab",
    labUrl: "https://joyresearch.sites.northeastern.edu/",
    desc: "Designed and synthesized thermoresponsive biodegradable polyesters for biomedical applications. Published across Macromolecules, Polymer Chemistry, and ACS Macro Letters. 3.73 GPA.",
  },
  {
    company: "Cal Poly San Luis Obispo",
    role: "B.S. Biochemistry — Polymers & Coatings Concentration",
    date: "2007 — 2011",
    labName: "Costanzo Lab",
    labUrl: "https://costanzolab.com/",
    desc: "Undergraduate research in thermoresponsive adhesive technology, where {dglue} originated. President of Alpha Chi Sigma professional chemistry fraternity. 3.80 GPA, magna cum laude.",
    descLinks: { dglue: { text: "D-Glue (Geisys Ventures)", url: "https://www.geisysventures.com/" } },
  },
];

export const IMPACT_METRICS = [
  { value: "$53M", label: "Global sales pipeline built from aliphatic polyketone platform at Avient" },
  { value: "$18M+", label: "NPI pipeline developed as Director of R&D across thermal, FR, fuel cell & sealing applications" },
  { value: "12", label: "Patents in thermoplastic blends, composites & biodegradable materials" },
  { value: "$12M+", label: "New product revenue across multiple launches and technology transfers" },
  { value: "22", label: "Product lines managed across global business units" },
  { value: "$5.6M+", label: "Materials qualification program for major LEO satellite constellation" },
  { value: "93%", label: "Reduction in R&D working capital through proactive management" },
  { value: "25", label: "Documents in IP policy framework: invention disclosure triage, trade secret management, FTO analysis & role-specific training" },
  { value: "9", label: "Peer-reviewed publications in Macromolecules, Polymer Chemistry & ACS Macro Letters" },
];

export const DIGITAL_RD_ITEMS = [
  {
    label: "AI-Powered Data Tools",
    desc: "Scientists were spending hours every week on manual data entry. I built tools to fix that: automated parsing of certificates of analysis, legacy test data extraction, and searchable databases that actually get used.",
  },
  {
    label: "Patent Analytics & IP Strategy",
    desc: "Patent searches used to take weeks and cost a fortune in outside counsel. I championed bringing in a patent analytics platform for prior-art searches, competitor monitoring, and freedom-to-operate analyses, then got the team actually using it. Hours instead of weeks.",
  },
  {
    label: "Electronic Lab Notebooks",
    desc: "Moved the lab from paper notebooks to a structured ELN. Standardized experimental templates so when someone leaves, their data doesn't leave with them.",
  },
  {
    label: "Innovation Management",
    desc: "Built innovation management systems that connect the pipeline to the P&L: voice-of-customer data feeding into stage-gate workflows, with portfolio dashboards that show what's actually making money.",
  },
];

export const EXPERTISE_CATEGORIES = [
  {
    heading: "Materials & Formulation",
    tags: ["Polyamides", "Polyketone", "Polyolefins", "TPEs", "Specialty Chemical Formulations", "Biodegradable Polymers", "Flame Retardants", "Masterbatching", "Composites"],
  },
  {
    heading: "Characterization & Processing",
    tags: ["DSC / TGA / TMA", "Polymer Rheology", "Mechanical Testing (ASTM & ISO)", "Extrusion & Compounding", "Injection Molding", "Blown Film", "Multilayer Coextrusion"],
  },
  {
    heading: "Leadership & Methods",
    tags: ["Stage-Gate (Cooper)", "DOE / Lean Six Sigma", "OKR / KPI Frameworks", "Team Building & Talent Development", "Digital R&D Transformation", "Patent Strategy & FTO", "IP Policy & Trade Secret Management", "Voice of Customer (VOC)", "Innovation Portfolio Management", "Stakeholder Engagement", "Grant Program Management", "LCA"],
  },
];

export const BEYOND_ITEMS = [
  { icon: "→", text: "I'm a registered minister and have officiated four weddings — apparently people trust me with the important stuff." },
  { icon: "→", text: "During COVID, with no races running, I organized my own solo marathon through the Rocky River Reservation, supported by my wife at water stops along the route. I've since run the Cleveland Marathon and two half marathons. Not fast, but finished." },
  { icon: "→", text: "My phone number is 330-POLYMER (330-765-9637). Yes, really." },
  { icon: "→", text: "I guest lecture at Shaker Heights High School, O'Dea High School, and Cal Poly, teaching IB Chemistry and polymer science. Turns out 'industry guy comes back to the classroom' is a talk students actually show up for." },
  { icon: "→", text: "Father and husband in Lakewood, Ohio. Born in Seattle, educated at Cal Poly, trained in Akron, and stayed in Cleveland on purpose." },
];

export const PATENTS = [
  { title: "Thermoplastic elastomer articles comprising styrene block copolymer and rubber", subtitle: "US 2025/0075021, 2025", url: "https://patents.google.com/patent/US20250075021A1/en" },
  { title: "Continuous fiber reinforced tapes", subtitle: "WO/2024/243499, 2024", url: "https://patents.google.com/patent/WO2024243499A1/en" },
  { title: "Glass reinforced thermoplastic material", subtitle: "WO/2024/145353, 2024", url: "https://patents.google.com/patent/WO2024145353A1/en" },
  { title: "Thermoset articles comprising silicone rubber", subtitle: "US 2024/0287295, 2024", url: "https://patents.google.com/patent/US20240287295A1/en" },
  { title: "Thermoplastic elastomer articles comprising styrene block copolymer", subtitle: "WO/2023/133171, 2023", url: "https://patents.google.com/patent/WO2023133171A1/en" },
  { title: "Thermoset articles comprising nitrile butadiene rubber", subtitle: "WO/2023/278572, 2023", url: "https://patents.google.com/patent/WO2023278572A1/en" },
  { title: "Thermoplastic elastomer articles comprising polar elastomer and rubber", subtitle: "WO/2023/278561, 2023", url: "https://patents.google.com/patent/WO2023278561A1/en" },
  { title: "Polymer blends of aliphatic polyketone, ABS, and flame retardant", subtitle: "WO/2022/047027, 2022", url: "https://patents.google.com/patent/WO2022047027A1/en" },
  { title: "Polymer blends of aliphatic polyketone and ABS", subtitle: "WO/2022/047030, 2022", url: "https://patents.google.com/patent/WO2022047030A1/en" },
  { title: "Polymer blends of polyamide and aliphatic polyketone", subtitle: "WO/2022/005896, 2022", url: "https://patents.google.com/patent/WO2022005896A1/en" },
  { title: "Vegetable oil based viscoelastic polymers with photoresponsive properties", subtitle: "US Patent 10,899,885, 2021", url: "https://patents.google.com/patent/US10899885B2/en" },
  { title: "Thermoresponsive Polyesters", subtitle: "US Patent 10,106,514, 2018", url: "https://patents.google.com/patent/US10106514B2/en" },
];

export const JOURNAL_ARTICLES = [
  { title: "Sequence analysis of cyclic polyester copolymers using ion mobility tandem mass spectrometry", subtitle: "International Journal of Mass Spectrometry, 2018", url: "https://doi.org/10.1016/j.ijms.2017.07.019" },
  { title: "Efficient Protein Encapsulation within Thermoresponsive Coacervate-Forming Biodegradable Polyesters", subtitle: "ACS Macro Letters, 2018", url: "https://doi.org/10.1021/acsmacrolett.8b00118" },
  { title: "The Effect of Pendant Group Structure on the Thermoresponsive Properties of N-Substituted Polyesters", subtitle: "Polymer Chemistry, 2017", url: "https://doi.org/10.1039/C7PY01391D" },
  { title: "A coacervate-forming biodegradable polyester with elevated LCST based on bis-(2-methoxyethyl)amine", subtitle: "Polymer Chemistry, 2016", url: "https://doi.org/10.1039/C6PY00814C" },
  { title: "A Solvent and Initiator Free, Low-Modulus, Degradable Polyester Platform with Modular Functionality", subtitle: "Macromolecules, 2016", url: "https://doi.org/10.1021/acs.macromol.5b02399" },
  { title: "A Library of Thermoresponsive, Coacervate-Forming Biodegradable Polyesters", subtitle: "Macromolecules, 2015 — Most Read Article, June & July 2015", url: "https://doi.org/10.1021/acs.macromol.5b00585" },
  { title: "Synthesis and evaluation of thermally-responsive coatings based upon Diels-Alder chemistry and renewable materials", subtitle: "Polymer Chemistry, 2014 — Cover Article", url: "https://doi.org/10.1039/C3PY01024D" },
  { title: "Influence of Metal Ion and Polymer Core on the Melt Rheology of Metallosupramolecular Films", subtitle: "Macromolecules, 2012", url: "https://doi.org/10.1021/MA201659D" },
  { title: "Development of Polymeric Phase Change Materials On the basis of Diels-Alder Chemistry", subtitle: "Macromolecules, 2010", url: "https://doi.org/10.1021/ma100836c" },
];

export const PROFILE_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/johnpswanson", display: "linkedin.com/in/johnpswanson" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=A4L-xLoAAAAJ&hl=en", display: "Google Scholar" },
  { label: "ORCID", href: "https://orcid.org/0000-0001-8820-7273", display: "ORCID" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/John-Swanson", display: "ResearchGate" },
];

export const PUBLICATION_PROFILE_LINKS = [
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=A4L-xLoAAAAJ&hl=en" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/John-Swanson" },
  { label: "ORCID", href: "https://orcid.org/0000-0001-8820-7273" },
];

export const AWARDS = [
  { title: "Technology Excellence Award — Specialty TPV IP", org: "Avient", year: "2021" },
  { title: "Technology Excellence Award — PIR Composite Waste", org: "Avient", year: "2021" },
  { title: "Technology Excellence Award — Aliphatic Polyketone Platform", org: "Avient", year: "2020" },
  { title: "NSF Graduate Research Fellowship", org: "National Science Foundation", year: "2012" },
  { title: "College of Science and Math Award for Excellence in Biochemistry", org: "Cal Poly", year: "2011" },
];

export const PROF_DEV = [
  { title: "Stage-Gate Innovation Management", org: "NeoGraf Solutions", year: "2024" },
  { title: "Lean Six Sigma Purple Belt", org: "Avient Corporation", year: "2023" },
  { title: "Design of Experiments (DOE)", org: "Stat-Ease", year: "2018" },
  { title: "R&D Leadership Development Program", org: "PolyOne Corporation", year: "2016–2018" },
];

export const ASK_ME_ABOUT = [
  "Running the PolyOne 5k in an inflatable dinosaur suit",
  "Why I'm using AI coding to build a mood tracker app",
];

export const FOOTER_CONTENT = {
  COPYRIGHT_TEXT: "John P. Swanson \u00B7 Lakewood, Ohio",
  NOTE_TEXT: "This site was designed in conversation with Claude, Gemini, Codex, and VS Code/Windsurf, built with React and Vite, and deployed on Netlify. The background texture is inspired by USGS topographic maps of the Rocky River Reservation. Minimal frameworks were harmed in the making of this website."
};
