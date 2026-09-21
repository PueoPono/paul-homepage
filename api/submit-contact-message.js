const { adminEmail, sendEmail, upsertContact } = require('./_brevo');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function send(res, status, body) {
  setCors(res);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function insertRow(table, payload) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) throw new Error('Supabase environment is not configured.');
  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  if (!response.ok) {
    const err = new Error(text || `Supabase HTTP ${response.status}`);
    err.status = response.status;
    throw err;
  }
  try { return JSON.parse(text)?.[0] || null; } catch { return null; }
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') { setCors(res); res.statusCode = 204; return res.end(); }
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Method not allowed' }); }
  try {
    const body = req.body || {};
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    if (!email || !message) return send(res, 400, { error: 'Email and message are required.' });
    const name = String(body.name || '').trim();
    const sourceUrl = String(body.source_url || '');
    const row = await insertRow('coaching_contact_messages', {
      name: name || null,
      email,
      message,
      source_url: sourceUrl,
      status: 'new',
      metadata: { submitted_via: 'coaching.paulcropper.com/api/submit-contact-message', received_at: new Date().toISOString() },
    });
    await upsertContact({ email, name, listKeys: ['coachingLeads'] });
    await sendEmail({
      to: adminEmail(),
      subject: 'New coaching website message',
      htmlContent: `<p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Source:</strong> ${escapeHtml(sourceUrl)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      textContent: `New coaching website message\n\nName: ${name || 'Not provided'}\nEmail: ${email}\nSource: ${sourceUrl}\n\n${message}`,
      replyTo: { email, name: name || undefined },
      tags: ['coaching-admin-notification'],
    });
    return send(res, 200, { ok: true, id: row?.id || null });
  } catch (error) {
    return send(res, error.status || 500, { error: error.message || 'Submit failed' });
  }
};

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
