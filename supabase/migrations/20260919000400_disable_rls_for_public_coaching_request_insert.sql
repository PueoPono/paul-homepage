alter table public.coaching_page_update_requests disable row level security;
grant insert on table public.coaching_page_update_requests to anon, authenticated;
revoke select, update, delete on table public.coaching_page_update_requests from anon, authenticated;
