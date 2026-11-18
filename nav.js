document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('site-nav').innerHTML = `
    <nav class="nav" aria-label="Main">
      <div class="wrap bar">
        <a class="logo" href="/"><img src="/images/logos/mica-lab-grey.svg" alt="mica lab home"></a>
        <button class="menu" aria-expanded="false" aria-controls="nav-links" aria-label="Menu"><i class="fa fa-bars" aria-hidden="true"></i></button>
        <ul id="nav-links">
          <li><a href="/projects/">Projects</a></li>
          <li><a href="/people/">People</a></li>
          <li><a href="/publications/">Publications</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
    </nav>
  `;

  const path = window.location.pathname;
  document.querySelectorAll('#nav-links a').forEach(function (link) {
    if (path.startsWith(link.getAttribute('href'))) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const nav = document.querySelector('#site-nav .nav');
  const button = nav.querySelector('.menu');
  button.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
