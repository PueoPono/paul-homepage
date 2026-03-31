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


---

## Merged 21-Day Curriculum Draft
This version includes intro videos folded into the daily experience where useful, so some days may contain two videos.

### Arc 1 — Heart Unlock (Days 1–7)
**Theme:** opening emotional honesty and restoring feeling capacity

#### Day 1 — Welcome to the Heart
- source videos:
  - `heartunlock/index` intro video
  - `heartunlock/day1`
- focus:
  - stepping down to the heart
  - identifying emotional pain
- prompts:
  - what pain am I carrying?
  - where do I already know I am defended?

#### Day 2 — Sadness and scars
- source:
  - `heartunlock/day2`
- focus:
  - sadness
  - scars from emotional pain
- prompts:
  - what sadness have I covered over?
  - what still wants to be felt?

#### Day 3 — Anger and defenses
- source:
  - `heartunlock/day3`
- focus:
  - anger
  - emotional sovereignty
- prompts:
  - how do I lose emotional sovereignty?
  - what defense patterns protect me?

#### Day 4 — Numbing and disconnection
- source:
  - `heartunlock/day4`
- focus:
  - numbing
  - stifled feeling, stifled happiness
- prompts:
  - where am I numb?
  - what does that numbness protect?

#### Day 5 — Shame and not-enoughness
- source:
  - `heartunlock/day5`
- focus:
  - shame
  - awareness as medicine
- prompts:
  - where does “I am not enough” still operate?
  - what changes when I simply see it clearly?

#### Day 6 — Regret and consequence
- source:
  - `heartunlock/day6`
- focus:
  - regret
  - consequences of unacknowledged pain
- prompts:
  - what has pain cost me?
  - what becomes possible if I acknowledge it now?

#### Day 7 — Choosing to feel
- source:
  - `heartunlock/day7`
- focus:
  - commitment to feel
  - integration checkpoint
- prompts:
  - will I choose to feel more fully?
  - what support helps me stay open?

### Arc 2 — Language of the Heart / Iron John (Days 8–14)
**Theme:** archetype, symbol, imagination, masculinity, identity

#### Day 8 — Entering the story
- source videos:
  - `ironjohn/index` intro video (`467500375`)
  - `ironjohn/day1` (`467494269`)
- focus:
  - stories and symbols as language of the heart
  - beginning Iron John
- prompts:
  - what does the story stir in me?
  - what stands out immediately?

#### Day 9 — The cage and the false self
- source:
  - `ironjohn/day2` (`468344269`)
- focus:
  - beliefs and conditioning
  - the cage built around authenticity
- prompts:
  - how was I told I should be?
  - what part of me was lost?

#### Day 10 — Non-judgement and inner gold
- source:
  - `ironjohn/day3` (`469815966`)
- focus:
  - non-judgement
  - finding gold inside mistakes
- prompts:
  - where do I still judge myself?
  - what gold may be hidden there?

#### Day 11 — Breath, change, and imprinting
- source:
  - `ironjohn/day4` (`469578165`)
- focus:
  - box breathing
  - shifting the heart-state
- prompts:
  - what word do I want to breathe into my system?
  - what state do I want to train?

#### Day 12 — Tending the inner garden
- source:
  - `ironjohn/day5` (`471745654`)
- focus:
  - heart as spring, fire, garden
  - conscious tending
- prompts:
  - what am I growing in my inner garden?
  - what do I want to plant now?

#### Day 13 — The Earth and the Masculine Heart
- source:
  - `ironjohn/day6` (`471753829`)
- focus:
  - grounding
  - masculine heart and father earth imagery
- prompts:
  - what grounds me deeply?
  - how do I relate to strength and rootedness?

#### Day 14 — Identity, shadow, and the rest of the story
- source videos:
  - `ironjohn/day7` (`475973182`)
  - `ironjohn/day8` (`475973182`)
- focus:
  - identity attachments
  - shadow and gold
  - completing the story
- prompts:
  - what do I need to let go of?
  - what part of my identity contains both gold and shadow?

### Arc 3 — Intentions Worth Planting (Days 15–21)
**Theme:** planting deeper qualities into the heart and subconscious

