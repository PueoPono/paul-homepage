// A receipt-only read: no copy payloads, source URLs, contact data or credentials.
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'GET') { res.statusCode = 405; return res.end('{}'); }
  const id = String(req.query?.id || '');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { res.statusCode = 400; return res.end('{}'); }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { res.statusCode = 503; return res.end('{}'); }
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/coaching_page_update_requests?id=eq.${id}&select=id,status,metadata&limit=1`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!response.ok) throw new Error('Unavailable');
    const [row] = await response.json();
    if (!row) { res.statusCode = 404; return res.end('{}'); }
    const m = row.metadata || {};
    res.statusCode = 200;
    // Metadata can originate in public submissions: never echo arbitrary values.
    const date = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T[\d:.+-]+Z?$/.test(value) && Number.isFinite(Date.parse(value)) ? value : null;
    const actor = value => value === 'Kukui' ? value : null;
    return res.end(JSON.stringify({ id, status: ['new', 'in_progress', 'implemented', 'archived'].includes(row.status) ? row.status : 'new', seen_by: actor(m.seen_by), seen_at: date(m.seen_at), implemented_by: actor(m.implemented_by), implemented_at: date(m.implemented_at), website_published_at: date(m.website_published_at), email_verification_pending: m.email_verification_pending === true }));
  } catch { res.statusCode = 503; return res.end('{}'); }
};
