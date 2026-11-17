// Landing-page previews. Each <div data-from="/page/" data-pick="a b"> is filled with
// copies of the elements marked data-preview="a", data-preview="b" on that page,
// so the previews follow the pages without being edited by hand.
// Optional: data-limit="3" data-items=".srow" keeps only the first 3 items;
// data-drop=".x, .y" removes elements from the copy.
// If loading fails, the fallback text already inside the div stays.
document.addEventListener('DOMContentLoaded', function () {
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

  // A copied h1 would be a second h1 on the landing page, so step headings down a level
  function demoteHeadings(root) {
    root.querySelectorAll('h1, h2, h3, h4, h5').forEach(function (h) {
      const n = document.createElement('h' + (Number(h.tagName[1]) + 1));
      [...h.attributes].forEach(function (a) { n.setAttribute(a.name, a.value); });
      n.innerHTML = h.innerHTML;
      h.replaceWith(n);
    });
  }

  document.querySelectorAll('[data-from]').forEach(function (box) {
    load(box.dataset.from).then(function (doc) {
      const frag = document.createDocumentFragment();
      box.dataset.pick.split(' ').forEach(function (key) {
        const src = doc.querySelector('[data-preview="' + key + '"]');
        if (!src) return;
        const el = document.importNode(src, true);
        el.removeAttribute('data-preview');
        el.classList.remove('wrap'); // the landing section already has its own .wrap
        frag.appendChild(el);
      });
      if (!frag.childNodes.length) return;

      if (box.dataset.items) {
        const items = frag.querySelectorAll(box.dataset.items);
        const total = items.length;
        items.forEach(function (it, i) { if (i >= Number(box.dataset.limit)) it.remove(); });
        const count = box.parentNode.querySelector('[data-count]');
        if (count) count.textContent = total;
      }
      if (box.dataset.drop) frag.querySelectorAll(box.dataset.drop).forEach(function (el) { el.remove(); });
      demoteHeadings(frag);

      box.replaceChildren(frag);
      box.classList.add('loaded');
    }).catch(function () { /* keep the fallback text */ });
  });
});
