const { sendEmail } = require('./_brevo');

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed' });
  }
  try {
    const token = req.headers['x-agent-email-token'];
    if (!process.env.AGENT_EMAIL_TOKEN || token !== process.env.AGENT_EMAIL_TOKEN) return send(res, 401, { error: 'Unauthorized' });
    const body = req.body || {};
    const to = body.to;
    const subject = String(body.subject || '').trim();
    const textContent = String(body.textContent || body.text || '').trim();
    const htmlContent = String(body.htmlContent || '').trim() || `<p>${escapeHtml(textContent).replace(/\n/g, '<br>')}</p>`;
    if (!to || !subject || !textContent) return send(res, 400, { error: 'to, subject, and textContent are required.' });
    const result = await sendEmail({ to, subject, htmlContent, textContent, tags: ['agent-send-email'] });
    return send(res, 200, { ok: true, messageId: result?.messageId || null });
  } catch (error) {
    return send(res, error.status || 500, { error: error.message || 'Email send failed' });
  }
};

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
