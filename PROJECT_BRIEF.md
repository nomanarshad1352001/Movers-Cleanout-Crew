# PROJECT BRIEF — "Movers & Cleanout Crew" Service Coordination Platform

---

## 1. Project Title

**"Movers & Cleanout Crew — White-Glove Service Coordination Platform"**
*(Internal codename: **MC·ORCHESTRA** — because the platform doesn't lift furniture, it orchestrates the people who do.)*

A luxury-grade, five-page, fully animated brand website + customer quote funnel + provider recruitment system for a service-coordination company that matches customers with vetted moving, cleanout, junk-removal and cleaning crews.

---

## 2. What This Platform Actually Does

### For End Customers
| Capability | Delivered |
|---|---|
| Discover services | 6 service disciplines with photo galleries, pricing anchors and bullet inclusions (36 curated photos — 6 per service) |
| Build trust | Dual-direction animated testimonial rails (8 client stories), live stat counters (12,400+ projects, 4.9 rating), white-glove guarantee panel |
| Request service | Guided 3-step quote wizard (Service → Details → Contact) with validation, simulated dispatch, auto-generated ticket number (e.g. `MC-4210`) and a hand-drawn Lottie success animation with Mo.js confetti |
| Reach out fast | Sticky phone CTA, tel:/mailto: links, office hours, HQ address, "call back" booking card |
| Explore coverage | Animated cities rail (12 highlighted metros, "38 cities" claim) |

### For the Business
| Capability | Delivered |
|---|---|
| Provider recruitment | Dedicated "Join the Network" band with crew-apply mailto funnel and roster stats (480+ crews) |
| Sales funnel | Every CTA on every page funnels into one high-converting quote form |
| Brand authority | Luxury editorial design system (champagne gold / deep pine / ivory), an Awwwards-style first impression that justifies premium pricing |
| Operations narrative | Process page explains the coordination model (Tell us → We curate → Showtime) so customers understand they pay for orchestration, not just labor |

### Data Architecture (No Database — By Design)
- All content lives in **one typed content layer** (`src/data/content.ts`): services, galleries, steps, stats, testimonials, FAQs, cities, contact info.
- This dummy-data layer maps **1:1 to a future backend** — swap the arrays for API calls (REST, Supabase, Firebase, Node + PostgreSQL) without touching a single component. The site is production-shaped, database-optional.

---

## 3. Pages

1. **Home** — Full-bleed hero *video* (movers at work, champagne veil that lifts via Theatre.js), service previews, photo rails, testimonials, 3D CTA
2. **Services** — Interactive index (cursor-following photo preview), six detail blocks with 6-photo bento galleries, price/time chips, FAQ accordion
3. **Process** — Photo-led 3 steps + scroll-driven gold progress line + guarantee + call-back band
4. **About** — Origin story collage, embedded video band with founder quote, values grid, particle stats field, provider recruitment
5. **Contact** — Quote wizard, contact cards, cities marquee, photo rails

Connected by a **5-slat pine curtain page transition** (hash-routed single-file SPA).

---

## 4. Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | **React 19 + TypeScript** | Component architecture, strict typing |
| Build | **Vite 7 + vite-plugin-singlefile** | Compiles to one portable `index.html` (drop on any host/CDN — no server, no database) |
| Styling | **Tailwind CSS 4** | Utility design system, custom gold/pine/ivory theme tokens |
| Typography | **Fraunces + Manrope** (Google Fonts) | Editorial serif display + modern grotesque body |
| Icons | **Lucide React** | Consistent line-icon system |

### The 8-Engine Animation Stack (all wired into production)

| Engine | Used For |
|---|---|
| **Three.js (r18x)** | WebGL floating furniture constellations — PBR materials, PMREM environment lighting, parallax, elastic entrance |
| **Theatre.js** | Keyframed hero choreography (video un-zoom + veil lift) driven by a declarative animation project |
| **Anime.js 3** | Word-slice headline reveals, preloader counter/curtain timeline, stat counters, accordion physics, 3D mesh entrances |
| **Velocity.js 2** | Dual infinite testimonial rails gliding in opposite directions with hover pause/resume |
| **PixiJS 7** | GPU particle constellation behind the stats band (60 nodes + proximity links) |
| **Popmotion 11** | Magnetic buttons, custom cursor springs, fleeing preview cards |
| **Mo.js (@mojs/core)** | Confetti bursts on form interactions |
| **Lottie-web (light)** | Hand-authored stroke-trim success-check animation |
| **Lenis** | Butter-smooth scroll (bonus engine) |

### Media
- **Video**: Pexels CDN (hero film + about band)
- **Photography**: 40+ curated Pexels images (Pinterest/Shutterstock/iStock-grade curation standard), lazy-loaded

---

## 5. Signature Features

**Experience**
- Curtain preloader with live percentage → 3D/video hero reveal
- Curtain page transitions with brand mark (every navigation feels like a film cut)
- Custom gold cursor (dot + spring ring) with magnetic hover states
- Film-grain overlay, smooth-scroll, scroll-progress accent line
- Fully responsive incl. animated mobile menu; zero errors on desktop & mobile

**Conversion**
- 3-step quote wizard — validation, disabled states, ticket generation, celebration sequence
- Single-CTA discipline: every button leads to the quote form or phone
- Social proof at three depths: stats band → testimonial rails → inline rating chips
- Price anchors ("From $390") reduce quote anxiety

**Engineering Quality**
- Typed content model (Service/Testimonial/Step interfaces) — API-ready
- IntersectionObserver-paused WebGL (renders only when visible)
- Triple-hardened reveal system (IO + scroll listener + init sweep)
- Graceful degradation: cursor hidden on touch, static fallbacks for Theatre
- One-command build → single HTML file deployable anywhere

---

## 6. Who Buys This

| Buyer | Why It Fits |
|---|---|
| **Service coordination / dispatch companies** (the original brief: Movers & Cleanout Crew Inc.) | Exact business model — quote funnel + crew network + trust content |
| **Independent moving & junk-removal companies** wanting a premium rebrand | Swap name/photos/content; the "coordination" copy still works |
| **Lead-generation businesses** in home services | Built as a conversion machine: one funnel, price anchors, urgency framing |
| **Real-estate & property-management firms** | Estate cleanouts, turnover services, realtor partnerships speak their language |
| **Agencies buying white-label** | One typed content file reskins the entire platform in an hour — resell at 3–5x |
| **UI engineers / animation learners** | A production-grade reference integrating 8 animation libraries in one React app |

**Suggested offer tiers for resale:** Basic (site as-is) · Pro (content swap + city pages) · Premium (real backend wiring: Supabase form storage, CRM handoff, admin panel).

---

## 7. Honestly Scoped Limitations (transparency for the client)

- Form submission is **simulated** (no email/CRM yet) — hooks are ready for SendGrid/Make/Supabase
- Testimonials/stats/galleries are **curated dummy content**, awaiting the client's real asset library
- Single-language (EN); i18n not yet wired
