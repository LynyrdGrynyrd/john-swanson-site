# Site Content Drafts & Change Log

> Tracks prior versions of website and resume content with rationale for each cut or change.
> Created 2026-02-16 during Momentive Director of Innovation & IP application optimization.

---

## Resume: JSwanson_Resume_Momentive_DirInnovationIP.md

### Change Set 1: Verb & Framing Upgrades (2026-02-16)

Rationale: Career-transitions and resume-structure subagents both flagged passive/weak verbs
that undercut Director-level positioning. ATS optimizer identified missing keyword matches.

| # | Section | Before | After | Why |
|---|---------|--------|-------|-----|
| 1 | NPI bullet | "Served as Project Manager for NeoNxGen..." | "Led NeoNxGen thermal interface material program..." | "Served as" is passive; Directors don't "serve as" PM, they lead programs |
| 2 | ISO bullet | "...contributed to IATF 16949 certification preparation." | "...supported IATF 16949 certification preparation as R&D lead." | "Contributed to" is vague and junior-sounding; adding "as R&D lead" clarifies ownership |
| 3 | IP reviews | "outside counsel (Calfee)" | "outside patent counsel (Calfee)" | Exact match to Momentive posting language |
| 4 | Innovation | "Organized cross-company innovation session" | "Convened cross-company innovation summit" | "Organized" reads as event logistics; "Convened" reads as executive initiative. "Summit" matches posting's "technology summits" keyword |
| 5 | Avient IP | "Administered graded IP Rewards program" | "Designed and administered a graded IP Rewards program" | "Administered" alone = HR clerk work; "Designed and administered" = architect + operator |
| 6 | Team Dev | "Instituted weekly technical share-outs...to build team capability and foster continuous learning." | "Established a weekly technical development program...to build team capability, foster continuous learning, and promote an innovation culture." | "Instituted share-outs" = Lab Manager busywork; "Established development program" = Director infrastructure. Added "innovation culture" (missing ATS keyword) |
| 7 | Interns | "Managed R&D interns with defined project assignments" | "Managed R&D interns and co-ops with defined project assignments" | Momentive posting lists "intern/co-op" -- exact keyword match |
| 8 | Patents | "**11 patents** in thermoplastic blends..." | "**Author of 11 patents** in thermoplastic blends..." | Posting says "patent authorship" -- mirrors that language |

### Change Set 2: Section Trims (2026-02-16)

Rationale: Career-transitions agent flagged Patents & Publications as tipping identity back
toward "scientist" rather than "Director of Innovation." Trim to essentials.

**CUT: Most Read Article line**
```
Most Read Article, *Macromolecules* (June & July 2015)
```
Why: Academic vanity metric. A Director of Innovation's publications section should signal
"I publish and patent" not "look how popular my paper was." The information is still on
the website and Google Scholar.

**MERGED: Oral presentations + Guest Lecturer into one line**
Before (2 lines):
```
Oral presentations at ACS National Meetings; Industry speaker at Compounding World Expo & AMI 2024
Guest Lecturer, CWRU Chem 343/443: Polymers (invited industry speaker series)
```
After (1 line):
```
Oral presentations at ACS National Meetings, Compounding World Expo, and AMI 2024; Guest Lecturer, Cal Poly Chem 343/443: Polymers
```
Why: Saves a line, maintains all content. Also corrected university from CWRU to Cal Poly
(user's alma mater, where the guest lecturing actually occurred).

### Change Set 3: Company Context (2026-02-16)

Rationale: Adding PE-backed vs. publicly traded context tells a career story -- John has
experience in both small PE-backed companies and large public corporations. This is a
differentiator for Momentive (itself a PE-carved-out company).

**NeoGraf description:**
Before: `...for a PE-backed specialty materials company.`
After: `...for a PE-backed specialty materials company (~$50M revenue, <100 employees).`

**Avient description:**
Before: `...for a Fortune 1000 specialty materials company (formerly PolyOne).`
After: `...for a publicly traded Fortune 1000 specialty materials company ($3.5B revenue, formerly PolyOne).`

---

## Website: App.jsx

### Change Set 1: Positioning Alignment (2026-02-15)

Applied during initial resume-to-website alignment session.

| Edit | Before | After | Why |
|------|--------|-------|-----|
| Hero text | "I'm a materials scientist who leads R&D teams..." | "I'm an R&D leader who translates complex science..." | Lead with leadership identity, not scientist |
| NeoGraf timeline | No IP framework mention | Added "25-document IP policy framework" | Resume's strongest differentiator was invisible on site |
| Impact metric | "$18M" | "$18M+" | Conservative estimate, matches resume language |
| New Impact card | (none) | "25 Documents in IP policy framework..." | Fills 8th card slot, highlights unique accomplishment |
| Tags | No IP tag | Added "IP Policy & Trade Secret Management" | Mirrors resume's IP section heading |
| Avient timeline | No LDP mention | Added LDP rotation hosting sentence | Personnel development evidence for Director positioning |

### Change Set 2: Company Context (2026-02-16)

**Avient timeline description:**
Before: `"Led a team of 6 scientists delivering customized solutions across 22 engineered thermoplastic product lines."`
After: `"Led a team of 6 scientists delivering customized solutions across 22 engineered thermoplastic product lines for this publicly traded, Fortune 1000 specialty materials company ($3.5B revenue)."`

Why: Shows PE (NeoGraf) vs. public (Avient) career breadth. Momentive is PE-backed (Apollo),
so demonstrating comfort in both environments is valuable.

---

## DOI / Patent Link Verification (2026-02-16)

All 11 links on the website verified:

### Journal Articles (5 DOIs)
| DOI | Title | Status |
|-----|-------|--------|
| 10.1021/acs.macromol.5b00585 | A Library of Thermoresponsive, Coacervate-Forming Biodegradable Polyesters | 302 → ACS |
| 10.1039/C7PY01391D | The Effect of Pendant Group Structure on the Thermoresponsive Properties... | 302 → RSC |
| 10.1021/acsmacrolett.8b00118 | Efficient Protein Encapsulation within Thermoresponsive Coacervate... | 302 → ACS |
| 10.1021/acs.macromol.6b01316 | A Solvent and Initiator Free, Low-Modulus, Degradable Polyester Platform... | 302 → ACS |
| 10.1021/ma100836c | Development of Polymeric Phase Change Materials On the basis of Diels-Alder... | 302 → ACS |

### Patents (6 Google Patents links)
| Patent | Title | Status |
|--------|-------|--------|
| WO2024243499A1 | Continuous fiber reinforced tapes | Valid (Pending) |
| WO2023278572A1 | Thermoset articles comprising nitrile butadiene rubber | Valid (Ceased) |
| WO2022047030A1 | Polymer blends of aliphatic polyketone and ABS | Valid (Ceased) |
| WO2022005896A1 | Polymer blends of polyamide and aliphatic polyketone | Valid (Ceased) |
| US10106514B2 | Thermoresponsive Polyesters | Valid (Granted 2018) |
| US10899885B2 | Vegetable oil based viscoelastic polymers with photoresponsive properties | Valid (Active, expires 2036) |
