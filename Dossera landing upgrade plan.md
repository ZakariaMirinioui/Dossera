# DOSSERA / JAMS Marketing Site — Upgrade Plan (v2)

**Owner:** Zakaria — Dossera Tech
**Executor:** AI coding agent (OpenCode / Big Pickle)
**Status:** Draft plan, execute phase by phase, in order. Do not skip ahead.
**Prime directive for the agent:** Every phase below is a *starting scope*, not a ceiling. Before starting a phase, re-read it, expand the task list with the specific implementation steps needed for our actual codebase (framework, component structure, existing CSS/tokens), and only then start building. When a phase is finished, write a short changelog entry at the bottom of this file under "Phase Log" before moving to the next phase.

---

## 0.1 Source of truth for all technical claims

The official **JAMS PRD (v1.5.0, Enterprise)** is now the authoritative source for every technical/feature claim on this site. Before writing or approving any copy in Phase 2 (and before building any diagram in Phase 4/6), the agent must check the claim against the PRD. This resolves several things flagged as "unverifiable" in the original audit below — some of what looked like marketing overclaiming actually corresponds to real, documented functionality, and some of what's on the current page is simply *wrong* relative to the PRD (not just badly worded). Key corrections the agent must apply:

- **The "3-Tier Cache Architecture" section is factually wrong as currently built.** The mock presents Redis (hot cache) → Meilisearch (warm cache) → PostgreSQL (cold storage) as one linear caching pipeline. Per the PRD, that's a conflation of two separate subsystems: (1) the actual resilience/caching layer is **L1 In-Memory → L2 Redis Cluster → L3 Database**, and (2) the **retrieval chain** is a separate pair of systems — semantic vector search (pgvector + ONNX runtime) and keyword search (Meilisearch) running side by side, not stacked as cache tiers. Phase 4 must be rebuilt around the real architecture, likely as two distinct diagrams (resilience/caching, and search/retrieval), not one three-box pipeline.
- **Forensic audit trails and RBAC are real, documented features** ("Forensic Audit Trails: Permanent, immutable logs of every document access and system modification," "Role Hierarchy: Granular permissions (Admin, Operator, Viewer)"). These were previously flagged in this plan as unverifiable overclaiming (Phase 9) — that flag is now lifted for these two specific claims. They can be stated plainly and confidently.
- **Hardware-bound licensing has a specific, real, and genuinely differentiating behavior worth featuring**: the system degrades to a "read-only" mode on license expiry rather than losing data or hard-locking. This is a much stronger and more specific trust signal than a generic "hardware-bound licensing" bullet and should be written up explicitly in Phase 6.
- **Real, verifiable capacity/engineering numbers exist** and should replace the fabricated stats flagged in Phase 8: 50+ concurrent judicial clerks supported, a tuned connection pool (max 50 / min 10), 90+ automated verification tests (`verify-upgrade.ts`) run before client handover, and a 14-day automated backup cycle covering both PostgreSQL and MinIO. These are specific, checkable, engineering-credible claims — exactly the kind of thing that should replace "10M+ Documents Processed" style filler.
- **Physical archive tracking is a real, distinctive feature** (3-level physical model: Blocks → Rows → Sections, tying digital records back to original paper file locations) and is currently *missing entirely* from the Core Capabilities section. Given the real Physical Archive Index system already built, this deserves to be a featured capability card, not an omission.
- **A real product roadmap exists** (Phase 2: full Case Management linking documents to judges/hearings/parties; Phase 3: push notifications for legal reminders via VAPID). This is worth a small, honest "What's Next" section — signals active development without overclaiming current-state.
- **Status/version discrepancy to resolve before writing any copy:** the PRD header states "Version 1.5.0 — Status: Production-Ready / Client-Facing," but the actual current status (per project context) is pre-first-deployment, approaching production at roughly v1.9.0, targeting Khouribga Court. The agent must not silently pick one — flag this discrepancy to Zakaria explicitly and get a single confirmed version number + status line to use consistently across the entire site before Phase 2 copy is finalized. Do not let the marketing site and the PRD contradict each other in front of a prospective institutional client.
- **Confidentiality notice on the PRD**: the source PRD is marked proprietary/confidential. The agent should use it to *ground* accurate marketing claims in truth, not lift its language verbatim or expose internal implementation details (specific library names like Tesseract.js/BullMQ/ONNX runtime/pgvector are fine as technical credibility signals if Zakaria confirms he's comfortable naming stack components publicly; connection pool tuning numbers, internal file names like `verify-upgrade.ts`, and similar internal specifics should stay out of public copy even though they're useful for the agent's own understanding of what's true).

---

## 0. Why this plan exists

The current landing page (both the live version and the redesign mock we produced ourselves) has three compounding problems, and we need to fix all three, not just the surface one:

