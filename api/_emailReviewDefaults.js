const DEFAULT_SEQUENCES = [
  {
    sequence_key: 'meditation-signup',
    title: 'Meditation Sign-up',
    description: 'Nurture sequence for people who request the guided meditation.',
    category: 'Meditation',
    is_active: true,
    sort_order: 10,
    messages: [
      {
        id: 'meditation-instant-delivery',
        title: 'Meditation delivery',
        timing: 'Immediately after meditation sign-up',
        subject: 'Your guided meditation is ready',
        preheader: 'A quiet place to begin returning to yourself.',
        body: `Hi {{first_name}},

Thank you for requesting the guided meditation.

Here is the place to begin:
{{meditation_link}}

Give yourself a few uninterrupted minutes. Let the body settle before you press play. You do not have to do this perfectly — simply arrive, breathe, and allow the practice to meet you where you are.

This meditation is meant to help you soften the noise, return to the heart, and remember the steadiness that is already underneath the pressure.

Warmly,
Paul`,
        cta_label: 'Open the meditation',
        cta_url: 'https://coaching.paulcropper.com/meditation-thank-you.html',
      },
      {
        id: 'meditation-day-2-integration',
        title: 'Integration check-in',
        timing: '2 days after sign-up',
        subject: 'A simple way to keep returning',
        preheader: 'The practice deepens when it becomes part of ordinary life.',
        body: `Hi {{first_name}},

I wanted to check in after you received the meditation.

The value of a practice like this is not only what happens while you are listening. It is what begins to change in the small moments afterward — how quickly you notice contraction, how gently you return to the body, how honestly you can feel what is here without abandoning yourself.

If you use the meditation again, try this:

Before you begin, place one hand on your heart or belly and ask, “What am I carrying right now?”

Then let the practice be less about fixing yourself and more about being with yourself.

That is where a different kind of strength begins.

Warmly,
Paul`,
        cta_label: 'Return to the meditation',
        cta_url: 'https://coaching.paulcropper.com/meditation-thank-you.html',
      },
      {
        id: 'meditation-day-5-coaching-invite',
        title: 'Soft coaching invitation',
        timing: '5 days after sign-up',
        subject: 'If something in you is ready for deeper support',
        preheader: 'A personal invitation to explore 1-1 coaching.',
        body: `Hi {{first_name}},

Sometimes a meditation opens a door.

You may notice more feeling, more clarity, or even more discomfort because the part of you that has been holding everything together finally has room to speak.

This is often where deeper work becomes useful — not as another self-improvement project, but as a grounded space to tell the truth, reconnect with your vitality, and build a life that feels more honest from the inside.

If you feel called to explore that kind of support, you are welcome to book a conversation with me.

No pressure. Just a real conversation about where you are, what you are carrying, and what kind of support would actually serve.

Warmly,
Paul`,
        cta_label: 'Book a conversation',
        cta_url: 'https://calendly.com/paulcropper/coachingcall',
      },
    ],
  },
  {
    sequence_key: 'coaching-signup',
    title: '1-1 Coaching Sign-up',
    description: 'Client onboarding sequence after someone purchases the coaching package.',
    category: 'Coaching',
    is_active: true,
    sort_order: 20,
    messages: [
      {
        id: 'coaching-payment-welcome',
        title: 'Payment confirmation + welcome',
        timing: 'Immediately after successful coaching payment',
        subject: 'Welcome to your 1-1 coaching collaboration',
        preheader: 'Welcome. I’m honored to begin this work with you.',
        hero_eyebrow: 'Integrated Lifestyle Coaching',
        hero_title: 'Welcome to the 1-1 Coaching Collaboration',
        template_style: 'brevo-coaching-welcome',
        body: `Hi {{first_name}},

Welcome. I’m honored to begin this work with you.

Your 1-1 coaching collaboration has begun. This is a focused, personal container for becoming more honest, grounded, vital, and connected — in the body, the heart, and the life you are actually living.`,
        card_title: 'What happens next:',
        card_body: `I’ll follow up personally with the next step for scheduling and orientation. For now, simply notice that the commitment has been made. That matters.

Come as you are. We’ll begin from the truth of where you are, and we’ll move with care, strength, and precision from there.`,
        footer: 'Paul Cropper · Integrated Heart & Vitality Coaching\nhello@paulcropper.com',
        cta_label: 'Schedule or confirm a call',
        cta_url: 'https://calendly.com/paulcropper/coachingcall',
      },
      {
        id: 'coaching-prep',
        title: 'First-session preparation',
        timing: '24 hours after payment, if first session not yet completed',
        subject: 'Before our first coaching session',
        preheader: 'A few reflections to help us begin well.',
        body: `Hi {{first_name}},

Before our first session, I invite you to spend a few quiet minutes with these questions.

You do not need perfect answers. Just notice what is honest.

• What feels most alive, unresolved, or important in your life right now?
• Where do you feel yourself performing, protecting, or holding back?
• What would you love to feel more free to say, want, create, or become?
• If this coaching container truly served you, what would be different three months from now?

Bring whatever emerges. The clear parts, the messy parts, the parts you are not sure how to name yet.

We will begin there.

Warmly,
Paul`,
        cta_label: 'Schedule your session',
        cta_url: 'https://calendly.com/paulcropper/coachingcall',
      },
      {
        id: 'coaching-after-first-week',
        title: 'Early integration',
        timing: '7 days after coaching sign-up',
        subject: 'Let the work begin in small honest moments',
        preheader: 'The coaching continues between sessions.',
        body: `Hi {{first_name}},

As we begin this work, remember that transformation is not only in the big breakthroughs.

It is also in the moment you pause instead of override yourself.
It is in the conversation where you tell a little more truth.
It is in noticing the body before the old pattern takes over.
It is in choosing contact instead of collapse, honesty instead of performance, presence instead of pressure.

Between sessions, let the work stay simple:

Notice what is real.
Tell the truth gently.
Return to your body.
Take one honest step.

That is enough to keep the thread alive.

Warmly,
Paul`,
        cta_label: '',
        cta_url: '',
      },
    ],
  },
  {
    sequence_key: 'masculine-heart-quest',
    title: 'Masculine Heart Quest',
    description: 'Welcome and engagement sequence for Masculine Heart Quest sign-ups.',
    category: 'Course',
    is_active: true,
    sort_order: 30,
    messages: [
      {
        id: 'mhq-welcome',
        title: 'Course welcome',
        timing: 'Immediately after Masculine Heart Quest sign-up',
        subject: 'Welcome to Masculine Heart Quest',
        preheader: 'Begin with presence, honesty, and heart.',
        body: `Hi {{first_name}},

Welcome to Masculine Heart Quest.

This is not a course about becoming someone else. It is an invitation to return to the parts of you that are already wise, strong, sensitive, and alive — the parts that may have been buried under pressure, performance, shutdown, or survival.

As you begin, move slowly enough to actually feel the work.

Let each practice be lived, not consumed.
Let the questions reach beneath the surface.
Let your heart have room to answer before the mind rushes in.

You can begin here:
{{course_link}}

I’m glad you’re here.

Warmly,
Paul`,
        cta_label: 'Begin the quest',
        cta_url: 'https://masculineheartquest.com/',
      },
      {
        id: 'mhq-day-3-depth',
        title: 'Depth reminder',
        timing: '3 days after sign-up',
        subject: 'The quest asks for honesty, not perfection',
        preheader: 'Let the work meet the real places in you.',
        body: `Hi {{first_name}},

A few days into a journey like this, it is common for the mind to turn it into another thing to complete.

Try not to rush.

The deeper invitation is not to get through the material. It is to let the material get through to you.

If something stirs emotion, resistance, grief, longing, or tenderness, that is not a problem. That may be the doorway.

Masculine heart work is not about hardening. It is about becoming strong enough to stay open, honest enough to stop pretending, and grounded enough to live from what matters.

Stay close to the real thread.

Warmly,
Paul`,
        cta_label: 'Return to the course',
        cta_url: 'https://masculineheartquest.com/',
      },
      {
        id: 'mhq-day-10-invite',
        title: 'Invitation to personal support',
        timing: '10 days after sign-up',
        subject: 'If the quest is opening something deeper',
        preheader: 'A gentle invitation for 1-1 support.',
        body: `Hi {{first_name}},

If Masculine Heart Quest is opening something deeper in you, I want you to know there is support available beyond the course.

Sometimes the material brings us to an edge: a conversation we have avoided, a grief we have not had space to feel, a desire that feels risky to admit, a pattern we can finally see but not yet shift alone.

That is where 1-1 work can be powerful.

If you would like a grounded, personal space to explore what is moving in you, you are welcome to book a conversation with me.

We can look together at what is opening, what is asking for attention, and what kind of support would serve your next step.

Warmly,
Paul`,
        cta_label: 'Book a conversation',
        cta_url: 'https://calendly.com/paulcropper/coachingcall',
      },
    ],
  },
];

module.exports = { DEFAULT_SEQUENCES };
