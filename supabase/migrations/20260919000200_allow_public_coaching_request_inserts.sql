drop policy if exists "Allow public coaching update request inserts" on public.coaching_page_update_requests;

create policy "Allow public coaching update request inserts"
  on public.coaching_page_update_requests
  for insert
  to public
  with check (source = 'coaching-site-editor');
