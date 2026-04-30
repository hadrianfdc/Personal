/* ============================================================
   Contact Section — GSAP-powered enhancements
   ============================================================ */

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
     3. Copy to clipboard + GSAP badge bounce
  ──────────────────────────────────────────────────────────── */
  function initContactCopy() {
    const triggers = document.querySelectorAll('.contact-copy-trigger');
    triggers.forEach(function (btn) {
      const badge = btn.querySelector('.contact-copied-badge');
      let animating = false;

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (animating) return;

        const value = btn.dataset.copy;
        if (!value) return;

        navigator.clipboard.writeText(value).then(function () {
          animating = true;
          gsap.killTweensOf(badge);
          gsap.timeline({
            onComplete: function () { animating = false; }
          })
            .set(badge, { opacity: 0, scale: 0, y: 0 })
            .to(badge, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'back.out(2.5)'
            })
            .to(badge, {
              opacity: 0,
              scale: 0.85,
              y: -6,
              duration: 0.35,
              ease: 'power2.in',
              delay: 1.6
            });
        }).catch(function () {
          /* Fallback for older browsers */
          const ta = document.createElement('textarea');
          ta.value = value;
          ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          /* Still animate the badge */
          animating = true;
          gsap.killTweensOf(badge);
          gsap.timeline({
            onComplete: function () { animating = false; }
          })
            .set(badge, { opacity: 0, scale: 0, y: 0 })
            .to(badge, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' })
            .to(badge, { opacity: 0, scale: 0.85, y: -6, duration: 0.35, ease: 'power2.in', delay: 1.6 });
        });
      });
    });
  }

  /* ────────────────────────────────────────────────────────────
     4. Magnetic social icons
  ──────────────────────────────────────────────────────────── */
  function initContactSocial() {
    const RADIUS = 80;   /* px — magnetic pull distance */
    const PULL   = 10;   /* px — max displacement        */

    const links = document.querySelectorAll('.contact .contact-card .social-links a');
    if (!links.length) return;

    /* Only on non-touch devices */
    if (window.matchMedia('(hover: none)').matches) return;

    links.forEach(function (link) {
      const icon = link.querySelector('i');

      link.addEventListener('mouseenter', function () {
        gsap.to(link, {
          scale: 1.18,
          boxShadow: '0 6px 20px rgba(255,159,67,0.30)',
          borderColor: 'rgba(255,159,67,0.6)',
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        if (icon) {
          gsap.to(icon, {
            color: '#FF9F43',
            duration: 0.28,
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
          boxShadow: '0 2px 8px rgba(44,62,80,0.06)',
          borderColor: 'rgba(44,62,80,0.1)',
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
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > RADIUS) return;
        const strength = (1 - dist / RADIUS) * PULL;
        gsap.to(link, {
          x: dx / dist * strength,
          y: dy / dist * strength,
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
        initContactCopy();
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
