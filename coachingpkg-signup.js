(function () {
  const form = document.getElementById('coachingSignupForm');
  const status = document.getElementById('signupStatus');
  const terms = document.getElementById('termsAccepted');
  const venmo = document.getElementById('venmoButton');
  if (!form || !status || !terms || !venmo) return;

  const planAmounts = {
    one_pay: { amount: '3450', note: 'Coaching Startup Collaboration - one payment' },
    three_pay: { amount: '1250', note: 'Coaching Startup Collaboration - first of 3 payments' },
  };

  function selectedPlan() {
    return form.querySelector('input[name="plan"]:checked')?.value || 'one_pay';
  }

  function venmoUrl() {
    const plan = planAmounts[selectedPlan()];
    const note = encodeURIComponent(plan.note);
    const web = `https://venmo.com/Paul-Cropper?txn=pay&amount=${plan.amount}&note=${note}`;
    const app = `venmo://paycharge?txn=pay&recipients=Paul-Cropper&amount=${plan.amount}&note=${note}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isMobile ? app : web;
  }

  function updatePaymentState() {
    const accepted = terms.checked;
    const plan = selectedPlan();
    if (plan === 'three_pay') {
      venmo.hidden = true;
      venmo.style.display = 'none';
      venmo.href = '#full-payment-only';
      venmo.classList.add('payment-button--disabled');
      status.textContent = accepted
        ? 'Ready for Stripe checkout. Your card will be charged monthly for 3 payments.'
        : 'Check the terms box to activate Stripe checkout.';
      return;
    }

    venmo.hidden = false;
    venmo.style.display = '';
    venmo.href = accepted ? venmoUrl() : '#terms';
    venmo.classList.toggle('payment-button--disabled', !accepted);
    status.textContent = accepted ? 'Ready for payment.' : 'Check the terms box to activate payment links.';
  }

  form.addEventListener('change', updatePaymentState);
  terms.addEventListener('change', updatePaymentState);

  venmo.addEventListener('click', (event) => {
    if (!terms.checked) {
      event.preventDefault();
      status.textContent = 'Please agree to the Terms and Conditions first.';
      terms.focus();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!terms.checked) {
      status.textContent = 'Please agree to the Terms and Conditions first.';
      terms.focus();
      return;
    }

    const email = document.getElementById('signupEmail')?.value?.trim() || '';
    const name = document.getElementById('signupName')?.value?.trim() || '';
    const plan = selectedPlan();
    if (!email) {
      status.textContent = 'Please add your email.';
      return;
    }

    status.textContent = 'Opening secure Stripe checkout…';
    try {
      const response = await fetch('/api/create-coaching-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, plan, termsAccepted: true, source_url: window.location.href }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) throw new Error(data.error || 'Unable to start checkout.');
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      status.textContent = error.message || 'Unable to start checkout. Please try Venmo or contact Paul.';
    }
  });

  updatePaymentState();
})();
