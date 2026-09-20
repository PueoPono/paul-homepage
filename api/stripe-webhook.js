const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.statusCode = 405;
    return res.end('Method not allowed');
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret) {
    res.statusCode = 500;
    return res.end('Stripe webhook not configured');
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers['stripe-signature'];
  if (!verifyStripeSignature(rawBody, signature, webhookSecret)) {
    res.statusCode = 400;
    return res.end('Invalid signature');
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch (_) {
    res.statusCode = 400;
    return res.end('Invalid JSON');
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data && event.data.object;
      if (session && session.mode === 'subscription' && session.subscription && session.metadata && session.metadata.plan === 'three_pay') {
        const cancelAt = Math.floor(Date.now() / 1000) + 75 * 24 * 60 * 60;
        const params = new URLSearchParams();
        params.set('cancel_at', String(cancelAt));
        params.set('metadata[auto_cancel_after_payments]', '3');
        params.set('metadata[program]', 'Coaching Startup Collaboration');
        await fetch(`https://api.stripe.com/v1/subscriptions/${encodeURIComponent(session.subscription)}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${stripeKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
      }
    }
    res.statusCode = 200;
    return res.end(JSON.stringify({ received: true }));
  } catch (error) {
    console.error('Stripe webhook handling failed', error);
    res.statusCode = 500;
    return res.end('Webhook handling failed');
  }
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function verifyStripeSignature(payload, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const parts = String(signatureHeader).split(',').reduce((acc, item) => {
    const [key, value] = item.split('=');
    if (!acc[key]) acc[key] = [];
    acc[key].push(value);
    return acc;
  }, {});
  const timestamp = parts.t && parts.t[0];
  const signatures = parts.v1 || [];
  if (!timestamp || !signatures.length) return false;
  const signedPayload = `${timestamp}.${payload.toString('utf8')}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
  return signatures.some((sig) => safeCompare(sig, expected));
}

function safeCompare(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}
