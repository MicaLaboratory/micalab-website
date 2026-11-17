// Standard / Easy Read switch for the values page. /values/#easy-read opens the Easy Read version.
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.vswitch button');

  function show(name, updateUrl) {
    document.querySelectorAll('.version').forEach(function (v) {
      v.hidden = v.id !== 'v-' + name;
    });
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.show === name ? 'true' : 'false');
    });
    if (updateUrl) {
      history.replaceState(null, '', name === 'easy-read' ? '#easy-read' : location.pathname);
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { show(b.dataset.show, true); });
  });
  window.addEventListener('hashchange', function () {
    if (location.hash === '#easy-read') show('easy-read', false);
  });

  show(location.hash === '#easy-read' ? 'easy-read' : 'standard', false);
});
