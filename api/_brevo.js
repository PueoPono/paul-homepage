const BREVO_BASE = 'https://api.brevo.com/v3';

const LIST_NAMES = {
  coachingLeads: 'Coaching Leads',
  coachingClients: 'Coaching Clients',
  meditationOptins: 'Meditation Opt-ins',
  siteAdminNotifications: 'Site Admin Notifications',
  masculineHeartQuest: 'Masculine Heart Quest',
};

function brevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY);
}

function sender() {
  return {
    name: process.env.BREVO_SENDER_NAME || 'Paul Cropper',
    email: process.env.BREVO_SENDER_EMAIL || 'hello@paulcropper.com',
  };
}

function adminEmail() {
  return process.env.BREVO_ADMIN_EMAIL || process.env.BREVO_SENDER_EMAIL || 'hello@paulcropper.com';
}

async function brevoFetch(path, options = {}) {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error('Brevo is not configured.');
  const response = await fetch(`${BREVO_BASE}${path}`, {
    ...options,
    headers: {
      'api-key': key,
      accept: 'application/json',
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) {
    const error = new Error((data && (data.message || data.error)) || `Brevo HTTP ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

async function findOrCreateFolder(name = 'Paul Cropper Site') {
  const folders = await brevoFetch('/contacts/folders?limit=50&offset=0');
  const existing = (folders.folders || []).find((folder) => String(folder.name || '').toLowerCase() === name.toLowerCase());
  if (existing) return existing.id;
  const created = await brevoFetch('/contacts/folders', { method: 'POST', body: JSON.stringify({ name }) });
  return created.id;
}

async function findOrCreateList(name) {
  const lists = await brevoFetch('/contacts/lists?limit=50&offset=0');
  const existing = (lists.lists || []).find((list) => String(list.name || '').toLowerCase() === name.toLowerCase());
  if (existing) return existing.id;
  const folderId = await findOrCreateFolder();
  const created = await brevoFetch('/contacts/lists', { method: 'POST', body: JSON.stringify({ name, folderId }) });
  return created.id;
}

async function listIdsFor(keys = []) {
  const names = keys.map((key) => LIST_NAMES[key] || key).filter(Boolean);
  const ids = [];
  for (const name of names) ids.push(await findOrCreateList(name));
  return ids;
}

function nameAttributes(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return {};
  const parts = trimmed.split(/\s+/);
  return {
    FIRSTNAME: parts[0] || trimmed,
    LASTNAME: parts.length > 1 ? parts.slice(1).join(' ') : undefined,
  };
}

async function upsertContact({ email, name, listKeys = [], attributes = {} }) {
  if (!brevoConfigured() || !email) return { skipped: true };
  const listIds = await listIdsFor(listKeys);
  const attrs = { ...nameAttributes(name), ...attributes };
  Object.keys(attrs).forEach((key) => attrs[key] === undefined && delete attrs[key]);
  return brevoFetch('/contacts', {
    method: 'POST',
    body: JSON.stringify({ email, attributes: attrs, listIds, updateEnabled: true }),
  });
}

async function sendEmail({ to, subject, htmlContent, textContent, replyTo, tags = [] }) {
  if (!brevoConfigured()) return { skipped: true };
  const recipients = Array.isArray(to) ? to : [to];
  return brevoFetch('/smtp/email', {
    method: 'POST',
    body: JSON.stringify({
      sender: sender(),
      to: recipients.map((item) => typeof item === 'string' ? { email: item } : item),
      replyTo: replyTo || sender(),
      subject,
      htmlContent,
      textContent,
      tags,
    }),
  });
}

function shell(content) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
  body{margin:0;background:#07101f;color:#172033;font-family:Georgia,'Times New Roman',serif}.wrap{max-width:680px;margin:0 auto;background:#fbf7ef}.hero{background:linear-gradient(145deg,#07101f,#10233c);color:#f7e7bf;padding:44px 36px;text-align:center}.eyebrow{letter-spacing:.18em;text-transform:uppercase;font:700 12px Arial,sans-serif;color:#d8b66a}.hero h1{margin:14px 0 0;font-size:34px;line-height:1.1}.content{padding:36px;color:#233047;font-size:17px;line-height:1.68}.card{border:1px solid #d7bf83;background:#fffaf0;border-radius:18px;padding:22px;margin:28px 0}.button{display:inline-block;background:#c99b33;color:#07101f!important;text-decoration:none;padding:14px 22px;border-radius:999px;font:700 13px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}.footer{padding:26px 36px;background:#091425;color:#c9d3df;font:13px Arial,sans-serif;line-height:1.6}</style></head><body><div class="wrap">${content}</div></body></html>`;
}

function coachingWelcomeEmail({ name = '', plan = 'one_pay' } = {}) {
  const first = String(name || '').trim().split(/\s+/)[0] || 'friend';
  const planLine = plan === 'three_pay' ? 'Your three-payment coaching collaboration has begun.' : 'Your 1-1 coaching collaboration has begun.';
  const htmlContent = shell(`<section class="hero"><div class="eyebrow">Integrated Lifestyle Coaching</div><h1>Welcome to the 1-1 Coaching Collaboration</h1></section><section class="content"><p>Hi ${escapeHtml(first)},</p><p>Welcome. I’m honored to begin this work with you.</p><p>${planLine} This is a focused, personal container for becoming more honest, grounded, vital, and connected — in the body, the heart, and the life you are actually living.</p><div class="card"><p><strong>What happens next:</strong></p><p>I’ll follow up personally with the next step for scheduling and orientation. For now, simply notice that the commitment has been made. That matters.</p><p>Come as you are. We’ll begin from the truth of where you are, and we’ll move with care, strength, and precision from there.</p></div><p>With respect,<br>Paul</p><p><a class="button" href="https://calendly.com/paulcropper/coachingcall">Schedule or confirm a call</a></p></section><section class="footer">Paul Cropper · Integrated Heart & Vitality Coaching<br><a style="color:#f7e7bf" href="mailto:hello@paulcropper.com">hello@paulcropper.com</a></section>`);
  const textContent = `Hi ${first},\n\nWelcome. I’m honored to begin this work with you.\n\n${planLine} This is a focused, personal container for becoming more honest, grounded, vital, and connected — in the body, the heart, and the life you are actually living.\n\nI’ll follow up personally with the next step for scheduling and orientation. Come as you are. We’ll begin from the truth of where you are.\n\nWith respect,\nPaul`;
  return { subject: 'Welcome to your 1-1 coaching collaboration', htmlContent, textContent };
}

function meditationDeliveryEmail({ name = '' } = {}) {
  const first = String(name || '').trim().split(/\s+/)[0] || 'friend';
  const htmlContent = shell(`<section class="hero"><div class="eyebrow">Guided Meditation</div><h1>Your meditation is ready</h1></section><section class="content"><p>Hi ${escapeHtml(first)},</p><p>Here is a simple place to begin: settle the body, soften the noise, and return to the heart.</p><p><a class="button" href="https://coaching.paulcropper.com/meditation-thank-you.html">Open the meditation</a></p><p>Use it when you need steadiness, breath, and a return to yourself.</p><p>Warmly,<br>Paul</p></section><section class="footer">Paul Cropper · Integrated Heart & Vitality Coaching</section>`);
  return { subject: 'Your guided meditation is ready', htmlContent, textContent: `Hi ${first},\n\nYour guided meditation is ready: https://coaching.paulcropper.com/meditation-thank-you.html\n\nWarmly,\nPaul` };
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

module.exports = {
  LIST_NAMES,
  adminEmail,
  brevoConfigured,
  sendEmail,
  upsertContact,
  coachingWelcomeEmail,
  meditationDeliveryEmail,
  listIdsFor,
};