#### Day 15 — Introduction + Be Creative
- source videos:
  - `intentions/index` (`483878304`)
  - `intentions/intention1` (`491451277`)
- focus:
  - intention as heart/subconscious training
  - creativity and imagination
- prompts:
  - what do I want to create?
  - what happens when I imagine something deeply good?

#### Day 16 — Be Kind
- source:
  - `intentions/intention2` (`483727694`)
- focus:
  - kindness as courage
- prompts:
  - what does kindness mean to me?
  - how can I breathe kindness into my day?

#### Day 17 — Be Beauty
- source:
  - `intentions/intention3` (`483879872`)
- focus:
  - truth, beauty, alignment
- prompts:
  - what beauty feels true to me?
  - where do I want deeper alignment?

#### Day 18 — Be Love
- source:
  - `intentions/intention4` (`488237870`)
- focus:
  - love as deep orientation
- prompts:
  - what does it mean for me to be love?
  - how does this become practical?

#### Day 19 — Be Abundance
- source:
  - `intentions/intention5` (`483880757`)
- focus:
  - abundance as belief and posture
- prompts:
  - what abundance do I resist?
  - what changes when I practice abundance intentionally?

#### Day 20 — Be Receptive
- source:
  - `intentions/intention6` (`483881976`)
- focus:
  - receptivity as growth capacity
- prompts:
  - what am I not letting in?
  - where do I need more openness?

#### Day 21 — Be Ever-Expansive + Summary
- source videos:
  - `intentions/intention7` (`486241765`)
  - `intentions/summary` (`486242220`)
- focus:
  - expansiveness
  - tending the planted intentions
  - completion / continuation
- prompts:
  - what is expanding in me now?
  - what will I keep tending beyond this quest?

---

## Product Identity Draft

### Working product name
**Archetypal Masculine Heart Quest**

### Positioning
A premium 21-day guided quest into the heart, archetype, masculinity, and intentional living.

### Experience principles
- dark, grounded visual field
- premium feel
- modern but mythic
- phone-first
- low clutter
- strong use of contrast and spacing
- each day should feel like entering a chamber / stage of the quest

### Visual direction
Use a design language that feels aligned with the public site, especially `faq.html`, but more immersive:
- dark charcoals / black-browns
- warm gold accents
- sand / bone text
- subtle gradients
- glass or layered panels sparingly
- clear progress markers
- “quest map” feeling without becoming gimmicky

### Suggested palette
- obsidian: `#120d0b`
- deep bark: `#1d1411`
- warm charcoal: `#241916`
- sand text: `#f3eadf`
- muted sand: `rgba(243,234,223,0.72)`
- gold accent: `#d8a14a`
- brighter gold for active state: `#efc06a`
- soft line: `rgba(239,192,106,0.18)`

---

## Portal / Website Draft

### Core pages
1. Landing page
2. Login / access page
3. Dashboard / quest map
4. Daily lesson page
5. Locked-day state
6. Completion / next unlock state
7. Reminder settings

### Landing page sections
- Hero: Archetypal Masculine Heart Quest
- short promise / invitation
- three arcs of the quest
- how the drip works
- testimonials / reflections later
- CTA to begin

### Dashboard draft
- current day card
- countdown until next unlock if locked
- quest progress tracker (1–21)
- completed days
- reminder status

### Lesson page draft
- day number + arc
- title
- framing paragraph
- one or two videos if applicable
- reflection prompts
- integration action
- mark complete button
- next unlock notice

### Special UI note
For days with two videos:
- show them as Part A / Part B
- keep the page simple
- avoid autoplay overload

---

## Email Automation Draft
Because old email copy may take time to locate, draft a new support sequence now.

### Sequence skeleton
- Welcome / orientation
- Day unlocked email (21 variants)
- Reminder if unlocked but incomplete
- Arc completion emails (after day 7 and 14)
- Final completion email
- Invitation to next coaching step

### Example support pattern
- Welcome email immediately after enrollment
- Day unlock email when next day becomes available
- Gentle reminder 12–18 hours later if not started
- Completion affirmation email at arc transitions

### Tone
- grounded
- encouraging
- not too salesy
- initiatory but warm
- practical and concise

---

## Next Build Recommendation
After the inventory pass, next create:
1. lesson metadata table for all 21 days
2. portal wireframes / design mock draft
3. landing-page copy for the Quest
4. MVP portal project scaffold


