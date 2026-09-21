const { sendEmail, upsertContact } = require('./_brevo');

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

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') { setCors(res); res.statusCode = 204; return res.end(); }
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'Method not allowed' }); }
  try {
    const body = req.body || {};
    const email = String(body.email || '').trim();
    const name = String(body.name || body.first_name || '').trim();
    if (!email) return send(res, 400, { error: 'Email is required.' });
    await upsertContact({ email, name, listKeys: ['masculineHeartQuest'] });
    await sendEmail({
      to: { email, name: name || undefined },
      subject: 'Welcome to Masculine Heart Quest',
      htmlContent: `<p>Hi ${escapeHtml(name.split(/\s+/)[0] || 'friend')},</p><p>Welcome to Masculine Heart Quest. This is a path of strength, heart, honesty, and grounded masculine development.</p><p>Paul will send the next steps as the course container opens.</p><p>With respect,<br>Paul</p>`,
      textContent: `Hi ${name.split(/\s+/)[0] || 'friend'},\n\nWelcome to Masculine Heart Quest. This is a path of strength, heart, honesty, and grounded masculine development.\n\nPaul will send the next steps as the course container opens.\n\nWith respect,\nPaul`,
      tags: ['masculine-heart-quest-welcome'],
    });
    return send(res, 200, { ok: true });
  } catch (error) {
    return send(res, error.status || 500, { error: error.message || 'Signup failed' });
  }
};

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
