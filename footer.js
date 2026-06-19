document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('site-footer').innerHTML = `
    <footer class="w3-container w3-padding-32 w3-theme-d1 w3-center">
      <a class="w3-button w3-large" href="https://twitter.com/teamaxe" title="Twitter"><i class="fa-brands fa-twitter"></i></a>
      <a class="w3-button w3-large w3-hide-small" href="https://www.linkedin.com/in/thomas-mitchell-72172013/" title="Linkedin"><i class="fa-brands fa-linkedin"></i></a>
      <a class="w3-button w3-large w3-hide-small" href="https://bsky.app/profile/teamaxe.bsky.social" title="Bluesky"><i class="fa-brands fa-bluesky"></i></a>
      <div style="position:relative;bottom:100px;z-index:1;" class="w3-tooltip w3-right">
        <span class="w3-text w3-padding w3-teal w3-hide-small">Go To Top</span>
        <a class="w3-button w3-theme" href="#myPage"><span class="w3-xlarge"><i class="fa fa-chevron-circle-up"></i></span></a>
      </div>
    </footer>
  `;
});
