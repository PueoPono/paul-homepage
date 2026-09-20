const TABLE = 'coaching_page_update_requests';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function normalizePayload(body) {
  const metadata = body && typeof body.metadata === 'object' && !Array.isArray(body.metadata) ? body.metadata : {};
  return {
    source: 'coaching-site-editor',
    source_url: String(body?.source_url || ''),
    page_label: String(body?.page_label || ''),
    status: 'new',
    request_markdown: String(body?.request_markdown || ''),
    old_json: body?.old_json && typeof body.old_json === 'object' ? body.old_json : null,
    old_json_text: body?.old_json_text ? String(body.old_json_text) : null,
    metadata: {
      ...metadata,
      submitted_via: 'coaching.paulcropper.com/api/submit-coaching-update-request',
      received_at: new Date().toISOString(),
    },
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed' });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return send(res, 500, { error: 'Supabase environment is not configured.' });
    }

    const payload = normalizePayload(req.body || {});
    if (!payload.request_markdown.trim() && !payload.old_json && !payload.old_json_text) {
      return send(res, 400, { error: 'Add edits or paste old JSON before submitting.' });
    }

    const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${TABLE}`;
    const response = await fetch(endpoint, {
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
      return send(res, response.status, { error: text || `Supabase HTTP ${response.status}` });
    }

    let row = null;
    try {
      row = JSON.parse(text)?.[0] || null;
    } catch {}

    return send(res, 200, { ok: true, id: row?.id || null });
  } catch (error) {
    return send(res, 500, { error: error.message || 'Submit failed' });
  }
};
