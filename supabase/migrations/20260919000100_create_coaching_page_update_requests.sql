create table if not exists public.coaching_page_update_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'coaching-site-editor',
  source_url text,
  page_label text,
  status text not null default 'new',
  request_markdown text,
  old_json jsonb,
  old_json_text text,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.coaching_page_update_requests enable row level security;

create policy "Allow public coaching update request inserts"
  on public.coaching_page_update_requests
  for insert
  to anon
  with check (source = 'coaching-site-editor');

create index if not exists coaching_page_update_requests_created_at_idx
  on public.coaching_page_update_requests (created_at desc);

create index if not exists coaching_page_update_requests_status_idx
  on public.coaching_page_update_requests (status);
