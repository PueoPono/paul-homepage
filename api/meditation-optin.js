const crypto = require('node:crypto');
const { meditationDeliveryEmail, sendEmail, upsertContact } = require('./_brevo');
const TABLE = 'coaching_meditation_optins';
function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}
async function db(path, method = 'GET', payload) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Storage unavailable');
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${TABLE}${path}`, {
    method,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  });
  if (!response.ok) { const error = new Error('Storage unavailable'); error.status = response.status; throw error; }
  return response.json();
}
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Method not allowed' }); }
  const body = req.body || {};
  if (body.website) return send(res, 200, { ok: true, redirect: '/meditation-thank-you.html' });
  const email = String(body.email || '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { error: 'Please enter a valid email address.' });
  if (body.consent !== true) return send(res, 400, { error: 'Please confirm that you want the meditation email.' });
  const name = String(body.first_name || '').trim().slice(0, 100);
  let row;
  try {
    if (!process.env.BREVO_API_KEY) throw new Error('Email unavailable');
    const ip = String(req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
    const ipHash = crypto.createHmac('sha256', process.env.SUPABASE_SERVICE_ROLE_KEY || '').update(ip).digest('hex');
    const recent = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const prior = await db(`?email=eq.${encodeURIComponent(email)}&created_at=gte.${recent}&order=created_at.desc&limit=1`);
    if (prior.length) {
      if (prior[0].status === 'sent') return send(res, 200, { ok: true, already_requested: true, redirect: '/meditation-thank-you.html' });
      return send(res, 202, { ok: true, email_pending: true, redirect: '/meditation-thank-you.html?delivery=pending' });
    }
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const attempts = await db(`?metadata->>ip_hash=eq.${ipHash}&created_at=gte.${since}&select=id&limit=5`);
    if (attempts.length >= 5) { res.setHeader('Retry-After', '600'); return send(res, 429, { error: 'Please wait before requesting another meditation.' }); }
    // Daily unique key prevents parallel retries without changing the schema.
    const hash = crypto.createHash('sha256').update(`meditation:${email}:${new Date().toISOString().slice(0,10)}`).digest('hex');
    const id = `${hash.slice(0,8)}-${hash.slice(8,12)}-4${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`;
    const metadata = { submitted_via: 'coaching.paulcropper.com/api/meditation-optin', received_at: new Date().toISOString(), consent: true, consent_text: 'Email me this meditation and save my email for meditation follow-up.', ip_hash: ipHash };
    try { [row] = await db('', 'POST', { id, email, first_name: name || null, status: 'sending', metadata }); }
    catch (error) { if (error.status === 409) return send(res, 202, { ok: true, email_pending: true, redirect: '/meditation-thank-you.html?delivery=pending' }); throw error; }
    const contact = await upsertContact({ email, name, listKeys: ['meditationOptins'] });
    if (contact?.skipped) throw new Error('Contact unavailable');
    const delivered = await sendEmail({ to: { email, name: name || undefined }, ...meditationDeliveryEmail({ name }), tags: ['meditation-delivery'] });
    if (!delivered?.messageId) throw new Error('Email unavailable');
    await db(`?id=eq.${row.id}`, 'PATCH', { status: 'sent', metadata: { ...metadata, provider_message_id: delivered.messageId, sent_at: new Date().toISOString() } });
    return send(res, 200, { ok: true, id: row.id, redirect: '/meditation-thank-you.html' });
  } catch (error) {
    if (row) {
      // Ambiguous sends must not trigger duplicate emails; immediate access remains available.
      try { await db(`?id=eq.${row.id}&status=eq.sending`, 'PATCH', { status: 'delivery_pending' }); } catch {}
      return send(res, 202, { ok: true, email_pending: true, redirect: '/meditation-thank-you.html?delivery=pending' });
    }
    return send(res, 503, { error: 'We could not save your request. Please try later or contact Paul.' });
  }
};
