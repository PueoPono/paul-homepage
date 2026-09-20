(function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactFormStatus');
  if (!form || !status) return;

  const API_ENDPOINT = window.CONTACT_FORM_ENDPOINT || '/api/submit-contact-message';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const message = document.getElementById('message')?.value?.trim() || '';

    if (!email || !message) {
      status.textContent = 'Please add your email and message.';
      return;
    }

    status.textContent = 'Sending your message…';

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, source_url: window.location.href }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || 'Message submit failed');
      form.reset();
      status.textContent = 'Message sent. Thank you — Paul will follow up directly.';
    } catch (error) {
      console.error(error);
      status.textContent = 'Something went wrong sending your message. Please email Paul directly.';
    }
  });
})();
