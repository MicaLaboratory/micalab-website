// Project tiles (on /projects/ and in the landing page preview). Clicking a tile opens
// its project page in a pop-up instead of leaving the page: the project page's top
// blocks (data-preview head video about credits pubs) are copied in by previews.js,
// and the address changes to the project's URL so it can be shared or reloaded
// (which shows the full project page). Back, Escape, the close button and the
// backdrop all close it. "Read more" in the pop-up loads the full project page.
// Placeholder tiles (data-soon) open a short "coming soon" pop-up with no URL.
// Tiles can arrive after load (the landing preview), so clicks are handled on the document.
document.addEventListener('DOMContentLoaded', function () {
  const home = window.location.pathname; // the page with the tiles
  const dlg = document.querySelector('.pop');
  if (!dlg) return;
  const body = dlg.querySelector('.pop-body');
  let opener = null;

  function show(content, label) {
    body.replaceChildren(content);
    dlg.setAttribute('aria-label', label);
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }

  function openProject(url, name) {
    const box = document.createElement('div');
    box.dataset.from = url;
    box.dataset.pick = 'head video about credits pubs';
    box.dataset.drop = '.back';
    box.innerHTML = '<p class="pop-wait">Loading…</p>';
    show(box, name);
    fillPreviews(body).then(function () {
      // If the page could not be loaded, go to it instead
      if (!box.classList.contains('loaded')) window.location.href = url;
    });
  }

  function openSoon(name) {
    const box = document.createElement('div');
    box.className = 'pop-soon';
    const h = document.createElement('h2');
    h.textContent = name;
    const p = document.createElement('p');
    p.textContent = 'Details of this project are coming soon.';
    box.append(h, p);
    show(box, name);
  }

  document.addEventListener('click', function (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let new-tab clicks through

    // The pop-up has already put the project's URL in the address bar, so a plain
    // link to it would only scroll this page. Reset the address, then load it.
    const more = e.target.closest('.pop .readmore');
    if (more) {
      e.preventDefault();
      history.replaceState(null, '', home);
      window.location.href = more.href;
      return;
    }

    const tile = e.target.closest('.ptile');
    if (!tile) return;
    e.preventDefault();
    opener = tile;
    const name = tile.querySelector('.pname').textContent;
    if (tile.hasAttribute('data-soon')) return openSoon(name);
    const url = tile.getAttribute('href');
    history.pushState({ project: url, name: name }, '', url);
    openProject(url, name);
  });

  dlg.querySelector('.pop-close').addEventListener('click', function () { dlg.close(); });
  // Close when the backdrop (outside the panel) is clicked
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  dlg.addEventListener('close', function () {
    body.replaceChildren(); // stops the video and audio
    if (window.location.pathname !== home) {
      if (history.state && history.state.project) history.back();
      else history.replaceState(null, '', home);
    }
    if (opener && opener.isConnected) opener.focus();
  });

  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.project) openProject(e.state.project, e.state.name);
    else if (dlg.open) dlg.close();
  });
});
