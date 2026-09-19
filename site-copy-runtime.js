(() => {
  const COPY_PATH = '/site-copy.json';
  const DRAFT_KEY = 'paul-coaching-site-copy-admin-draft';
  const params = new URLSearchParams(window.location.search);
  const pageFile = (location.pathname.split('/').pop() || 'index.html').replace(/^$/, 'index.html');
  const normalize = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const shouldSkip = (node) => {
    const parent = node.parentElement;
    if (!parent) return true;
    return ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT'].includes(parent.tagName) || !!parent.closest('[data-copy-admin-root]');
  };
  const preserveReplace = (raw, next) => `${raw.match(/^\s*/)?.[0] || ''}${next}${raw.match(/\s*$/)?.[0] || ''}`;
  function applyEntries(entries) {
    const textEntries = entries.filter((entry) => entry.kind === 'text' && entry.value !== entry.original);
    if (textEntries.length) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (shouldSkip(node)) return NodeFilter.FILTER_REJECT;
          return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        const match = textEntries.find((entry) => normalize(node.nodeValue) === normalize(entry.original));
        if (match) node.nodeValue = preserveReplace(node.nodeValue, match.value);
      }
    }
    for (const entry of entries.filter((entry) => entry.kind === 'attribute' && entry.value !== entry.original)) {
      document.querySelectorAll(`[${entry.attribute}]`).forEach((el) => {
        if (normalize(el.getAttribute(entry.attribute)) === normalize(entry.original)) el.setAttribute(entry.attribute, entry.value);
      });
    }
    for (const entry of entries.filter((entry) => entry.kind === 'meta' && entry.value !== entry.original)) {
      const el = document.querySelector(`meta[name="${CSS.escape(entry.name)}"], meta[property="${CSS.escape(entry.name)}"]`);
      if (el) el.setAttribute('content', entry.value);
    }
    document.documentElement.dataset.copyRuntime = 'loaded';
  }
  async function loadCopy() {
    try {
      let data = null;
      if (params.get('site-copy-draft') === 'local') {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (raw) data = JSON.parse(raw);
      }
      if (!data) {
        const res = await fetch(`${COPY_PATH}?v=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) data = await res.json();
      }
      const page = data?.pages?.[pageFile] || data?.pages?.['index.html'];
      if (page?.entries) applyEntries(page.entries);
    } catch (error) {
      console.warn('[site-copy-runtime] Copy load failed', error);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadCopy);
  else loadCopy();
})();
