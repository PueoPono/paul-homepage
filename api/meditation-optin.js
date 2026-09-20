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
    if (!email) return send(res, 400, { error: 'Email is required.' });
    const row = await insertRow('coaching_meditation_optins', {
      first_name: String(body.first_name || '').trim() || null,
      email,
      status: 'new',
      metadata: { submitted_via: 'coaching.paulcropper.com/api/meditation-optin', received_at: new Date().toISOString() },
    });
    return send(res, 200, { ok: true, id: row?.id || null, redirect: '/meditation-thank-you.html' });
  } catch (error) {
    return send(res, error.status || 500, { error: error.message || 'Submit failed' });
  }
};