---

## Landing Page Draft — Archetypal Masculine Heart Quest

### Hero
**Eyebrow**
The Masculine Heart

**Headline**
Archetypal Masculine Heart Quest

**Subheadline**
A 21-day guided journey into the heart, archetype, masculinity, intention, and lived vitality.

**Support copy**
This is not just a video series. It is a structured quest — one day at a time — to help you reconnect with the deeper intelligence of the heart, the language of symbol and story, and a more mature, grounded masculinity.

**Primary CTA**
Begin the Quest

**Secondary CTA**
See the 21-day path

**Hero notes**
- dark cinematic background
- strong title hierarchy
- subtle gold linework / constellation / map feeling
- immediate sense of initiation, dignity, and seriousness

---

### Section 1 — What this is
**Heading**
A daily path into the heart.

**Body**
The Archetypal Masculine Heart Quest brings together three streams of work into one guided progression:
- opening the heart
- learning the language of story and symbol
- planting deeper intentions into the heart and subconscious

Each day gives you:
- a short video lesson
- reflection prompts
- an integration step
- a clear completion moment
- and then the next day unlocks 24 hours later

This creates rhythm, digestion, and actual integration.

---

### Section 2 — Who it is for
**Heading**
For men ready for something deeper than self-improvement.

**Body**
This quest is for men who sense that strength without heart becomes brittle, and that growth without honesty becomes performance.

It is for men who want:
- deeper self-awareness
- more emotional honesty
- grounded masculinity
- greater vitality
- more wholeness in daily life

It is not about hype, domination, or image.
It is about depth, integration, and becoming more fully human.

---

### Section 3 — The three arcs
**Heading**
The quest unfolds in three arcs.

#### Arc I — Unlock the Heart
Days 1–7
A return to feeling, honesty, and the emotional truths that shape life beneath the surface.

#### Arc II — Language of the Heart
Days 8–14
A journey through Iron John, symbol, story, identity, shadow, and the deeper architecture of masculinity.

#### Arc III — Intentions Worth Planting
Days 15–21
A final arc of planting qualities into the heart and subconscious so your path can continue in lived form.

---

### Section 4 — How the drip works
**Heading**
One day at a time, by design.

**Body**
This is not meant to be binge-watched.

When you complete a lesson, the next day unlocks 24 hours later.
That pacing is intentional.
It gives the heart, body, and mind time to respond.

This helps the work move from concept into lived experience.

**Possible support bullets**
- mark a day complete
- next lesson unlocks 24 hours later
- optional reminders by email or text
- progress saved across devices

---

### Section 5 — What each day includes
**Heading**
A clear daily container.

**Body**
Each day includes:
- one focused lesson
- sometimes two videos when an arc begins or closes
- practical prompts for reflection
- an integration action
- a simple completion step

The experience should feel light enough to sustain, but meaningful enough to matter.

---

### Section 6 — The promise
**Heading**
What this work supports.

**Body**
This quest is designed to support:
- more honesty with yourself
- better relationship with your heart
- greater emotional awareness
- mature masculine development
- more intentional living
- practical inner steadiness

The aim is not perfection.
The aim is wholeness.

---

### Section 7 — Reflection / quote band
**Heading**
The heart is not a metaphor only.

**Body**
The heart carries story, image, memory, and a kind of intelligence that modern life often trains us to ignore.

This quest is an invitation to restore that relationship.

**Optional quote style block**
Broken hearts don't work. So what do we do? We fix them.
— Dr. Paul, PhD

---

### Section 8 — Daily reminders
**Heading**
Support, without noise.

**Body**
If desired, you can receive reminder support as you move through the quest.

Possible support includes:
- daily unlock emails
- gentle reminder prompts
- optional text reminders
- integration questions sent at the right time

The aim is to help you stay in rhythm, not overwhelm you.

---

### Section 9 — Final CTA
**Heading**
Begin the 21-day journey.

**Body**
If you are ready to approach the heart with honesty, depth, and grounded practice, this quest is here for you.

**CTA**
Begin the Quest

**Secondary CTA**
Preview the path

---

## Landing Page Design Notes