1. **Visual identity problem** — it currently reads as "generic AI SaaS template with a red accent color slapped on it": red-to-black radial glow blobs behind the hero, one-sided colored left-borders on nearly every card (`border-left: 3px solid red`), glassy semi-transparent panels, icon-in-a-rounded-square treatment repeated identically on every section regardless of content. None of this is wrong because it's red — it's wrong because it's a *decoration pattern*, not a *design system*. It doesn't communicate "judicial-grade, sovereign, on-premise, institutional software." It communicates "Webflow template, 15 minutes, red theme."
2. **Content problem, which is actually more damaging than the visual problem** — large sections of body copy are garbled, non-grammatical AI filler text that was never proofread. Examples pulled directly from the current mock:
   - "Reliability and scale exhilaries provide documents and enigcoccale controller. high accuracy inartinerine and wanticaccess."
   - "Reticticity advanced, oon-keocentised eotonce, and locod pnoncoartsectionsts technology and biecoconsite."
   - "Archiving sich secure archiving, aomstiations and storage foll endcynomerty, tenritions, oportize, and rotirated compliance."
   - "24/7 Forensic Suppert is a coollocie coppport server Inatiuly, evenaca induing, anmodctions and ibeatocr."
   - Card copy under "On-Premise Installation" and similar sections is similarly broken.
   This is not a tone issue — it is literally unreadable nonsense sitting on a page meant to sell a system to Moroccan courts and law firms. **Fixing this is higher priority than any visual work and must happen before or alongside Phase 1.**
3. **Trust/credibility problem** — stats like "10M+ Documents Processed," "Sub-100ms Search Latency," "0 Data Leaks," badges implying FIPS/ISO-style certification, and a client-impact section imply an established enterprise track record we don't have yet (pre-first-deployment, at Khouribga Court). Overclaiming credentials on a judicial/government-adjacent sales page is a real risk (a court IT reviewer or procurement officer will ask for proof), and it undercuts trust the moment someone asks a follow-up question. This needs to be reframed honestly, not just restyled.

None of this means starting from zero. The **structure** and **narrative flow** of the two mocks (hero → architecture explainer → capabilities → security → infra → proof/stats → compliance → services → contact) is good and mostly stays. We are replacing the *skin* and *copy*, not the *skeleton*.

---

## 1. Non-negotiable design constraints (read this before writing any CSS)

These apply to every phase below. If the agent is ever unsure whether something violates these rules, default to the more conservative/plain option.

### Banned patterns (do not use anywhere on the site)
- Red as a dominant or "brand" accent color for CTAs, icons, borders, or section dividers. A single, restrained accent color is fine, but it must come from the actual design system tokens (see Phase 1), not `#e74c3c`/crimson/red-500-style AI-default red.
- One-sided colored borders on cards (`border-left: Npx solid <accent>`). This is the single most "AI template" tell on the current design — every card has it, on every section, regardless of whether it means anything.
- Gradient "blobs" / soft glow orbs behind hero or section headers (the reddish radial glow at the top of the current hero).
- Glassmorphism — frosted/blurred semi-transparent panels, `backdrop-filter: blur()` used as a decorative crutch.
- Identical icon treatment repeated with no variation across unrelated sections (every icon in a small rounded-square tinted box, same size, same radius, same tint, section after section). Icon treatment should vary meaningfully by section type (metric vs. capability vs. security vs. tech-stack logo).
- Center-aligned three-column "feature card" grids used as the default answer for every content group. This is the second most obvious "template" tell. At least half of the sections need an asymmetric or non-grid layout.
- Placeholder/garbled copy of any kind, anywhere, ever. If real copy isn't ready for a section, leave a clearly marked `TODO(copy):` comment in code and skip rendering that section rather than shipping filler text.
- Overclaimed metrics/certifications not yet true for the business (see Phase 3 for the honest reframe).
- Generic stock "server rack + padlock + firewall brick wall" iconography as a stand-in for "security." It's the most overused security cliché in B2B SaaS design and immediately reads as templated.

### Required instead
- A defined, documented design system (tokens for color, type, spacing, radius, elevation) that gets built in Phase 1 and referenced by name in every subsequent phase — not ad hoc Tailwind classes invented per-component.
- Layout variation across sections: some full-bleed, some asymmetric two-column, some dense data-table-like presentation, some diagrammatic. The page should not feel like the same card component copy-pasted eight times with different words in it.
- Typography doing more of the work than color. Judicial/institutional/legal-adjacent products earn trust through restraint, hierarchy, and precision, not through saturated accent colors.
- Real, verifiable, currently-true claims only. "Built for Moroccan courts," "on-premise, zero cloud dependency," "Arabic OCR + RTL support," "currently deploying at Tribunal de Khouribga" are all true and strong. Lean on those instead of invented stats.

---

## 2. Phase Overview (execute strictly in this order)

| Phase | Name | Primary Output |
|---|---|---|
| 0 | Audit & Content Freeze | Written audit doc + copy inventory, nothing shipped |
| 1 | Design System Foundation | Token file + base component library (buttons, cards, section wrapper, badge, nav) |
| 2 | Copy & Information Architecture Rewrite | Full real copy doc, reviewed and approved before touching layout |
| 3 | Navigation & Hero | Rebuilt nav + hero section |
| 4 | Architecture Explainer (3-Tier Cache) Section | Rebuilt with a real diagram, not a card list |
| 5 | Core Capabilities Section | Rebuilt with layout variation |
| 6 | Security & Sovereignty Section | Rebuilt, cliché iconography removed |
| 7 | Technical Infrastructure Section | Rebuilt with accurate, sourced logos/facts |
| 8 | Proof / Impact Section | Reframed honestly (no invented stats) |
| 9 | Compliance / Trust Section | Reframed honestly (no invented badges) |
| 10 | Services & Deployment Section | Rebuilt |
| 10.5 | "What's Next" Roadmap Section | New section, PRD-sourced, clearly future-framed |
| 11 | Contact / Inquiry Section | Rebuilt, functional form |
| 12 | Footer & Global Chrome | Rebuilt |
| 13 | Responsive & Mobile Pass | Full breakpoint audit |
| 14 | Motion & Micro-interaction Pass | Restrained, purposeful animation only |
| 15 | Performance Pass | Lighthouse/CWV targets |
| 16 | Accessibility Pass | WCAG AA minimum |
| 17 | SEO & Metadata Pass | Real metadata, OG images, sitemap |
| 18 | QA, Cross-Browser & Launch Checklist | Final sign-off |

