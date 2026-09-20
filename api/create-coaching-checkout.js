module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 204;
    return res.end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Stripe is not configured yet.' }));
    }

    const body = req.body || {};
    const plan = body.plan === 'three_pay' ? 'three_pay' : 'one_pay';
    const email = String(body.email || '').trim();
    const name = String(body.name || '').trim();
    const termsAccepted = body.termsAccepted === true || body.termsAccepted === 'true';
    if (!email || !termsAccepted) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Email and terms acceptance are required.' }));
    }

    const origin = getOrigin(req);
    const params = new URLSearchParams();
    params.set('success_url', `${origin}/coachingpkg-signup-thank-you.html?session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${origin}/coachingpkg-signup.html`);
    params.set('customer_email', email);
    params.set('client_reference_id', email);
    params.set('metadata[program]', 'Coaching Startup Collaboration');
    params.set('metadata[plan]', plan);
    params.set('metadata[terms_accepted]', 'true');
    params.set('metadata[name]', name);
    params.set('metadata[source_url]', String(body.source_url || ''));
    params.set('allow_promotion_codes', 'true');
    params.set('billing_address_collection', 'auto');

    if (plan === 'three_pay') {
      params.set('mode', 'subscription');
      params.set('line_items[0][quantity]', '1');
      params.set('line_items[0][price_data][currency]', 'usd');
      params.set('line_items[0][price_data][unit_amount]', '125000');
      params.set('line_items[0][price_data][recurring][interval]', 'month');
      params.set('line_items[0][price_data][product_data][name]', 'Coaching Startup Collaboration - 3 payments');
      params.set('line_items[0][price_data][product_data][description]', 'Three monthly payments of $1,250 for the Heart-Body-Mind coaching package.');
      params.set('subscription_data[metadata][program]', 'Coaching Startup Collaboration');
      params.set('subscription_data[metadata][installments]', '3');
      params.set('subscription_data[metadata][terms_accepted]', 'true');
      params.set('subscription_data[metadata][auto_cancel_after_payments]', '3');
    } else {
      params.set('mode', 'payment');
      params.set('line_items[0][quantity]', '1');
      params.set('line_items[0][price_data][currency]', 'usd');
      params.set('line_items[0][price_data][unit_amount]', '345000');
      params.set('line_items[0][price_data][product_data][name]', 'Coaching Startup Collaboration');
      params.set('line_items[0][price_data][product_data][description]', 'One payment for the Heart-Body-Mind coaching package.');
      params.set('payment_intent_data[metadata][program]', 'Coaching Startup Collaboration');
      params.set('payment_intent_data[metadata][terms_accepted]', 'true');
    }

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await stripeResponse.json();
    if (!stripeResponse.ok) {
      res.statusCode = stripeResponse.status;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: data?.error?.message || 'Stripe checkout failed.' }));
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ ok: true, url: data.url, id: data.id }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: error.message || 'Checkout failed.' }));
  }
};

function getOrigin(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'coaching.paulcropper.com';
  return `${proto}://${host}`;
}