### Overall feel
- premium
- initiatory
- modern
- masculine without cliché
- dark and spacious

### Visual motifs
- subtle topographic lines / map feeling
- low-contrast sacred geometry or symbolic patterning
- quest-path progress markers
- warm gold highlights for active / unlocked moments
- soft glow on current-day card

### Avoid
- gamer aesthetics
- fantasy clichés
- aggressive “alpha male” tone
- too much copy density above the fold

---

## Suggested First Portal Copy Architecture
1. Hero
2. What this is
3. Who it is for
4. Three arcs
5. Drip logic / how it works
6. What each day includes
7. Promise / outcomes
8. Reminder support
9. Final CTA

---

## Next Deliverables After This Draft
1. lesson metadata table for all 21 days
2. low-fidelity wireframe map
3. UI component draft for dashboard + lesson page
4. portal scaffold project spec


---

## Lesson Metadata Table Draft
This table is the first content backbone for the portal. It allows more than 21 source items while still supporting a 21-day guided quest. Where appropriate, intro videos are folded into a day rather than treated as separate unlocks.

| Quest Day | Arc | Display Title | Source Pages / Videos | Known Vimeo IDs | Core Theme | Reflection / Integration Focus | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Heart Unlock | Welcome to the Heart | `heartunlock/index` + `heartunlock/day1` | unknown + unknown | entering the heart / emotional pain | identify emotional pain, begin notebook practice | intro folded into day 1 |
| 2 | Heart Unlock | Sadness and Scars | `heartunlock/day2` | unknown | sadness / scars | identify sources of sadness, what still wants to be felt |  |
| 3 | Heart Unlock | Anger and Defenses | `heartunlock/day3` | unknown | anger / emotional sovereignty | identify defense patterns, loss of sovereignty |  |
| 4 | Heart Unlock | Numbing and Disconnection | `heartunlock/day4` | unknown | numbing / stifled life | where am I numb, what is protected there |  |
| 5 | Heart Unlock | Shame and Not-Enoughness | `heartunlock/day5` | unknown | shame / awareness | notice “I am not enough” patterns |  |
| 6 | Heart Unlock | Regret and Consequence | `heartunlock/day6` | unknown | regret / consequence | what has pain cost me, what needs acknowledgment |  |
| 7 | Heart Unlock | Choosing to Feel | `heartunlock/day7` | unknown | commitment to feeling | willingness to feel fully, completion checkpoint | arc 1 completion |
| 8 | Iron John | Entering the Story | `ironjohn/index` + `ironjohn/day1` | `467500375`, `467494269` | story, symbol, imagination | what does the story stir, what stands out | intro folded into day 8 |
| 9 | Iron John | The Cage and the False Self | `ironjohn/day2` | `468344269` | conditioning / false self | how was I told I should be, what was lost |  |
| 10 | Iron John | Non-Judgement and Inner Gold | `ironjohn/day3` | `469815966` | non-judgement / hidden gold | mistake, gold, honesty |  |
| 11 | Iron John | Breath and State Change | `ironjohn/day4` | `469578165` | box breathing / heart-state training | choose a word / state to breathe in |  |
| 12 | Iron John | Tending the Inner Garden | `ironjohn/day5` | `471745654` | tending the heart | what am I planting, feeding, growing |  |
| 13 | Iron John | The Earth and the Masculine Heart | `ironjohn/day6` | `471753829` | grounding / masculine heart | grounding meditation, father earth imagery |  |
| 14 | Iron John | Identity, Shadow, and the Rest of the Story | `ironjohn/day7` + `ironjohn/day8` | `475973182`, `475973182` | identity / shadow / story completion | what must be let go, what gold hides in shadow | two-part closing day |
| 15 | Intentions | Intention as Practice | `intentions/index` + `intentions/intention1` | `483878304`, `491451277` | intention / creativity | what do I want to create, imagination as medicine | intro folded into day 15 |
| 16 | Intentions | Be Kind | `intentions/intention2` | `483727694` | kindness as courage | what does kindness mean to me |  |
| 17 | Intentions | Be Beauty | `intentions/intention3` | `483879872` | truth / beauty / alignment | where do I seek truth and beauty |  |
| 18 | Intentions | Be Love | `intentions/intention4` | `488237870` | love as orientation | what does it mean to be love in practice |  |
| 19 | Intentions | Be Abundance | `intentions/intention5` | `483880757` | abundance as belief | what changes when I practice abundance |  |
| 20 | Intentions | Be Receptive | `intentions/intention6` | `483881976` | receptivity / openness | what am I not letting in |  |
| 21 | Intentions | Be Ever-Expansive | `intentions/intention7` + `intentions/summary` | `486241765`, `486242220` | expansiveness / tending the path | what is growing, what continues beyond completion | final day + summary |

