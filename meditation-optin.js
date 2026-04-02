(function () {
  const form = document.getElementById('meditationOptinForm');
  const status = document.getElementById('meditationFormStatus');
  if (!form || !status) return;

  const SUPABASE_URL = window.MEDITATION_SUPABASE_URL || '';
  const SUPABASE_ANON_KEY = window.MEDITATION_SUPABASE_ANON_KEY || '';

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
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/lead_submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            email,
            first_name: firstName || null,
            source_page: 'resources/meditation',
            lead_magnet_slug: 'guided-meditation',
            tags: ['website', 'meditation', 'lead-magnet'],
            status: 'new',
          }),
        });
        if (!response.ok) {
          throw new Error('Lead capture failed');
        }
      } else {
        console.warn('Supabase environment not configured for meditation opt-in yet.');
      }

      window.location.href = 'meditation-thank-you.html';
    } catch (error) {
      console.error(error);
      status.textContent = 'Something went wrong saving your request. Please try again or email Paul directly.';
    }
  });
})();
