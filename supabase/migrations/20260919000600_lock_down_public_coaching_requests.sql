revoke all on table public.coaching_page_update_requests from anon, authenticated, public;
alter table public.coaching_page_update_requests enable row level security;
drop policy if exists "Allow public coaching update request inserts" on public.coaching_page_update_requests;
