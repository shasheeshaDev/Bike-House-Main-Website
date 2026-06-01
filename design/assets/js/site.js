/* =====================================================
   BIKE HOUSE — Shared site script
   Injects header/footer, manages tweaks, mobile menu,
   scroll reveal, and small page helpers.
   ===================================================== */

(function () {
  const PHONE = "+94 77 123 4567";
  const PHONE_HREF = "tel:+94771234567";
  const WHATSAPP = "https://wa.me/94771234567";
  const ADDRESS = "No. 42, Horana Road, Piliyandala, Sri Lanka";

  const NAV = [
    { href: "index.html",     label: "Home" },
    { href: "about.html",     label: "About" },
    { href: "services.html",  label: "Services" },
    { href: "bikes.html",     label: "Bikes" },
    { href: "shop.html",      label: "Shop" },
    { href: "blog.html",      label: "Journal" },
    { href: "contact.html",   label: "Contact" },
  ];

  const page = document.body.dataset.page || "home";
  const NAV_MATCH = { home: "index", about: "about", services: "services", bikes: "bikes", shop: "shop", blog: "blog", contact: "contact" };
  const activeFile = (NAV_MATCH[page] || page) + ".html";

  /* ----- Header / Nav ----- */
  function buildHeader() {
    const links = NAV.map(n =>
      `<li><a href="${n.href}" class="${n.href === activeFile ? 'active' : ''}">${n.label}</a></li>`
    ).join("");

    const html = `
      <header class="site-header" id="siteHeader">
        <div class="container nav">
          <a class="nav-brand" href="index.html" aria-label="Bike House home">
            <img src="assets/img/logo.png" alt="">
            <div class="nav-brand-text">
              BIKE HOUSE
              <small>PILIYANDALA · EST 2014</small>
            </div>
          </a>
          <nav>
            <ul class="nav-links">${links}</ul>
          </nav>
          <div class="nav-cta">
            <a class="nav-phone" href="${PHONE_HREF}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
              ${PHONE}
            </a>
            <a class="btn btn-small" href="contact.html#book">Book a Service <span class="arrow"></span></a>
            <button class="nav-burger" id="navBurger" aria-label="Open menu"><span></span></button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="mobileMenu">
        <button class="mobile-close" id="mobileClose" aria-label="Close menu">×</button>
        ${NAV.map(n => `<a href="${n.href}" class="${n.href === activeFile ? 'active' : ''}">${n.label}</a>`).join("")}
        <div style="margin-top:32px; font-family:var(--font-mono); font-size:12px; color:var(--ink-mute); letter-spacing:.18em;">
          <a href="${PHONE_HREF}" style="color:var(--red); font-size:24px; font-family:var(--font-display); letter-spacing:.04em; text-transform:none;">${PHONE}</a>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", html);

    // Scroll state
    const header = document.getElementById("siteHeader");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu
    const menu = document.getElementById("mobileMenu");
    document.getElementById("navBurger")?.addEventListener("click", () => {
      menu.classList.add("open"); document.body.classList.add("menu-open");
    });
    document.getElementById("mobileClose")?.addEventListener("click", () => {
      menu.classList.remove("open"); document.body.classList.remove("menu-open");
    });
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      menu.classList.remove("open"); document.body.classList.remove("menu-open");
    }));
  }

  /* ----- Footer ----- */
  function buildFooter() {
    const html = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a class="nav-brand" href="index.html" style="margin-bottom:20px">
                <img src="assets/img/logo.png" alt="">
                <div class="nav-brand-text">BIKE HOUSE<small>PILIYANDALA · EST 2014</small></div>
              </a>
              <p>Sri Lanka's specialist garage for superbikes, supermotos and high-capacity touring machines. Diagnostics, performance tuning, and full-service care for serious riders.</p>
              <div class="socials" style="margin-top:24px">
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v8h4v-8h3l1-4h-4V6.5C13 5.5 13.5 5 14.5 5H17V1h-3c-3 0-5 1.8-5 5v2Z"/></svg></a>
                <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 6.2c-.3-1-1-1.8-2-2.1C19.2 3.5 12 3.5 12 3.5s-7.2 0-9 .6c-1 .3-1.7 1.1-2 2.1C.5 8 .5 12 .5 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9 .6 9 .6s7.2 0 9-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8ZM9.8 15.5v-7l6 3.5-6 3.5Z"/></svg></a>
                <a href="${WHATSAPP}" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Z"/></svg></a>
              </div>
            </div>
            <div class="footer-col">
              <h5>Workshop</h5>
              <ul>
                <li><a href="services.html">All Services</a></li>
                <li><a href="services.html#diagnostics">ECU Diagnostics</a></li>
                <li><a href="services.html#tuning">Performance Tuning</a></li>
                <li><a href="contact.html#book">Book a Service</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h5>Marketplace</h5>
              <ul>
                <li><a href="bikes.html">Bikes for Sale</a></li>
                <li><a href="shop.html">Parts &amp; Gear</a></li>
                <li><a href="blog.html">Journal</a></li>
                <li><a href="about.html">About Us</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h5>Contact</h5>
              <ul>
                <li>${ADDRESS}</li>
                <li><a href="${PHONE_HREF}">${PHONE}</a></li>
                <li><a href="mailto:hello@bikehouse.lk">hello@bikehouse.lk</a></li>
                <li>Mon–Sat · 8:30 – 19:00</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© ${new Date().getFullYear()} BIKE HOUSE LK — All rights reserved.</div>
            <div>Web Solution by <a href="#" style="color:var(--ink); border-bottom:1px solid var(--line);">Enrol Solutions</a> · Design by <a href="#" style="color:var(--ink); border-bottom:1px solid var(--line);">ShshaThink</a></div>
          </div>
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", html);
  }

  /* ----- Tweaks (persists via localStorage) ----- */
  const TWEAK_DEFAULTS = { tone: "near", hero: "mural" };
  function loadTweaks() {
    try {
      return { ...TWEAK_DEFAULTS, ...(JSON.parse(localStorage.getItem("bh_tweaks") || "{}")) };
    } catch { return { ...TWEAK_DEFAULTS }; }
  }
  function saveTweaks(t) { localStorage.setItem("bh_tweaks", JSON.stringify(t)); }

  function applyTweaks(t) {
    document.documentElement.setAttribute("data-tone", t.tone);
    const hero = document.querySelector(".hero");
    if (hero) hero.setAttribute("data-variant", t.hero);
  }

  function buildTweaksPanel() {
    const t = loadTweaks();
    applyTweaks(t);

    const html = `
      <button class="tweaks-fab" id="tweaksFab" aria-label="Open tweaks">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>
      </button>
      <aside class="tweaks-panel" id="tweaksPanel" aria-hidden="true">
        <header>
          <h6>Tweaks</h6>
          <button class="close" id="tweaksClose" aria-label="Close">×</button>
        </header>
        <div class="tweaks-section">
          <label>Background Tone</label>
          <div class="tweak-radio" data-key="tone">
            <button data-val="jet">Jet</button>
            <button data-val="near">Near-Black</button>
            <button data-val="graphite">Graphite</button>
          </div>
        </div>
        <div class="tweaks-section" data-only="home">
          <label>Hero Treatment</label>
          <div class="tweak-radio" data-key="hero">
            <button data-val="mural">Mural</button>
            <button data-val="portrait">Portrait</button>
            <button data-val="split">Split</button>
          </div>
        </div>
        <div style="font-family:var(--font-mono); font-size:10px; letter-spacing:.18em; color:var(--ink-mute); text-transform:uppercase; padding-top:14px; border-top:1px solid var(--line-soft);">
          Persists across pages
        </div>
      </aside>
    `;
    document.body.insertAdjacentHTML("beforeend", html);

    const fab = document.getElementById("tweaksFab");
    const panel = document.getElementById("tweaksPanel");
    const close = document.getElementById("tweaksClose");

    // Hide hero tweak on non-home pages
    if (page !== "home") panel.querySelector('[data-only="home"]').style.display = "none";

    function syncButtons() {
      const cur = loadTweaks();
      panel.querySelectorAll(".tweak-radio").forEach(group => {
        const key = group.dataset.key;
        group.querySelectorAll("button").forEach(b => {
          b.classList.toggle("active", b.dataset.val === cur[key]);
        });
      });
    }
    syncButtons();

    fab.addEventListener("click", () => {
      panel.classList.add("open");
      fab.classList.add("hidden");
    });
    close.addEventListener("click", () => {
      panel.classList.remove("open");
      fab.classList.remove("hidden");
    });

    panel.querySelectorAll(".tweak-radio button").forEach(btn => {
      btn.addEventListener("click", () => {
        const group = btn.closest(".tweak-radio");
        const key = group.dataset.key;
        const val = btn.dataset.val;
        const cur = loadTweaks();
        cur[key] = val;
        saveTweaks(cur);
        applyTweaks(cur);
        syncButtons();
      });
    });

    // Hide on print / mobile menu open
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { panel.classList.remove("open"); fab.classList.remove("hidden"); }
    });
  }

  /* ----- Scroll reveal ----- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
  }

  /* ----- Init ----- */
  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    buildFooter();
    buildTweaksPanel();
    initReveal();
  });

  // expose for page scripts
  window.BH = { PHONE, PHONE_HREF, WHATSAPP, ADDRESS };
})();