### Extended Source Inventory Beyond the 21-Day Path
This section keeps all core source items visible in case a longer version, bonus library, or expanded portal is created.

| Source Course | Source Item | URL Pattern | Known Vimeo ID | Recommended Use |
|---|---|---|---|---|
| Heart Unlock | Intro | `heartunlock/index` | unknown | fold into day 1 |
| Heart Unlock | Day 1 | `heartunlock/day1` | unknown | core lesson |
| Heart Unlock | Day 2 | `heartunlock/day2` | unknown | core lesson |
| Heart Unlock | Day 3 | `heartunlock/day3` | unknown | core lesson |
| Heart Unlock | Day 4 | `heartunlock/day4` | unknown | core lesson |
| Heart Unlock | Day 5 | `heartunlock/day5` | unknown | core lesson |
| Heart Unlock | Day 6 | `heartunlock/day6` | unknown | core lesson |
| Heart Unlock | Day 7 | `heartunlock/day7` | unknown | core lesson |
| Iron John | Intro | `ironjohn/index` | `467500375` | fold into day 8 |
| Iron John | Day 1 | `ironjohn/day1` | `467494269` | core lesson |
| Iron John | Day 2 | `ironjohn/day2` | `468344269` | core lesson |
| Iron John | Day 3 | `ironjohn/day3` | `469815966` | core lesson |
| Iron John | Day 4 | `ironjohn/day4` | `469578165` | core lesson |
| Iron John | Day 5 | `ironjohn/day5` | `471745654` | core lesson |
| Iron John | Day 6 | `ironjohn/day6` | `471753829` | core lesson |
| Iron John | Day 7 | `ironjohn/day7` | `475973182` | part of merged day 14 |
| Iron John | Day 8 | `ironjohn/day8` | `475973182` | part of merged day 14 |
| Intentions | Intro | `intentions/index` | `483878304` | fold into day 15 |
| Intentions | Intention 1 | `intentions/intention1` | `491451277` | core lesson |
| Intentions | Intention 2 | `intentions/intention2` | `483727694` | core lesson |
| Intentions | Intention 3 | `intentions/intention3` | `483879872` | core lesson |
| Intentions | Intention 4 | `intentions/intention4` | `488237870` | core lesson |
| Intentions | Intention 5 | `intentions/intention5` | `483880757` | core lesson |
| Intentions | Intention 6 | `intentions/intention6` | `483881976` | core lesson |
| Intentions | Intention 7 | `intentions/intention7` | `486241765` | core lesson |
| Intentions | Summary | `intentions/summary` | `486242220` | fold into day 21 |

### Notes on Merge Logic
- The quest remains 21 days, but includes more than 21 source videos by folding intros and summaries into key days.
- If a longer “expanded library” version is desired later, these source items can also be exposed separately as bonus or companion materials.
- Heart Unlock Vimeo IDs remain unknown for now and should be filled in once recovered from files, Vimeo, or Groove-hosted sources.

### Next metadata layer to add
For each day later add:
- lesson summary
- 1–3 final portal prompts
- completion text
- reminder text
- email subject line
- SMS reminder variant


---

## Wireframe + Page Map Draft

### Portal Sitemap

#### Public / semi-public
1. Quest landing page
2. About the quest / methodology section
3. Sign up / login page

#### Private / enrolled
4. Dashboard / quest map
5. Current lesson page
6. Locked lesson page
7. Completion / transition page
8. Reminder settings page
9. Profile / account page

#### Optional later
10. Journal / notes page
11. Bonus library page
12. Archive of completed lessons

---

## 1. Quest Landing Page Wireframe

