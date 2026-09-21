const { DEFAULT_SEQUENCES } = require('./_emailReviewDefaults');

const TABLE = 'email_review_sequences';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function send(res, status, body) {
  setCors(res);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase environment is not configured.');
  return { url: url.replace(/\/$/, ''), key };
}

async function supabaseRequest(path, options = {}) {
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }
  if (!response.ok) {
    const error = typeof data === 'string' ? data : JSON.stringify(data);
    const err = new Error(error || `Supabase HTTP ${response.status}`);
    err.status = response.status;
    err.payload = data;
    throw err;
  }
  return data;
}

function normalizeSequence(input, index = 0) {
  const key = String(input.sequence_key || input.key || input.title || `sequence-${Date.now()}-${index}`)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `sequence-${Date.now()}-${index}`;

  const messages = Array.isArray(input.messages) ? input.messages.map((message, messageIndex) => ({
    id: String(message.id || `${key}-message-${messageIndex + 1}`),
    title: String(message.title || `Message ${messageIndex + 1}`),
    timing: String(message.timing || 'Timing not set'),
    subject: String(message.subject || ''),
    preheader: String(message.preheader || ''),
    body: String(message.body || ''),
    cta_label: String(message.cta_label || ''),
    cta_url: String(message.cta_url || ''),
  })) : [];

  return {
    sequence_key: key,
    title: String(input.title || key),
    description: String(input.description || ''),
    category: String(input.category || 'General'),
    is_active: input.is_active !== false,
    sort_order: Number.isFinite(Number(input.sort_order)) ? Number(input.sort_order) : index * 10,
    messages,
  };
}

async function loadSequences() {
  try {
    const rows = await supabaseRequest(`${TABLE}?select=sequence_key,title,description,category,is_active,sort_order,messages,updated_at&order=sort_order.asc,title.asc`, {
      method: 'GET',
    });
    if (Array.isArray(rows) && rows.length) {
      return { source: 'supabase', sequences: rows };
    }
    const seeded = await saveSequences(DEFAULT_SEQUENCES);
    return { source: 'supabase-seeded', sequences: seeded };
  } catch (error) {
    if (error.status === 404 || String(error.message || '').includes('PGRST205') || String(error.message || '').includes(TABLE)) {
      return { source: 'defaults-missing-table', sequences: DEFAULT_SEQUENCES, warning: 'Supabase table is not available yet; showing seeded drafts.' };
    }
    throw error;
  }
}

async function saveSequences(sequences) {
  const normalized = sequences.map(normalizeSequence);
  const rows = normalized.map((sequence) => ({ ...sequence, updated_at: new Date().toISOString() }));
  const data = await supabaseRequest(TABLE, {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(rows),
  });
  return data;
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setCors(res);
    res.statusCode = 204;
    return res.end();
  }

  try {
    if (req.method === 'GET') {
      const payload = await loadSequences();
      return send(res, 200, { ok: true, ...payload });
    }

    if (req.method === 'POST') {
      const sequences = Array.isArray(req.body?.sequences) ? req.body.sequences : null;
      if (!sequences) return send(res, 400, { error: 'Expected { sequences: [...] }.' });
      const saved = await saveSequences(sequences);
      return send(res, 200, { ok: true, source: 'supabase', sequences: saved });
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return send(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    return send(res, error.status || 500, { error: error.message || 'Email review API failed' });
  }
};
