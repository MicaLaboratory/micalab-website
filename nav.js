document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('site-nav').innerHTML = `
    <nav class="w3-sidebar w3-bar-block w3-white w3-card w3-animate-left w3-xxlarge" style="display:none;z-index:2" id="mySidebar">
      <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-display-topright w3-text-teal">Close
        <i class="fa fa-remove"></i>
      </a>
      <a href="/" class="w3-bar-item w3-button">Join Us!</a>
      <a href="/outside-in/" class="w3-bar-item w3-button">Outside-In</a>
      <a href="/people/" class="w3-bar-item w3-button">People</a>
      <a href="/partners/" class="w3-bar-item w3-button">Partners</a>
      <a href="/publications/" class="w3-bar-item w3-button">Publications</a>
      <a href="/contact/" class="w3-bar-item w3-button">Contact</a>
    </nav>

    <div class="w3-top">
      <div class="w3-bar w3-theme-d2 w3-left-align">
        <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-hover-white w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
        <a href="/" class="w3-bar-item w3-button"><img src="/images/micalogos/white.svg" alt="MICA Lab" style="height:30px;vertical-align:middle;"></a>
        <a href="/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Join Us!</a>
        <a href="/outside-in/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Outside-In</a>
        <a href="/people/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">People</a>
        <a href="/partners/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Partners</a>
        <a href="/publications/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Publications</a>
        <a href="/contact/" class="w3-bar-item w3-button w3-hide-small w3-hover-white">Contact</a>
      </div>
      <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium">
        <a href="/" class="w3-bar-item w3-button">Join Us!</a>
        <a href="/outside-in/" class="w3-bar-item w3-button">Outside-In</a>
        <a href="/people/" class="w3-bar-item w3-button">People</a>
        <a href="/partners/" class="w3-bar-item w3-button">Partners</a>
        <a href="/publications/" class="w3-bar-item w3-button">Publications</a>
        <a href="/contact/" class="w3-bar-item w3-button">Contact</a>
      </div>
    </div>
  `;
});

function w3_open() {
  var x = document.getElementById('mySidebar');
  x.style.width = '300px';
  x.style.paddingTop = '10%';
  x.style.display = 'block';
}

function w3_close() {
  document.getElementById('mySidebar').style.display = 'none';
}

function openNav() {
  var x = document.getElementById('navDemo');
  if (x.className.indexOf('w3-show') == -1) {
    x.className += ' w3-show';
  } else {
    x.className = x.className.replace(' w3-show', '');
  }
}