### Block A — Hero
- dark atmospheric background
- eyebrow: The Masculine Heart
- large title: Archetypal Masculine Heart Quest
- short subheadline
- primary CTA: Begin the Quest
- secondary CTA: Preview the 21-day path

### Block B — What this is
- short explanatory text
- 3 or 4 feature bullets
- visual side panel describing daily unlock rhythm

### Block C — Three arcs
- 3 cards or horizontal milestones
  - Unlock the Heart
  - Language of the Heart
  - Intentions Worth Planting
- each with short description and days covered

### Block D — How the quest works
- daily lesson
- reflection prompts
- completion
- 24-hour unlock
- optional reminders

### Block E — Why it matters
- stronger emotional / existential framing
- heart, masculinity, subconscious, wholeness

### Block F — CTA band
- invitation to begin
- maybe note that it is phone-friendly and paced intentionally

---

## 2. Sign Up / Login Page Wireframe

### Core elements
- simple dark panel centered
- title
- email field
- password / magic link option
- optional note: one lesson a day by design
- support/help link

### Tone
- minimal friction
- clean and modern
- premium, not corporate

---

## 3. Dashboard / Quest Map Wireframe

### Top band
- welcome line
- quest title
- progress indicator: Day X of 21
- current arc label

### Main card
- current lesson card
- title
- short lesson prompt
- CTA: Continue today’s lesson

### Progress area
Possible designs:
- vertical quest path with 21 nodes
or
- 3 arc panels with day markers inside

Recommended:
- **3 arc panels** for clarity on phone and desktop

Each day state:
- completed
- unlocked/current
- locked

### Side/support cards
- next unlock countdown
- reminders on/off
- short inspirational line / quote

---

## 4. Lesson Page Wireframe

### Header area
- day number
- arc name
- lesson title
- subtle progress marker

### Lesson content area
#### Part 1 — Orientation
- short paragraph framing the lesson

#### Part 2 — Video block
- one video or two stacked videos
- if two videos:
  - Part A
  - Part B

#### Part 3 — Reflection prompts
- 1 to 3 prompts
- spacious styling
- optional “copy prompts” / journal prompt button later

#### Part 4 — Integration action
- one practical action for the day
- simple and clear

#### Part 5 — Completion card
- checkbox or completion button
- when clicked:
  - save completion
  - show unlock timing for next lesson

### Design note
This page should feel immersive but simple.
Avoid clutter and unnecessary navigation noise.

---

## 5. Locked Lesson Page Wireframe

### Core elements
- lesson title visible
- lock state message
- countdown until unlock
- short note explaining pacing is intentional
- optional quote / supportive reflection

### Purpose
Turn waiting into part of the initiation, not frustration.

---

## 6. Completion / Transition Page Wireframe

### Core elements
- affirmation message
- “Day complete” state
- next lesson unlock time
- optional reflection line
- CTA back to dashboard

### Arc checkpoints
At day 7, 14, and 21:
- show stronger milestone page
- acknowledge completion of an arc
- invite brief reflection

---

## 7. Reminder Settings Page Wireframe

### Core settings
- email reminders on/off
- text reminders on/off
- preferred timezone
- preferred delivery window

### Optional later
- morning / evening preference
- prompt-only reminders vs full reminders

---

## 8. Visual Component System Draft

### Key reusable components
- hero panel
- arc card
- day node
- lesson card
- locked state card
- quote band
- progress pill
- countdown card
- reminder toggle row

### UI feel
- rounded but serious
- restrained animation
- subtle glow on active elements
- gold accents only where meaningful

---

## Dashboard UI Recommendation
Best layout for clarity and elegance:

### Desktop
- left: current lesson + arc overview
- right: progress / countdown / reminders

### Mobile
- stacked layout
- current lesson first
- progress second
- support cards below

---

## Wireframe Priority Order for Build
1. Landing page
2. Dashboard
3. Lesson page
4. Locked state
5. Completion state
6. Settings
7. Auth page

This is the order that best converts planning into a working MVP quickly.

---

## Immediate Next Build Deliverable
After this wireframe step, the next best move is:
- create a separate project scaffold for the quest portal
- or draft the actual landing page HTML/mock layout first

Recommended next:
**draft actual landing page HTML/mock layout first**
so the visual language gets locked before app structure expands.
