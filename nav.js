document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('site-nav').innerHTML = `
    <div class="w3-top">
      <div class="w3-bar w3-theme-d2 w3-left-align">
        <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-theme-d2" href="javascript:void(0);" onclick="openNav()" aria-label="Menu"><i class="fa fa-bars"></i></a>
        <a href="/" class="w3-bar-item w3-button nav-logo"><img src="/images/micalogos/colour.svg" alt="MICA Lab home"></a>
        <a href="/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Join Us!</a>
        <a href="/outside-in/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Outside-In</a>
        <a href="/people/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">People</a>
        <a href="/publications/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Publications</a>
        <a href="/contact/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Contact</a>
      </div>
      <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium">
        <a href="/" class="w3-bar-item w3-button">Join Us!</a>
        <a href="/outside-in/" class="w3-bar-item w3-button">Outside-In</a>
        <a href="/people/" class="w3-bar-item w3-button">People</a>
        <a href="/publications/" class="w3-bar-item w3-button">Publications</a>
        <a href="/contact/" class="w3-bar-item w3-button">Contact</a>
      </div>
    </div>
  `;

  const path = window.location.pathname;
  document.querySelectorAll('#site-nav .w3-bar a.w3-bar-item[href]').forEach(function (link) {
    if (link.querySelector('img')) return;
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('nav-active');
    }
  });
});

function openNav() {
  var x = document.getElementById('navDemo');
  if (x.className.indexOf('w3-show') == -1) {
    x.className += ' w3-show';
  } else {
    x.className = x.className.replace(' w3-show', '');
  }
}
