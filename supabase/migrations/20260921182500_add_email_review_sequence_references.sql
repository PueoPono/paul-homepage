alter table public.email_review_sequences
  add column if not exists "references" jsonb not null default '{}'::jsonb;
