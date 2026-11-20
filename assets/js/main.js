// Shared behaviour for every page: Lean highlighting, scroll reveal, publication count and the footer year.
(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Lean highlighting */
  const LEAN_TOKENS = new RegExp(
    [
      "(--[^\\n]*)",
      "\\b(sorry)\\b",
      "\\b(theorem|lemma|def|by|fun|refine|exact|intro|obtain|have|show|let|letI|classical|in|where|with|match|Type|Prop)\\b",
      "([∀∃¬→↔∧∨≤≥≠⟨⟩↦≃∩∪⊆∈⊢∘↪<|]+|:=)",
      "\\b(\\d+)\\b",
      "([ℕℤℝ]|\\b[A-Z][a-z][A-Za-z0-9_']*(?:\\.[A-Za-z0-9_']+)*)",
    ].join("|"),
    "gu"
  );
  const TOKEN_CLASS = ["tok-com", "tok-sorry", "tok-kw", "tok-sym", "tok-num", "tok-ty"];
  function highlightLean(src) {
    let out = "";
    let last = 0;
    src.replace(LEAN_TOKENS, (m, ...groups) => {
      const offset = groups[groups.length - 2];
      out += esc(src.slice(last, offset));
      const idx = groups.slice(0, TOKEN_CLASS.length).findIndex((g) => g !== undefined);
      out += `<span class="${TOKEN_CLASS[idx]}">${esc(m)}</span>`;
      last = offset + m.length;
      return m;
    });
    return out + esc(src.slice(last));
  }
  $$("[data-lean]").forEach((el) => { el.innerHTML = highlightLean(el.textContent); });

  /* gentle reveal on scroll */
  const items = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
  } else {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        reveal.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => reveal.observe(el));
  }

  /* publication count: the home page counts the papers listed on publications.html.
     The number in the HTML is the fallback if that page cannot be fetched. */
  const pubCounters = $$("[data-pub-count]");
  if (pubCounters.length && "fetch" in window) {
    fetch("publications.html", { cache: "no-cache" })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status))))
      .then((page) => {
        const doc = new DOMParser().parseFromString(page, "text/html");
        const n = doc.querySelectorAll("#papers + .pubs > .pub").length;
        if (n > 0) pubCounters.forEach((el) => { el.textContent = n; });
      })
      .catch(() => {});
  }

  /* footer year */
  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
