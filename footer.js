document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('site-footer').innerHTML = `
    <footer class="site-footer">
      <a class="to-top" href="#myPage" title="Back to top" aria-label="Back to top"><i class="fa fa-chevron-up"></i></a>
      <div class="site-footer-inner">
        <a class="footer-logo" href="/"><img src="/images/micalogos/colour.svg" alt="MICA Lab home"></a>
        <div class="footer-partners">
          <a href="https://www.uwe.ac.uk/"><img class="uwe" src="/images/logos/uwe-bristol.svg" alt="UWE Bristol"></a>
          <a href="https://www.ukri.org/"><img src="/images/logos/ukri-white.svg" alt="UK Research and Innovation"></a>
          <a href="https://blogs.uwe.ac.uk/research-business-innovation/uwe-bristol-win-funding-to-deliver-the-bridge-a-creative-studio-for-physical-meta-production/"><img src="/images/logos/bridge-studios-white.svg" alt="The Bridge Studios"></a>
        </div>
        <div class="footer-social">
          <a href="https://x.com/teamaxe" title="X" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://www.linkedin.com/in/thomas-mitchell-72172013/" title="LinkedIn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
          <a href="https://bsky.app/profile/teamaxe.bsky.social" title="Bluesky" aria-label="Bluesky"><i class="fa-brands fa-bluesky"></i></a>
        </div>
      </div>
      <p class="footer-meta">Music Interaction and Computational Arts Lab &middot; UWE Bristol</p>
    </footer>
  `;
});
