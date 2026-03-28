# Website Background + Spaciousness Plan (Draft)

Last updated: 2026-03-27
Repo: `paul-homepage`
Purpose: Track the approved first-pass visual direction for sitewide background treatment, section rhythm, and spaciousness adjustments so implementation is easy to execute and easy to roll back.

## Core visual direction

The site should foster:
- calm
- ease
- peaceful desire for greater health and wellbeing
- transition and evolution of experience across the site

This should **not** feel like one monotone atmosphere.
Each page/section should feel like a distinct step in an emotional staircase:
- ground
- open
- deepen
- clarify
- invite

The visual system should support movement from one state to the next.

## Protected sections

Do not change these hero/background treatments:
- Homepage hero (important warm contrast)
- About hero / About Me first block (important clear blue sky / cloud inspiration contrast)

These two should remain visually distinct anchors in the site.

## Approved image pool

Only use these approved real-world Adobe Stock images for the first pass.
No other forest/photo options from prior exploration should be used unless explicitly approved later.

Approved images are recorded here so they are not lost between sessions.

### Image A — Option 1
**Use name:** Foggy morning forest light
**Adobe link:** https://stock.adobe.com/images/sunlight-shining-through-a-forest-on-a-foggy-morning-light-rays-streaming-through-the-fog-illuminates-the-fir-and-cedar-trees-on-a-country-dirt-road/185433102
**Qualities:** calm, depth, grounded hope, real, readable with overlay

### Image B — Option 4
**Use name:** Green forest sunbeams
**Adobe link:** https://stock.adobe.com/images/sunbeams-in-green-forest-sunny-forest-nature-sunlight-through-trees-autumn-forest-landscape-in-the-morning-on-sunrise/175871006
**Qualities:** freshness, vitality, uplift, morning energy

### Image C — Option 6
**Use name:** Redwood light beams
**Adobe link:** https://stock.adobe.com/images/beams-of-sunlight-pierce-a-dark-imposing-old-growth-redwood-forest-in-humboldt-california-redwood-trees-sequoia-sempervirens-are-the-tallest-and-most-massive-tree-species-on-earth/382928012
**Qualities:** ancient grounded presence, reverence, depth, mature steadiness

## Page/block background plan

Exclude headers and footers.
Keep headings unchanged.

### Homepage
- **homepage block1:** hero — no change
- **homepage block2:** Image A — Foggy morning forest light
- **homepage block3:** plain deep brown-black
- **homepage block4:** Image C — Redwood light beams
- **homepage block5:** plain dark warm charcoal

### Work With Me
- **work with me block1:** hero — keep current sky image
- **work with me block2:** plain black / deep charcoal
- **work with me block3:** Image B — Green forest sunbeams
- **work with me block4:** plain warm dark brown

### About
- **about block1:** hero — no change
- **about block2:** plain warm black / espresso charcoal
- **about block3:** Image C — Redwood light beams
- **about block4:** plain dark brown-black

### My Story
- **my story block1:** hero — no change
- **my story block2:** plain deep charcoal
- **my story block3:** Image A — Foggy morning forest light
- **my story block4:** plain black with slight warmth

### FAQ
- **faq block1:** plain dark charcoal
- **faq block2:** plain near-black, no photo background

### Testimonials
- **testimonials block1:** plain dark charcoal
- **testimonials block2:** plain black
- **testimonials block3:** Image B — Green forest sunbeams

### Resources
- **resources block1:** plain dark charcoal
- **resources block2:** Image C — Redwood light beams

### Contact
- **contact block1:** plain dark charcoal
- **contact block2:** plain black / deep warm charcoal

## Other non-photo background directions used in the plan

The plan also uses plain-tone sections between photo sections so the site breathes and does not become visually noisy.
These are not stock images; they are color/texture directions to be implemented in CSS.

- plain deep brown-black
- plain dark warm charcoal
- plain black / deep charcoal
- plain warm dark brown
- plain warm black / espresso charcoal
- plain black with slight warmth
- plain dark charcoal
- plain near-black

These plain sections are intentional resting points between more atmospheric image sections.

## Spaciousness implementation summary

Across all sections:
- increase vertical top/bottom padding
- increase spacing between kicker/eyebrow and heading
- increase spacing between heading and body copy
- increase spacing before CTA rows
- increase card interior padding
- reduce density in stacked layouts
- make mobile spacing more breathable
- preserve strong readability in all image sections with dark overlay

## Emotional rhythm summary

The site should feel like:
- arrival
- reflection
- grounding
- opening
- invitation

The visuals should guide the nervous system through distinct but coherent shifts rather than one repeated mood.

## Implementation safeguards

- Track changes so rollback is easy
- Prefer central CSS edits over scattered inline overrides
- Add page/block-specific classes for background assignment
- Keep heading text unchanged
- Use strong dark overlays on image sections for readability
- Do a clean commit before implementation and a clean commit after implementation

## Open question

Do we need more images?

Current answer: **yes, likely helpful**.
The 3 approved images are recorded and valid, but because image reuse is not desired, additional unique assets should be sourced for later implementation passes.

More images are useful if:
- repeated reuse starts to feel too familiar
- a page needs a more distinct emotional identity
- one of the approved images does not work well in layout after overlay/cropping
- each image section should carry a distinct emotional quality

For the first pass of planning, the approved set is sufficient to begin conceptually, but implementation should likely expand the asset pool.

## Additional approved possible images (future-use pool)

These are approved as possible future-use images.
They do not all need to be used now, but they are approved options for later passes and should remain recorded here.

### Approved water / stream / moss image

1. **Mountain stream cascading over moss-covered rocks**
   - Adobe link: https://stock.adobe.com/images/mountain-stream-cascading-over-moss-covered-rocks-wot-long-exposure-motion-blur/224335059
   - Feeling: flow, cleansing, dynamic but still natural
   - Suggested future uses: Resources, My Story, or a later calming/integration section

### Approved stone / rock / rock face image

1. **Jagged black slate rock face**
   - Adobe link: https://stock.adobe.com/images/detailed-view-of-jagged-rough-edges-of-black-slate-rock-face-against-a-dark-background-jagged-rough-edges-of-black-slate-against-a-dark-backdrop/921332403
   - Feeling: dramatic earth presence, mature strength, depth
   - Suggested future uses: grounding sections, testimonial support sections, dark rest sections, or premium texture backgrounds

### Approved soft dark foliage images

1. **Dark green tropical leaves background**
   - Adobe link: https://stock.adobe.com/images/group-of-dark-green-tropical-leaves-background-nature-lush-foliage-leaf-texture-tropical-leaf/558334377
   - Feeling: soft living texture, enveloping, lush without scenery
   - Suggested future uses: quiet nature sections, subtle atmosphere behind text, or calm transition bands

2. **Dark green foliage from clean tropical leaves**
   - Adobe link: https://stock.adobe.com/images/dark-green-foliage-nature-background-from-clean-tropical-plant-leaves/317521483
   - Feeling: simple, quiet, natural, text-friendly with overlay
   - Suggested future uses: cleaner foliage background sections, FAQ/resources support bands, or softer contrast sections

## Where these additional approved images may fit later

These are not required for the current first implementation, but they fit the plan well and may reduce reuse later.

- **Water / stream / moss**
  - Resources block2
  - My Story block3
  - future integration / restoration section

- **Rock face / stone texture**
  - Homepage block5 alternative
  - Testimonials block2 or block3 alternative
  - Contact block2 alternative

- **Soft dark foliage**
  - About block3 alternative
  - FAQ block1 alternative
  - Resources block2 alternative
  - Contact block1 alternative
