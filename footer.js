document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('site-footer').innerHTML = `
    <footer class="site-footer">
      <div class="wrap row">
        <a href="https://www.uwe.ac.uk/"><img class="uwe" src="/images/logos/uwe-bristol.svg" alt="UWE Bristol"></a>
        <a href="/"><img class="mark" src="/images/logos/mica-lab-grey.svg" alt="mica lab home"></a>
        <span class="social">
          <a href="https://x.com/teamaxe" aria-label="X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
          <a href="https://www.linkedin.com/in/thomas-mitchell-72172013/" aria-label="LinkedIn"><i class="fa-brands fa-linkedin" aria-hidden="true"></i></a>
          <a href="https://bsky.app/profile/teamaxe.bsky.social" aria-label="Bluesky"><i class="fa-brands fa-bluesky" aria-hidden="true"></i></a>
        </span>
        <span class="partners">
          <a href="https://www.ukri.org/"><img src="/images/logos/ukri-grey.svg" alt="UK Research and Innovation"></a>
          <a href="https://www.uwe.ac.uk/research/centres-and-groups/cate-research-overview/the-bridge-studios"><img src="/images/logos/bridge-studios-grey.svg" alt="The Bridge Studios"></a>
        </span>
      </div>
    </footer>
  `;
});
