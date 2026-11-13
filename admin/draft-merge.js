/* Stable-ID, lossless draft hydration. Published defaults never replace pending edits. */
(function (root) {
  function mergeDraft(canonical, local) {
    const result = JSON.parse(JSON.stringify(canonical));
    for (const [key, savedPage] of Object.entries(local?.pages || {})) {
      if (!result.pages[key]) { result.pages[key] = savedPage; continue; }
      const entries = result.pages[key].entries;
      for (const saved of savedPage.entries || []) {
        const index = entries.findIndex(e => e.id === saved.id);
        if (index < 0) { entries.push(saved); continue; }
        const published = entries[index];
        // A value differing from its own saved baseline is a pending edit,
        // even when it deliberately restores an older published phrase.
        const unchanged = saved.value === saved.original || saved.value === published.value;
        if (!unchanged) entries[index] = { ...published, value: saved.value };
      }
    }
    return result;
  }
  if (typeof module !== 'undefined') module.exports = { mergeDraft };
  else root.mergeCoachingDraft = mergeDraft;
})(typeof window !== 'undefined' ? window : globalThis);
