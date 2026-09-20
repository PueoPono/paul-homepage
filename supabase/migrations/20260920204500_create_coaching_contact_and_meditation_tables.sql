create table if not exists public.coaching_contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text not null,
  message text not null,
  source_url text,
  status text not null default 'new',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists coaching_contact_messages_created_at_idx
  on public.coaching_contact_messages (created_at desc);

create index if not exists coaching_contact_messages_status_idx
  on public.coaching_contact_messages (status);

alter table public.coaching_contact_messages enable row level security;

create table if not exists public.coaching_meditation_optins (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  email text not null,
  status text not null default 'new',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists coaching_meditation_optins_created_at_idx
  on public.coaching_meditation_optins (created_at desc);

create index if not exists coaching_meditation_optins_email_idx
  on public.coaching_meditation_optins (email);

alter table public.coaching_meditation_optins enable row level security;
