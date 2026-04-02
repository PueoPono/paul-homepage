# Meditation Lead Funnel

## Current implementation
- Resource card added to `resources.html`
- Opt-in page: `meditation.html`
- Thank-you page with embedded meditation: `meditation-thank-you.html`
- Front-end capture scaffold: `meditation-optin.js`

## Recommended backend structure
Use the same Supabase project as Masculine Heart Quest, but keep lead tables separate.

### Suggested tables
- `lead_magnets`
- `lead_submissions`
- `email_sequences`
- `email_sequence_enrollments`

## Minimal SQL idea
```sql
create table if not exists lead_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  source_page text,
  lead_magnet_slug text not null,
  tags jsonb default '[]'::jsonb,
  status text default 'new',
  created_at timestamptz default now()
);
```

## Recommended next real backend step
Create one API/edge function or a protected server-side route that:
1. writes to `lead_submissions`
2. enrolls the email into `email_sequence_enrollments`
3. optionally triggers external email delivery (Resend, MailerLite, ConvertKit, etc.)

## Immediate front-end config needed
Set these on the page or inject during deploy:
- `window.MEDITATION_SUPABASE_URL`
- `window.MEDITATION_SUPABASE_ANON_KEY`

Better long-term: replace direct browser insert with a server-side endpoint.

## Suggested email sequence
1. Here is your meditation
2. Best way to use it
3. Reflection / integration prompt
4. Invitation into coaching / next step
