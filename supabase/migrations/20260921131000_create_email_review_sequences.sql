create extension if not exists pgcrypto;

create table if not exists public.email_review_sequences (
  sequence_key text primary key,
  title text not null,
  description text not null default '',
  category text not null default 'General',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.email_review_sequences enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'email_review_sequences'
      and policyname = 'Service role can manage email review sequences'
  ) then
    create policy "Service role can manage email review sequences"
      on public.email_review_sequences
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end;
$$;

create index if not exists email_review_sequences_sort_idx
  on public.email_review_sequences (sort_order, title);

create or replace function public.set_email_review_sequences_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists email_review_sequences_updated_at on public.email_review_sequences;
create trigger email_review_sequences_updated_at
before update on public.email_review_sequences
for each row execute function public.set_email_review_sequences_updated_at();
