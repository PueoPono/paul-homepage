# The Masculine Heart — 21-Day Mini Series

## Intent
Create the first real course/portal experience beyond the public Paul homepage.

This course combines the existing source materials from:
- https://heartunlock.paulcropper.com/ (7-day menu)
- https://ironjohn.paulcropper.com/ (8-day menu)
- https://intentions.paulcropper.com/ (all days in menu)

The result should become:
- a structured 21-day course
- daily drip unlock based on prior completion
- integrative prompts/questions drawn from PDFs and site content
- optional daily text reminders
- associated email series support
- low-cost first working portal with room to grow into future tools/courses

---

## High-Level Product Draft

### Working title
**The Masculine Heart 21-Day Mini Series**

### Core experience
A guided 21-day progression integrating:
- video lesson of the day
- reflection/integration prompt(s)
- completion action
- 24-hour unlock delay for the next lesson after completion
- optional SMS/text reminder and email follow-up

### Desired effect
The course should feel:
- grounded
- initiatory
- reflective
- simple enough to follow on phone
- intimate but not cluttered
- structured enough to support momentum

---

## Recommended Low-Cost Architecture

### Phase 1: draft + working MVP
- public website remains separate (`paul-homepage`)
- new course portal built separately
- recommended stack:
  - frontend/app: Next.js
  - hosting: Vercel
  - auth + DB: Supabase
  - email: existing/provider TBD
  - text reminders: Twilio or other low-volume SMS provider
  - video hosting: start with existing embeds or lower-cost host later

### Why this route
- low infra cost to start
- clean upgrade path for future client tools
- supports login, progress tracking, drip unlocks
- phone-friendly by default
- can later become app-backed

---

## Course Structure Draft

### 3 arcs x 7 days

#### Arc 1 — Opening the Heart
Potentially drawing primarily from `heartunlock`
- Day 1: Orientation / why the heart matters
- Day 2: honesty with the inner world
- Day 3: the heart and subconscious
- Day 4: noticing contraction / protection
- Day 5: early practices of opening
- Day 6: truth, tenderness, and strength
- Day 7: first integration checkpoint

#### Arc 2 — Masculinity, depth, and initiation
Potentially drawing primarily from `ironjohn`
- Day 8: mature masculinity
- Day 9: archetype and depth psychology
- Day 10: boy psychology vs manhood
- Day 11: power and responsibility
- Day 12: embodiment and grounded strength
- Day 13: integrity in relationship
- Day 14: second integration checkpoint

#### Arc 3 — Intention, vitality, and direction
Potentially drawing primarily from `intentions`
- Day 15: conscious intention
- Day 16: vision and alignment
- Day 17: energy management
- Day 18: habits and integrity
- Day 19: service and contribution
- Day 20: wholeness in daily life
- Day 21: completion / next path

---

## Per-Day Lesson Template
Each lesson page should contain:
- title
- short framing paragraph
- embedded video
- 1–3 reflection prompts
- optional downloadable PDF/journal prompt
- mark-complete action
- next-unlock timing message

### Example page sections
1. Lesson title
2. Short orientation
3. Video
4. Reflection prompts
5. Integration practice
6. Completion button
7. “Next lesson unlocks in 24 hours” notice

---

## Drip Logic
Per user:
- lesson N unlocked
- user completes lesson N
- store `completed_at`
- set lesson N+1 `unlock_at = completed_at + 24 hours`

### Required data
- users
- courses
- lessons
- enrollments
- lesson_progress
- reminder_preferences

---

## Reminder System Draft

### SMS / text reminders (optional)
User can opt in to:
- one daily reminder if the next lesson is unlocked
- one nudge if unlocked lesson has not been completed
- optionally reflection prompt texts based on PDF/site questions

### Email series
Email should support:
- welcome / access email
- day unlocked email
- reminder if unfinished
- completion email
- invitation to next offering

### Future enhancement
- use lesson-specific prompts in reminder messages
- support timezone-aware delivery

---

## Content Assembly To-Do
Need to gather and organize:

### Videos
- all 7-day `heartunlock` videos
- all 8-day `ironjohn` videos
- all `intentions` day videos needed to complete 21 days
- canonical order for the combined course
- source URLs or downloadable masters

### PDFs / prompts
- all associated PDFs
- all reflection questions now in PDFs
- all prompts currently on websites
- email series copy for these courses

### Metadata to create
For each lesson:
- title
- source course
- source URL
- summary
- reflection prompts
- completion text
- reminder text
- email subject/body draft

---

## Website / Product Tasks

### In `paul-homepage`
- add resource card linking to the future course portal
- wording should indicate: coming soon / first course / 21-day series

### New portal project
Create separate project for course/app draft.
Suggested working project name:
- `masculine-heart-portal`

Portal MVP pages:
- landing page
- login/signup
- dashboard
- lesson page
- completion state
- locked lesson state
- settings / reminder opt-in

---

## Access / Permissions Checklist
To make implementation easy with minimal back-and-forth, provide these in order:

### For drafting / content assembly
1. access to all three course sites
2. list of all day/video URLs if easier
3. PDFs and prompt documents
4. existing email sequence copy
5. note on preferred canonical order if already known

### For portal build MVP
1. Vercel access or deploy permission
2. Supabase project access (or permission for me to specify exact setup)
3. domain/subdomain target for portal (example: `app.paulcropper.com` later)
4. SMS provider decision (Twilio or similar)
5. video host decision (temporary existing embeds vs hosted migration)

### For launch-ready version
1. payment provider decision (likely Stripe)
2. brand/domain decision for portal
3. privacy / terms pages if paid/private access is involved
4. reminder sending credentials/workflow

---

## Lowest-Cost Build Strategy

### Cheapest useful draft
- use existing video URLs first
- no payment wall at first
- passwordless or simple auth
- text reminders optional in phase 2
- email automation after content structure is finalized

### Cheapest working private version
- Vercel + Supabase
- use existing hosted videos initially
- drip in database only
- email first, SMS second

This keeps early cost low while making the system real.

---

## Immediate Next Steps
1. Add a resources-page link to the future mini-series
2. Gather the source videos and PDF prompts into one working folder/dataset
3. Create a lesson inventory sheet for all 21 days
4. Draft portal architecture and wireframes
5. Build a separate MVP portal project
6. Add drip unlock logic
7. Layer in email sequence
8. Layer in optional SMS reminders

---

## Open Questions
- What exact 21-day order should the combined material follow?
- Which reflection prompts are essential vs optional?
- Should users be able to journal inside the portal, or only read prompts?
- Is this first version free, paid, or bundled with coaching?
- Should text reminders be one-way only at first?
- Are PDFs downloadable, in-page, or both?

---

## Recommendation
Build this as a separate portal/app project, not inside the static homepage repo.

Keep `paul-homepage` as the public site.
Use the Resources page to funnel people into the mini-series once the draft portal exists.
