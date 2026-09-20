grant insert on table public.coaching_page_update_requests to anon, authenticated;

drop policy if exists "Allow public coaching update request inserts" on public.coaching_page_update_requests;

create policy "Allow public coaching update request inserts"
  on public.coaching_page_update_requests
  for insert
  to anon, authenticated
  with check (true);