Each phase section below expands on scope, deliverables, explicit dos/don'ts, and acceptance criteria. The agent should treat the "Agent expansion prompt" at the end of each phase as a literal instruction to itself: stop, think, write a more detailed task breakdown specific to our actual repo structure, then execute.

---

## Phase 0 — Audit & Content Freeze

**Goal:** Before touching any code, produce a written, honest audit of the current site (both the live version and the redesign mock) and a full inventory of every piece of copy that needs to be rewritten. No visual changes happen in this phase.

**Tasks:**
1. Screenshot and section-by-section list every existing page section (nav, hero, 3-tier architecture, core capabilities, security, infra, client impact, compliance vault, services, contact form, footer).
2. For each section, log:
   - What claim/message is it trying to make?
   - Is that claim currently true for Dossera/JAMS today? (be honest — most "enterprise" stat claims are not true pre-first-deployment)
   - Is the current copy grammatically coherent? Flag every garbled sentence verbatim.
   - What visual anti-patterns from Section 1 above does it currently use?
3. Produce `docs/landing-audit.md` with this inventory. This becomes the checklist Phases 2–12 work against.
4. Confirm final sitemap/section order with Zakaria before Phase 2 starts — the current order (hero → architecture → capabilities → security → infra → impact → compliance → services → contact) is a reasonable default, but flag if any section should be merged, cut, or reordered given we're pre-first-deployment (e.g. "Client Impact" with fabricated stats should probably become "Why We're Building This" or "Current Deployment Status" instead of pretending to be an established vendor).

**Acceptance criteria:** `docs/landing-audit.md` exists, lists every section, every garbled sentence found, every overclaimed stat, and every visual anti-pattern instance with a location reference. Nothing else changes yet.

**Agent expansion prompt:** Expand this into an actual line-by-line audit against the real component files in the repo, not just the screenshots, since the live code may already differ from the mocks.

---

## Phase 1 — Design System Foundation

**Goal:** Establish the actual design system this whole site (and ideally the JAMS dashboard/admin panel too, for consistency with the ongoing dashboard overhaul) will be built on. This phase produces tokens and base primitives only — no marketing sections get built yet.

**Tasks:**
1. **Color system.** Move away from "black background + red accent" as the whole palette. Suggested direction (agent should propose 2–3 real options with actual hex values and get sign-off, not just pick one):
   - A near-black or deep charcoal base (not pure `#000`), with a warm off-white/parchment for primary text (evokes paper/archive/legal document, ties to the judicial domain far better than red-on-black gaming-aesthetic contrast).
   - One restrained accent — could be a deep brass/gold, a muted burgundy used *sparingly* (not as the dominant color, only for one or two high-intent CTAs), or a deep navy/ink blue that pairs with "sovereign/institutional/government" associations. Avoid saturated red as the primary accent; if any warm/red-adjacent tone survives from the current brand mark, desaturate and darken it so it reads as "sealing wax / official stamp" rather than "alert / danger."
   - A neutral gray scale (5–7 steps) for borders, dividers, muted text, disabled states.
   - Document all of this in a single tokens file (CSS variables or Tailwind config, matching whatever the JAMS dashboard already uses so the two properties feel like one product family).
2. **Typography system.** Define:
   - A serif or slab-serif display face for headlines (reinforces "archive/legal/institutional" — the current mock already uses a serif for H1, keep that instinct but formalize it with a real type scale).
   - A clean, highly legible sans for body and UI text.
   - An Arabic-compatible typeface pairing for both, tested in RTL, since Arabic RTL support is a real product feature and the marketing site should itself demonstrate good Arabic typography, not just claim the feature exists.
   - A full type scale (H1–H6, body, small, caption) with defined weights, line-heights, and letter-spacing — not ad hoc per-component sizing.
