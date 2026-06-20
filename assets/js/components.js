/**
 * Shared UI components for the portfolio site.
 *
 * Usage – add to every page just before </body>:
 *   <script src="assets/js/components.js"></script>          (root pages)
 *   <script src="../assets/js/components.js"></script>       (project pages)
 *
 * Each page must declare a <meta name="current-page"> tag whose content is one
 * of: "home", "about", "work", "contact".  Project case-study pages should use
 * "work" so the Work nav link is highlighted.
 */

(function () {
  "use strict";

  var pathPrefix = (function () {
    var link = document.querySelector('link[rel="stylesheet"][href$="assets/css/styles.css"]');
    if (link) {
      var href = link.getAttribute("href");
      return href.indexOf("../") === 0 ? "../" : "";
    }
    return "";
  })();

  var currentPage =
    (document.querySelector('meta[name="current-page"]') || {}).content || "";

  function ariaCurrent(page) {
    return currentPage === page ? ' aria-current="page"' : "";
  }

  // ── Header ────────────────────────────────────────────────────────────
  var headerHTML =
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<header class="site-header">' +
    '  <nav class="nav" aria-label="Primary navigation">' +
    '    <a class="brand" href="' + pathPrefix + 'index.html" aria-label="Sebastian Quiroz Malca Alva home">' +
    '      <span class="brand-mark">SQ</span>' +
    '      <span>Sebastian Quiroz</span>' +
    '    </a>' +
    '    <ul class="nav-links">' +
    '      <li><a href="' + pathPrefix + 'index.html"' + ariaCurrent("home") + ">Home</a></li>" +
    '      <li><a href="' + pathPrefix + 'about.html"' + ariaCurrent("about") + ">About</a></li>" +
    '      <li><a href="' + pathPrefix + 'work.html"' + ariaCurrent("work") + ">Work</a></li>" +
    '      <li><a href="' + pathPrefix + 'contact.html"' + ariaCurrent("contact") + ">Contact</a></li>" +
    "    </ul>" +
    "  </nav>" +
    "</header>";

  // ── Footer ────────────────────────────────────────────────────────────
  var footerHTML =
    '<footer class="site-footer">' +
    '  <div class="container footer-inner">' +
    "    <p>&copy; " + new Date().getFullYear() + " Sebastian Quiroz Malca Alva</p>" +
    "    <p>Visual Designer / Brand Identity / UI Design</p>" +
    "  </div>" +
    "</footer>";

  // ── Inject ────────────────────────────────────────────────────────────
  var headerSlot = document.getElementById("header-slot");
  var footerSlot = document.getElementById("footer-slot");

  if (headerSlot) {
    headerSlot.outerHTML = headerHTML;
  }
  if (footerSlot) {
    footerSlot.outerHTML = footerHTML;
  }
})();
