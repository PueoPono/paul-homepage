(function () {
  const form = document.getElementById('meditationOptinForm');
  const status = document.getElementById('meditationFormStatus');
  if (!form || !status) return;

  const API_ENDPOINT = window.MEDITATION_OPTIN_ENDPOINT || 'https://masculineheart.vercel.app/api/meditation-optin';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstName = document.getElementById('first_name')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    if (!email) {
      status.textContent = 'Please enter your email.';
      return;
    }

    status.textContent = 'Saving your request…';

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: firstName || null,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Lead capture failed');
      }

      window.location.href = data.redirect || 'meditation-thank-you.html';
    } catch (error) {
      console.error(error);
      status.textContent = 'Something went wrong saving your request. Please try again or email Paul directly.';
    }
  });
})();
