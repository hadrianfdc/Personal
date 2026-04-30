/* ============================================================
   Contact Section — GSAP + Alpine.js enhancements
   ============================================================ */

/* ── Alpine.js component: copy-to-clipboard with GSAP button pulse ── */
document.addEventListener('alpine:init', function () {
  Alpine.data('contactCopy', function (value) {
    return {
      value: value,
      copied: false,
      _timer: null,

      copy: function (btn) {
        if (this.copied) return;

        var self = this;

        function animate() {
          if (typeof gsap !== 'undefined') {
            gsap.timeline()
              .to(btn, { scale: 0.92, duration: 0.1, ease: 'power2.in' })
              .to(btn, { scale: 1,    duration: 0.35, ease: 'back.out(2.5)' });
          }
          self.copied = true;
          clearTimeout(self._timer);
          self._timer = setTimeout(function () { self.copied = false; }, 2000);
        }

        navigator.clipboard.writeText(this.value)
          .then(animate)
          .catch(function () {
            var ta = document.createElement('textarea');
            ta.value = value;
            ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            animate();
          });
      }
    };
  });
});

(function () {
  'use strict';

  /* ── Wait for GSAP ── */
  function whenGSAP(cb) {
    if (typeof gsap !== 'undefined') { cb(); return; }
    const t = setInterval(function () {
      if (typeof gsap !== 'undefined') { clearInterval(t); cb(); }
    }, 50);
  }

  /* ── Wait for section-show (template hides sections until nav click) ── */
  function onContactVisible(cb) {
    const section = document.getElementById('contact');
    if (!section) return;
    if (section.classList.contains('section-show')) { cb(); return; }
    const mo = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.type === 'attributes' && section.classList.contains('section-show')) {
          mo.disconnect();
          cb();
        }
      });
    });
    mo.observe(section, { attributes: true, attributeFilter: ['class'] });
  }

  /* ────────────────────────────────────────────────────────────
     1. Heading char-by-char stagger reveal
  ──────────────────────────────────────────────────────────── */
  function initContactHeading() {
    const el = document.getElementById('contact-heading-text');
    if (!el || el.dataset.split) return;
    el.dataset.split = '1';

    const text = el.textContent;
    el.textContent = '';
    text.split('').forEach(function (ch) {
      const span = document.createElement('span');
      span.className = 'contact-heading-char';
      span.textContent = ch === ' ' ? ' ' : ch;
      el.appendChild(span);
    });

    const chars = el.querySelectorAll('.contact-heading-char');

    const observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.55,
        ease: 'back.out(1.7)',
        stagger: { each: 0.045 },
        onStart: function () {
          gsap.set(chars, { transformPerspective: 600 });
        }
      });
    }, { threshold: 0.5 });

    gsap.set(chars, { opacity: 0, y: 18, rotateX: -40 });
    observer.observe(el);
  }

  /* ────────────────────────────────────────────────────────────
     2. Cards stagger scroll-reveal
  ──────────────────────────────────────────────────────────── */
  function initContactCards() {
    const cards = document.querySelectorAll('.contact .contact-card');
    if (!cards.length || cards[0].dataset.animated) return;
    cards[0].dataset.animated = '1';

    gsap.set(cards, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(function (entries) {
      const visible = Array.from(entries).filter(function (e) { return e.isIntersecting; });
      if (!visible.length) return;
      observer.disconnect();
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: { each: 0.12 }
      });
    }, { threshold: 0.15 });

    observer.observe(cards[0]);
  }

  /* ────────────────────────────────────────────────────────────
     4. Magnetic social icons — platform-specific colors via GSAP
  ──────────────────────────────────────────────────────────── */
  function initContactSocial() {
    const RADIUS = 80;
    const PULL   = 10;

    const links = document.querySelectorAll('.contact .contact-card .social-links a');
    if (!links.length) return;

    if (window.matchMedia('(hover: none)').matches) return;

    links.forEach(function (link) {
      const icon = link.querySelector('i');
      const platformColor = link.dataset.color || '#FF9F43';
      const platformBg    = link.dataset.bg    || 'rgba(255,159,67,0.08)';

      link.addEventListener('mouseenter', function () {
        gsap.to(link, {
          scale: 1.22,
          backgroundColor: platformBg,
          boxShadow: '0 8px 24px ' + platformBg,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        if (icon) {
          gsap.to(icon, {
            color: platformColor,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      link.addEventListener('mouseleave', function () {
        gsap.to(link, {
          scale: 1,
          x: 0,
          y: 0,
          backgroundColor: 'rgba(255,255,255,0.75)',
          boxShadow: '0 2px 8px rgba(44,62,80,0.06)',
          duration: 0.45,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto'
        });
        if (icon) {
          gsap.to(icon, {
            color: '#2C3E50',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      link.addEventListener('mousemove', function (e) {
        const rect = link.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = e.clientX - cx;
        const dy   = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > RADIUS) return;
        const strength = (1 - dist / RADIUS) * PULL;
        gsap.to(link, {
          x: (dx / dist) * strength,
          y: (dy / dist) * strength,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }

  /* ── Bootstrap ── */
  var _copyAndSocialReady = false;

  function init() {
    whenGSAP(function () {
      if (!_copyAndSocialReady) {
        _copyAndSocialReady = true;
        initContactSocial();
      }
      /* Heading + cards need section to be visible for IntersectionObserver */
      onContactVisible(function () {
        initContactHeading();
        initContactCards();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