3. **Spacing & layout grid.** Define a spacing scale (4/8px base) and a real content grid (max-width, column count, gutter) used consistently, so sections stop looking like isolated Figma frames stitched together.
4. **Elevation & surface system.** Define how cards/panels differentiate from background WITHOUT colored borders or glass blur — options: subtle solid border in a neutral tone, subtle background-color step (one shade lighter/darker than base), or a very restrained shadow. Pick one primary method and use it consistently.
5. **Radius & border system.** Define 2–3 radius sizes max, used consistently. No inconsistent pill-vs-rounded-square-vs-sharp mixing like the current mock has (nav CTA is a pill, cards are rounded-rect, badges are pill, icon boxes are rounded-square — pick a coherent system).
6. **Base component library.** Build, in isolation (e.g. Storybook or a `/design-system` preview route if the stack doesn't have Storybook set up):
   - Button (primary, secondary, ghost — no default browser/AI-default styling)
   - Card / panel (using the elevation system from step 4, not colored borders)
   - Section wrapper (consistent vertical rhythm, max-width, responsive padding)
   - Badge/tag (for things like "On-Premise," "Arabic OCR," used honestly, not as fake certification badges)
   - Nav bar + nav link + CTA button
   - Icon treatment guideline (document when/how icons get a background treatment vs. plain, so it's not "every icon gets the same tinted box" by default)

**Acceptance criteria:** A tokens file exists and is imported project-wide. A base component library exists and renders correctly in isolation. Zero marketing copy sections are touched yet.

**Agent expansion prompt:** Once color/type direction is chosen, expand this phase with the actual Tailwind config / CSS variable definitions, and cross-check against the JAMS dashboard's existing design tokens (per Zakaria's ongoing dashboard visual overhaul) so the marketing site and the product don't look like two different companies.

---

## Phase 2 — Copy & Information Architecture Rewrite

**Goal:** Every single sentence that ships on this site is real, true, grammatically correct, and specific to Dossera/JAMS. This phase is copy-only — write it in a markdown doc, get sign-off, then hand to layout phases.

**Tasks:**
1. Using the Phase 0 audit *and* the PRD (Section 0.1), rewrite copy for every section. Ground every claim in what's actually true today, per the PRD where applicable:
   - Product: on-premise judicial archive management system, targeting Moroccan courts and law firms. Real architecture per PRD: ingestion pipeline (bulk upload, automatic OCR via Tesseract.js/BullMQ workers, sovereign local storage via MinIO with SSE-C encryption), a retrieval chain that runs semantic vector search (pgvector + ONNX runtime, "search by legal concept not just keyword") alongside Meilisearch keyword search, and a separate resilience/caching layer (L1 in-memory → L2 Redis cluster → L3 database) plus circuit-breaker logic for Postgres/Redis/Meilisearch. Do not compress these into one "3-tier" pipeline — they're different subsystems solving different problems, and copy should make that distinction clear rather than papering over it.
   - Status: reconcile the PRD's "v1.5.0 / Production-Ready" header against the actual current status (pre-first-deployment, ~v1.9.0, targeting Khouribga Court) per Section 0.1 before writing a single status sentence. Once reconciled, "currently deploying at Khouribga Court" remains the strongest, most specific true claim to lead with — more credible than any invented stat.
   - Differentiator vs. generic alternatives: purpose-built for Moroccan judicial workflows and Arabic-script documents (specialized OCR models + native RTL UI, not a bolt-on), plus the physical-archive tracking model (Blocks → Rows → Sections) linking digital records back to original paper files — a feature no generic template competitor has. Say this plainly.
   - Governance: role hierarchy (Admin/Operator/Viewer) and forensic audit trails (permanent, immutable logs of access and modification) are real, documented features per the PRD — these can now be stated confidently rather than treated as unverifiable (see Section 0.1). This meaningfully strengthens the security/compliance sections below.
   - Security: on-premise/air-gapped deployment, zero dependency on external APIs (all AI models run locally via ONNX), data stays inside the institution's walls — all real, keep. Hardware-bound licensing should be described with its actual behavior: cryptographic signature tied to the server's hardware fingerprint, degrading to a safe read-only mode on expiry rather than deleting or locking out data — this specific mechanic is a stronger trust signal than the generic phrase "hardware-bound licensing" alone.
2. Replace the "Client Impact" stat-brag section entirely — reframe as "Where We Are" or "Built With, Not For" — honest early-stage positioning: built in direct collaboration with judicial staff, first deployment in progress, roadmap toward law firms next. This is more compelling to a real institutional buyer than fake enterprise stats anyway, because it signals founder-led, hands-on, accountable software rather than a faceless vendor.
3. Replace the "Compliance Vault" badge-wall (FIPS/ISO-style logos) with an honest "How data stays sovereign" explainer: no external network calls, on-prem hosting, hardware-bound licensing (real, per the license-system work with HMAC-SHA256 + hardware fingerprinting already built), and a clear statement of what compliance work is planned vs. done.
4. Write real, specific CTA copy — "Book a Discovery Call" is fine and can stay; "See how it works" should scroll to a real explainer, not a vague anchor.
5. Full pass for Arabic-language parity — if the site should be bilingual (FR/AR or FR/AR/EN, matching the actual court/law-firm audience in Morocco), scope that here rather than retrofitting RTL later. Flag this as a decision point for Zakaria if not already decided.
6. Produce `docs/landing-copy-final.md` — every section's final approved copy, in order, ready to paste into components.

**Acceptance criteria:** Every sentence on the site traces to something true and specific about Dossera/JAMS today. Zero fabricated stats or certifications remain. Copy doc is approved before Phase 3 starts.

**Agent expansion prompt:** Flag every claim during drafting with a `[VERIFY]` tag if the agent isn't 100% sure it's currently true, and surface the full list of `[VERIFY]` items to Zakaria for a yes/no pass before finalizing.

---

## Phase 3 — Navigation & Hero

**Goal:** Rebuild the nav and hero using the Phase 1 system and Phase 2 copy.

**Tasks:**
1. Nav: fix inconsistent pill/CTA styling, ensure active-state link styling doesn't rely on red-as-only-signal (use weight/underline/color-from-token combined), ensure nav collapses properly on mobile (this needs an actual mobile menu, not just hidden links).
2. Hero: remove the gradient glow blob background. Replace with something more deliberate — options to consider and prototype: a subtle full-bleed pattern evoking archival paper/document grain, an abstract line-art rendering of the actual 3-tier architecture, a real (blurred/abstracted, not literal stock-photo) screenshot of the actual JAMS dashboard as social proof that a real product exists behind the marketing.
3. Headline: keep the "JAMS: The Judicial Archive Management System" structure if it tests well, but make sure the accent-colored word isn't red-as-alert; tie it to the token accent chosen in Phase 1.
4. Subheadline/tagline ("Archive less. Accomplish more.") — verify this lands in French/Arabic/English tone-appropriately if the site is multilingual; otherwise fine to keep in English if that's the confirmed audience language.
5. CTA row: primary CTA "Book a Discovery Call" using system button styles, secondary as a ghost/text button, not a competing filled button (current mock has two heavy CTAs competing for attention).
6. Remove the tiny all-caps eyebrow label styling if it's not pulling weight ("ACTIVE JUDICIAL ARCHIVE MANAGEMENT SYSTEM" reads redundant with the H1 right below it) — either cut it or make it say something the H1 doesn't already say.

**Acceptance criteria:** Hero renders with zero banned patterns from Section 1, uses only Phase 1 tokens/components, and uses only Phase 2 approved copy.

**Agent expansion prompt:** Prototype at least two real hero background treatments (not glow blobs) and present both before picking one.

---

## Phase 4 — Architecture Explainer Section (Ingestion, Retrieval, and Resilience)

**Goal:** This is the single most genuinely interesting/differentiated piece of content on the whole page, and it's currently both the weakest-presented *and* factually incorrect (see Section 0.1 — the current "3-Tier Cache" section conflates the caching layer with the search stack). Rebuild it around the real architecture from the PRD.

**Tasks:**
1. Split this into (at minimum) two clearly distinct explainers rather than one three-card pipeline:
   - **Ingestion & Retrieval**: a document enters via bulk upload → OCR extraction happens in the background (Tesseract.js via BullMQ workers) → it becomes searchable two ways at once: semantic vector search (pgvector + ONNX runtime, "find by legal concept") and keyword search (Meilisearch, fast full-text/metadata). Show these as parallel paths, not sequential steps — they solve different problems and both run on every document.
   - **Resilience & Performance**: the actual caching/scaling layer — L1 in-memory → L2 Redis cluster → L3 database — plus circuit-breaker logic (closed/open/half-open states) protecting Postgres, Redis, and Meilisearch from cascading failures, tuned for 50+ concurrent judicial clerks on a LAN.
2. Use real logos for Redis/Meilisearch/PostgreSQL (already correctly used lower on the page) consistently here too, rather than generic icon-in-box placeholders. Consider adding pgvector/ONNX as named technical credibility signals if Zakaria confirms he's comfortable naming them publicly (see Section 0.1 confidentiality note).
3. Make sure copy at each stage is a real, specific sentence in plain language a court administrator would understand (e.g., what "semantic search" means for a clerk trying to find a ruling by concept rather than exact wording), not the current garbled filler and not raw PRD engineering language either — translate, don't copy-paste.
4. Consider making the resilience diagram interactive (hover a tier/state, see it highlighted with expanded detail) as a tasteful, purposeful use of interaction — not decoration for its own sake.

**Acceptance criteria:** Section communicates the real, correct architecture (ingestion/retrieval as parallel systems, resilience/caching as a separate concern) clearly to a non-technical court administrator, using diagrams rather than a generic card row, and zero banned patterns.

**Agent expansion prompt:** Build both diagrams as actual SVG/diagram components, and cross-check against the PRD's Section 4 (Technical Architecture) line by line before finalizing — this section is the one most likely to still contain factual drift if rushed.

---

## Phase 5 — Core Capabilities Section

**Goal:** Rebuild "Advanced OCR & Indexing / Vector Search Technology / Arabic RTL Support" without it being the same three-card grid as every other section.

**Tasks:**
1. Break the uniform 3-column card grid. Consider: one larger featured capability (probably Arabic OCR, since it's the biggest real differentiator vs. generic templates) shown with more detail/visual, and the others presented more compactly alongside it — asymmetric, not equal boxes.
2. Add **Physical Archive Tracking** as a featured capability — currently missing from this section entirely despite being a real, built, distinctive feature per the PRD (3-level physical model: Blocks → Rows → Sections, linking digital records back to the original paper file's physical location). This is a genuinely rare capability competitors don't have and deserves real estate here, not an omission.
3. Where possible, show rather than tell: a small real (or realistic) example of Arabic OCR extraction, a semantic-vs-keyword-search comparison, or a simple Blocks→Rows→Sections visual for physical tracking, rather than an icon and a sentence.
4. Rewrite all copy per Phase 2 — the current "Semantic understanding for contest-aware retrieval, going beyond keyword matching" line is close to coherent but garbled ("contest-aware" is very likely a corruption of "context-aware") — fix precisely, and align the description with the real pgvector/ONNX-based semantic search described in the PRD.

**Acceptance criteria:** Section has visual hierarchy/variation, not a uniform grid; copy is precise and correct.

**Agent expansion prompt:** If real OCR output samples exist from JAMS development/testing, ask Zakaria whether an actual (anonymized) before/after scan-to-text example can be used here — real product evidence beats any illustration.

---

## Phase 6 — Security & Sovereignty Section

**Goal:** Rebuild "Hardware-Bound Security: Air-Gapped & Sovereign" without the server-rack-firewall-padlock cliché render.

**Tasks:**
1. Remove the generic 3D server/brick-wall/padlock illustration — it's the most overused stock security visual in the industry and actively undercuts credibility with a technical audience.
2. Replace with something more specific to how JAMS actually achieves this: a simple, honest diagram of "institution's network boundary → JAMS on-prem server (all AI models running locally via ONNX) → no external calls" — a real network-boundary diagram communicates "air-gapped" far better than a padlock icon.
3. Rewrite the security bullet claims — dedupe (FIPS-compliant encryption appears twice in the current mock, that's a real bug, not just a design issue) and verify each is actually true. Per the PRD, the following can now be stated confidently and specifically rather than generically:
   - **Hardware-bound licensing with graceful degradation**: cryptographic signature tied to the specific server's hardware fingerprint; on license expiry the system drops to a safe read-only mode rather than deleting data or hard-locking the institution out — lead with this specific mechanic, it's a much stronger trust signal than the generic phrase alone.
   - **Forensic audit trails**: permanent, immutable logs of every document access and system modification — real, documented, state it plainly.
   - **Role-based access control**: granular Admin/Operator/Viewer permission hierarchy — real, state plainly.
   - Drop any remaining claim (e.g. specific "FIPS-compliant encryption" certification language) that isn't independently verified true — encryption itself (e.g. SSE-C on MinIO storage, per the PRD) can be described accurately without implying a formal FIPS certification unless one is actually held.

**Acceptance criteria:** No stock security iconography; no duplicated claims; every remaining claim verified true against the PRD and current reality.

**Agent expansion prompt:** Cross-check this section's claims directly against PRD Section 4.2 (Security Model) before finalizing wording, and flag to Zakaria any claim not yet fully implemented so it doesn't ship as a promise.

---

## Phase 7 — Technical Infrastructure Section

**Goal:** Keep the honest, factual "built on Redis / PostgreSQL / Meilisearch" section — this is one of the more credible parts of the current page precisely because it names real, verifiable technology — but clean up presentation.

**Tasks:**
1. Keep real logos, ensure consistent sizing/alignment (currently Redis card is visually heavier than PostgreSQL/Meilisearch cards — normalize).
2. Fix copy: current PostgreSQL/Meilisearch descriptions are coherent, keep the spirit, tighten wording for consistency of voice across all three.
3. Consider adding one more real, honest technical credibility signal here if true and available (e.g. "self-hosted, Windows-service based deployment for court environments with strict IT constraints" — ties directly to the real Windows-native deployment architecture decision already made).

**Acceptance criteria:** Three infra cards are visually consistent, copy is accurate and consistent in voice, and (if agreed) one additional real technical detail is added.

**Agent expansion prompt:** Ask whether to also credit the license system (HMAC-SHA256 + hardware fingerprinting) here as a fourth "built for institutional deployment" infra fact — it's a real, differentiating engineering detail most competitors won't have.

---

## Phase 8 — Proof / Impact Section (honest reframe)

**Goal:** Replace fabricated stats with an honest, still-compelling "where we are" narrative, per Phase 2 decisions.

**Tasks:**
1. Remove "10M+ Documents Processed," "Sub-100ms Search Latency," "0 Data Leaks" unless/until real numbers exist. Replace with real, verifiable engineering facts from the PRD that function just as well (arguably better) as trust signals:
   - Tuned for **50+ concurrent judicial clerks** on LAN traffic with a dedicated connection pool.
   - **90+ automated verification tests** run before every client handover to confirm system integrity.
   - **14-day automated backup cycle** covering both relational data (PostgreSQL) and document binaries (MinIO).
   - Circuit-breaker resilience logic protecting against cascading failures across Postgres/Redis/Meilisearch.
   These are specific and checkable — a technical evaluator can ask about any of them and get a real answer, unlike "10M+ documents processed."
2. Reconcile the "Production-Ready" language from the PRD with actual current status (Section 0.1) before writing this section — if not yet in production, frame as "engineered and tested for production scale" rather than implying an established deployed track record.
3. Also fold in a simple, honest status/timeline strip: "Built 2025–2026 → In deployment at Tribunal de Khouribga → Expanding to law firm pilots next" — specific and checkable, and more persuasive to an institutional buyer than unverifiable round numbers.
4. Visually, this section should feel confident and calm — factual engineering credibility plus honest status, not a disclaimer.

**Acceptance criteria:** Zero unverifiable stats remain; section still functions as a credibility/trust builder, just honestly.

**Agent expansion prompt:** Confirm with Zakaria the exact current/near-term milestones to state (deployment date target, law firm pilot timing) before finalizing this section's copy.

---

## Phase 9 — Compliance / Trust Section (reframe with real, PRD-confirmed claims)

**Goal:** Replace the badge-wall (FIPS/ISO/generic shield logos) with an honest "how your data stays sovereign" explainer — now stronger than a pure reframe, since the PRD confirms forensic audit trails and RBAC are real, shipped features, not aspirational claims.

**Tasks:**
1. Remove any certification badge/logo not actually held. Faking compliance badges on a page targeting courts/legal institutions is a genuine legal and reputational risk (misrepresentation), not just a style note — this must be fixed regardless of design direction.
2. Rebuild as a clear explanation grounded in the PRD: what data leaves the premises (nothing — all AI models run locally, zero external API dependency), how licensing works (hardware-bound, degrades to read-only on expiry rather than losing data), what governance exists today (Admin/Operator/Viewer role hierarchy, permanent immutable audit trails of every access and modification), and what's on the roadmap for formal certification if pursued (state as "pursuing," never as already held).
3. Keep the visual restrained and document-like rather than badge/shield-like — ties back to the "archive/legal document" visual language from Phase 1.

**Acceptance criteria:** No unearned certification/compliance badges anywhere on the site.

**Agent expansion prompt:** If Zakaria confirms any certification is genuinely in progress or held, get the exact correct name/status before writing copy — never approximate a compliance claim.

---

## Phase 10 — Services & Deployment Section

**Goal:** Rebuild "On-Premise Installation / Custom OCR Training for Judicial Script / 24/7 Forensic Support," fixing garbled copy and overclaiming.

**Tasks:**
1. Fix garbled copy entirely (current text is barely readable, see Phase 0 audit).
2. Reconsider "24/7 Forensic Support" — verify this is a real current offering for a company this early-stage (one technical co-founder handling all technical work). If 24/7 support isn't realistically deliverable yet, rename/reframe honestly (e.g. "Direct support from the team that built it" — which, for an early institutional buyer, is often more reassuring than an anonymous 24/7 hotline claim they can't verify anyway).
3. "Custom OCR Training for Judicial Script" — keep if true (this is a strong, specific, credible claim tied to real Arabic OCR work), just rewrite clearly.

**Acceptance criteria:** All three service claims are real and deliverable; copy is coherent.

**Agent expansion prompt:** Confirm actual support model (who answers a support request today, what SLA if any) before finalizing this section's claims.

---

## Phase 10.5 — "What's Next" Roadmap Section (new, PRD-sourced)

**Goal:** Add a small, honest roadmap section using the real future roadmap disclosed in the PRD. This wasn't in the original mock but is worth adding — it signals active development and a real product vision without overclaiming current-state, and gives prospective institutional buyers a sense of long-term partnership rather than a one-off sale.

**Tasks:**
1. Add a compact section (short strip, not a full heavy section — this should feel like a confident glimpse forward, not a pitch deck slide) covering:
   - **Next**: full Case Management integration — linking documents to judges, hearings, and involved parties.
   - **Later**: legal reminder push notifications (VAPID-based service workers).
2. Frame explicitly as roadmap/future, never implying either is available today.
3. Keep this section visually restrained — a simple "Now / Next / Later" strip fits the institutional tone better than icon cards.

**Acceptance criteria:** Roadmap items are clearly marked as future, not current, and match the PRD's actual Section 7 (Future Roadmap) wording in substance (not verbatim).

**Agent expansion prompt:** Confirm with Zakaria whether either roadmap item has a real target date before publishing — a dated roadmap is a stronger commitment signal than an undated one, but only publish a date that's actually intended.

---

## Phase 11 — Contact / Inquiry Section

**Goal:** Rebuild the contact form to look institutional and function correctly.

**Tasks:**
1. Fix the current form's inconsistent input border styling (one field has a colored focus/error-looking border for no reason, others don't — clean up default states).
2. Wire the form to an actual working submission path (email service, form backend, or simple serverless function) — confirm current form isn't just a static mockup with no backend.
3. Add basic validation (required fields, email format) and a clear success/error state.
4. Reconsider heading — "Inquiry & Strategic Partnership" is fine; "Request Secure Site Audit" as the submit button copy is oddly specific/jargon-y for a general contact form; consider "Send Inquiry" or "Request a Discovery Call" to match the hero CTA language for consistency.

**Acceptance criteria:** Form is visually consistent with the design system, actually submits somewhere real, and validates input.

**Agent expansion prompt:** Determine and wire the actual backend/email destination for form submissions before marking this phase complete — a non-functional contact form on a sales page is a hard blocker, not a nice-to-have.

---

## Phase 12 — Footer & Global Chrome

**Goal:** Clean up footer inconsistencies.

**Tasks:**
1. Fix "Privaay Policy" typo (visible in current mock footer).
2. Fix copyright year inconsistency (mock shows "© 2032" on one page and "© 2033" on the other — should be the actual current year, dynamically generated, not hardcoded).
3. Verify/fix contact info placeholder ("Contact 123 504", garbled email "cemcrunn@dossera.com") — replace with real current contact details.
4. Ensure footer nav links (Site Map, Legal Disclosures, Privacy Policy, Terms of Service) either go to real pages or are removed until those pages exist — dead/fake footer links undercut credibility on an institutional sales page.
5. Social icons: only include real, currently active social accounts.

**Acceptance criteria:** No typos, no placeholder contact info, no dead links, dynamic copyright year.

**Agent expansion prompt:** Confirm which footer pages (privacy policy, terms) actually need to exist for this launch vs. can be deferred, and either build minimal real versions or remove the links.

---

## Phase 13 — Responsive & Mobile Pass

**Goal:** Full breakpoint audit, since courts/law-firm decision-makers may well view this on a tablet or phone first.

**Tasks:**
1. Audit every section at mobile (375–428px), tablet (768–1024px), and desktop (1280px+) widths.
2. Fix nav collapse behavior (real hamburger menu, not just hidden links with no way to access them on mobile).
3. Verify the architecture diagram (Phase 4) and security diagram (Phase 6) degrade sensibly on mobile — these are the two most likely to break since they're the most custom/visual sections.
4. Verify Arabic RTL rendering is tested at all breakpoints if the multilingual decision from Phase 2 requires it.

**Acceptance criteria:** No horizontal scroll, no broken layouts, no inaccessible nav at any standard breakpoint, in both LTR and (if applicable) RTL.

**Agent expansion prompt:** Build this pass against the actual final breakpoints used elsewhere in the JAMS dashboard for consistency, rather than inventing new ones.

---

## Phase 14 — Motion & Micro-interaction Pass

**Goal:** Add restrained, purposeful motion only — this is a judicial/institutional product, not a consumer app; motion should feel precise, not playful.

**Tasks:**
1. Scroll-triggered reveal for sections: subtle, fast, no bouncy easing.
2. Hover states on cards/buttons: subtle elevation or color shift using system tokens, no scale-jump or glow effects.
3. The architecture diagram (Phase 4) is the one place a more elaborate interaction (hover-to-highlight-tier) is justified because it aids comprehension — everywhere else, default to minimal.
4. Respect `prefers-reduced-motion`.

**Acceptance criteria:** Motion is present but restrained everywhere except the one justified interactive diagram; reduced-motion users get a static experience.

**Agent expansion prompt:** Prototype the diagram interaction separately and get sign-off before propagating any animation pattern site-wide.

---

## Phase 15 — Performance Pass

**Goal:** Fast load, especially relevant since some court/institutional networks may have poor bandwidth.

**Tasks:**
1. Audit and optimize all images (real product screenshots, logos) — proper formats (WebP/AVIF with fallback), correct sizing, lazy-loading below the fold.
2. Remove any unused CSS/JS from the redesign process.
3. Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms on a throttled mid-tier connection profile.
4. Run Lighthouse, fix flagged issues.

**Acceptance criteria:** Lighthouse performance score ≥ 90 on both mobile and desktop profiles.

**Agent expansion prompt:** Re-check performance after Phase 14's motion pass specifically, since animation is the most common regression source after a performance pass.

---

## Phase 16 — Accessibility Pass

**Goal:** WCAG AA minimum — genuinely important for a product selling into government-adjacent institutions.

**Tasks:**
1. Color contrast check on every text/background combination from the Phase 1 token system — verify before, not after, shipping (this also forces the "no red-as-only-signal" rule to actually hold up).
2. Full keyboard navigation pass (nav, form, any interactive diagram).
3. Proper semantic HTML/ARIA on the architecture and security diagrams (Phase 4/6) since these are the most likely to be built as divs-with-styling rather than accessible markup.
4. Alt text on every real image/logo.
5. Form labels/error states properly associated for screen readers.

**Acceptance criteria:** Passes automated axe/Lighthouse accessibility audit with zero critical/serious issues, plus a manual keyboard-only pass.

**Agent expansion prompt:** Pay particular attention to the RTL Arabic experience during this pass if multilingual — accessibility tooling often has weaker RTL test coverage, so manual verification matters more here.

---

## Phase 17 — SEO & Metadata Pass

**Goal:** Real, correct metadata — this site needs to be findable by Moroccan courts/law firms and legal-tech searchers.

**Tasks:**
1. Real title/meta description per page, in the actual target language(s), targeting realistic search intent (e.g. "gestion archive judiciaire Maroc," "logiciel archivage tribunal Maroc").
2. Real Open Graph / social preview image (not a placeholder) — likely a clean shot of the actual hero.
3. Structured data (Organization/SoftwareApplication schema) with only true fields filled in.
4. `sitemap.xml`, `robots.txt`, favicon set.
5. If multilingual, correct `hreflang` setup.

**Acceptance criteria:** All metadata reflects real, current, correct information; social preview renders correctly when the URL is shared.

**Agent expansion prompt:** Research actual French/Arabic search terms a Moroccan court IT administrator or law firm partner would realistically use, rather than guessing keywords.

---

## Phase 18 — QA, Cross-Browser & Launch Checklist

**Goal:** Final verification before this replaces the live site.

**Tasks:**
1. Cross-browser check: Chrome, Firefox, Safari, Edge, plus at least one real mobile Safari and mobile Chrome pass.
2. Full click-through of every link, every CTA, the contact form (real submission test), every anchor scroll.
3. Re-run the Phase 0 audit against the finished site — confirm every flagged garbled sentence, every fabricated stat, every banned visual pattern is actually gone. This is the real acceptance gate for the whole project, not a formality.
4. Confirm dynamic copyright year, correct contact info, no dead links (re-check Phase 12 items specifically).
5. Get final sign-off from Zakaria with a side-by-side comparison against the original mocks so the improvement is visible and deliberate, not just "different."

**Acceptance criteria:** Every item in the Phase 0 audit doc is confirmed resolved; site works correctly across target browsers/devices; sign-off given.

**Agent expansion prompt:** Produce a final before/after comparison doc (screenshots side by side) as part of sign-off — this is genuinely useful for Zakaria to sanity-check the work and also becomes a good portfolio/case-study asset later.

---

## Phase Log

*(Agent: append a short entry here each time a phase is completed — date, phase number, one-line summary of what shipped, and any deviations from this plan with reasoning.)*

- [ ] Phase 0
- [ ] Phase 1
- [ ] Phase 2
- [ ] Phase 3
- [ ] Phase 4
- [ ] Phase 5
- [ ] Phase 6
- [ ] Phase 7
- [ ] Phase 8
- [ ] Phase 9
- [ ] Phase 10
- [ ] Phase 10.5
- [ ] Phase 11
- [ ] Phase 12
- [ ] Phase 13
- [ ] Phase 14
- [ ] Phase 15
- [ ] Phase 16
- [ ] Phase 17
- [ ] Phase 18