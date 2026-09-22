# Shared Email Dispatcher + Email Review

This note connects the coaching homepage/email review surface to the shared Supabase schedule/send service.

## Role of email review

The coaching email review page/API is the editorial/review surface for sequence copy. It is not the recurring sender.

Live API currently used by agents:

- `https://coaching.paulcropper.com/api/email-review-sequences`

Agents may use this endpoint to inspect and update sequence copy, references, timing labels, and operational notes. After any update, re-fetch the endpoint and confirm that all expected sequences/messages remain present.

## Role of shared dispatcher

The shared dispatcher is the runtime schedule/send layer:

- Supabase project ref: `hhgxmfffwivijyowjggr`
- Edge Function: `shared-email-dispatcher`
- Schedule: every 5 minutes via Supabase `pg_cron` + `pg_net`
- Provider: Brevo transactional API through Supabase Function secret `BREVO_API_KEY`
- Canonical project doc: `/Users/ponomini/Documents/Na-au-Obsidian/Agent-Shared/projects/active/shared-email-service.md`

Flow:

1. App event creates or updates enrollment in Supabase.
2. Dispatcher reads due active enrollments.
3. Dispatcher writes `outbound_emails` queue rows.
4. Dispatcher sends via Brevo.
5. Dispatcher marks outbound rows `sent`/`failed` and advances/completes enrollment.

## Existing live sequences

As of the last agent verification, the email review API contained three active sequences:

1. `meditation-signup`
   - 3 messages
   - trigger: meditation opt-in/sign-up
2. `coaching-signup`
   - 3 messages
   - trigger: coaching purchase/onboarding
3. `masculine-heart-quest`
   - 7 messages
   - trigger: Masculine Heart Quest Stripe `checkout.session.completed`
   - cadence: immediate first email, then every 48 hours

## Agent rules

- Never store Brevo API keys, Supabase service-role keys, cron secrets, anon JWTs, Stripe keys, or webhook secrets in this repo or Obsidian.
- Do not put recurring send loops inside this homepage project.
- Product apps own triggers/enrollment.
- Supabase owns canonical sequence/enrollment/outbound state.
- Brevo owns delivery only.
- Email review owns editorial copy/review notes.

## Troubleshooting handoff

If copy is wrong:

1. Check email review API/page.
2. Confirm sequence/message IDs remained stable.
3. Update copy through the editorial API/process.

If enrollment is missing:

1. Check the product app trigger first.
2. Then inspect `email_sequence_enrollments` for the expected `sequence_slug`.

If email is not sending:

1. Check `outbound_emails` statuses.
2. Check Supabase Edge Function logs for `shared-email-dispatcher`.
3. Check Brevo delivery logs.
4. Confirm `BREVO_API_KEY` is configured as a Supabase Function secret.
