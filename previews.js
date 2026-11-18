// Previews. Each <div data-from="/page/" data-pick="a b"> is filled with
// copies of the elements marked data-preview="a", data-preview="b" on that page,
// so the previews follow the pages without being edited by hand.
// Optional: data-items=".srow" picks out the items, then
//   data-match='[data-proj~="x"]' keeps only the items matching that selector, and
//   data-limit="3" keeps only the first 3;
// data-drop=".x, .y" removes elements from the copy;
// data-reveal=".x" un-hides elements in the copy.
// If loading fails, the fallback text already inside the div stays.
// fillPreviews(root) fills every data-from box inside root, including boxes
// that arrive inside a copy (the project pop-ups use this).
(function () {
  const pages = {};
  function load(url) {
    if (!pages[url]) {
      pages[url] = fetch(url).then(function (r) {
        if (!r.ok) throw new Error(url + ' ' + r.status);
        return r.text();
      }).then(function (html) {
        return new DOMParser().parseFromString(html, 'text/html');
      });
    }
    return pages[url];
  }

  // A copied h1 would be a second h1 on the page, so step headings down a level
  function demoteHeadings(root) {
    root.querySelectorAll('h1, h2, h3, h4, h5').forEach(function (h) {
      const n = document.createElement('h' + (Number(h.tagName[1]) + 1));
      [...h.attributes].forEach(function (a) { n.setAttribute(a.name, a.value); });
      n.innerHTML = h.innerHTML;
      h.replaceWith(n);
    });
  }

  function fill(box) {
    return load(box.dataset.from).then(function (doc) {
      const frag = document.createDocumentFragment();
      box.dataset.pick.split(' ').forEach(function (key) {
        const src = doc.querySelector('[data-preview="' + key + '"]');
        if (!src) return;
        const el = document.importNode(src, true);
        el.removeAttribute('data-preview');
        el.classList.remove('wrap'); // the receiving section already has its own .wrap
        frag.appendChild(el);
      });
      if (!frag.childNodes.length) return;

      if (box.dataset.items) {
        let items = [...frag.querySelectorAll(box.dataset.items)];
        const match = box.dataset.match;
        if (match) items = items.filter(function (it) {
          if (it.matches(match)) return true;
          it.remove();
          return false;
        });
        const limit = Number(box.dataset.limit) || items.length;
        items.forEach(function (it, i) { if (i >= limit) it.remove(); });
      }
      if (box.dataset.drop) frag.querySelectorAll(box.dataset.drop).forEach(function (el) { el.remove(); });
      if (box.dataset.reveal) frag.querySelectorAll(box.dataset.reveal).forEach(function (el) { el.hidden = false; });
      if (!('keepHeadings' in box.dataset)) demoteHeadings(frag);

      box.replaceChildren(frag);
      box.classList.add('loaded');
      return fillPreviews(box);
    }).catch(function () { /* keep the fallback text */ });
  }

  function fillPreviews(root) {
    return Promise.all([...root.querySelectorAll('[data-from]')].map(fill));
  }
  window.fillPreviews = fillPreviews;

  document.addEventListener('DOMContentLoaded', function () { fillPreviews(document); });
})();
