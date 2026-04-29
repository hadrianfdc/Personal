/* ============================================================
   3D Interactive About Section — Particle BG + Tilt + Skills + Interests
   ============================================================ */

(function () {
  'use strict';

  /* ── Utility: run after DOM is ready ─────────────────────── */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initParticles();
    initProfileCard();
    initSplitHeading();
    initSkillBars();
    initInterestsGrid();
  });

  /* ════════════════════════════════════════════════════════════
     1. PARTICLE BACKGROUND (lightweight Canvas — no Three.js)
     ════════════════════════════════════════════════════════════ */
  function initParticles() {
    const section = document.getElementById('about');
    if (!section) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'about-particles-canvas';
    section.insertBefore(canvas, section.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H, particles, scrollY = 0;
    const COUNT = window.innerWidth < 768 ? 35 : 70;
    const COLORS = ['rgba(24,210,110,', 'rgba(139,92,246,', 'rgba(255,255,255,'];

    function resize() {
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    }

    function mkParticle() {
      const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.15,
        color: colorBase,
        pulse: Math.random() * Math.PI * 2
      };
    }

    function build() { particles = Array.from({ length: COUNT }, mkParticle); }

    let scrollOffset = 0;
    window.addEventListener('scroll', function () {
      const target = window.scrollY * 0.06;
      scrollOffset += (target - scrollOffset) * 0.08;
    }, { passive: true });

    let raf;
    function loop() {
      ctx.clearRect(0, 0, W, H);
      const now = performance.now() / 1000;

      particles.forEach(p => {
        p.pulse += 0.018;
        const alpha = p.alpha * (0.75 + 0.25 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y - scrollOffset % H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha + ')';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      raf = requestAnimationFrame(loop);
    }

    resize();
    build();
    loop();

    const ro = new ResizeObserver(function () {
      resize();
      build();
    });
    ro.observe(section);
  }

  /* ════════════════════════════════════════════════════════════
     2. GLASSMORPHISM PROFILE CARD — Tilt + Glow Border
     ════════════════════════════════════════════════════════════ */
  function initProfileCard() {
    const wrapper = document.querySelector('.profile-card-3d-wrapper');
    const card    = document.querySelector('.profile-card-3d');
    if (!wrapper || !card) return;

    const MAX_TILT = 14;
    let animId = null;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
    let angle = 0;

    /* Animate conic gradient border angle */
    function rotateBorder() {
      angle = (angle + 0.8) % 360;
      card.style.setProperty('--glow-angle', angle + 'deg');
      requestAnimationFrame(rotateBorder);
    }
    rotateBorder();

    /* Smooth tilt interpolation */
    function lerp(a, b, t) { return a + (b - a) * t; }

    function animateTilt() {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      card.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg) scale(1.02)`;
      animId = requestAnimationFrame(animateTilt);
    }

    wrapper.addEventListener('mouseenter', function () {
      card.classList.add('tilt-active');
      animId = requestAnimationFrame(animateTilt);
    });

    wrapper.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      targetY = dx * MAX_TILT;
      targetX = -dy * MAX_TILT;
    });

    wrapper.addEventListener('mouseleave', function () {
      cancelAnimationFrame(animId);
      targetX = 0; targetY = 0;
      card.classList.remove('tilt-active');

      /* Ease back to float animation */
      function easeBack() {
        currentX = lerp(currentX, 0, 0.08);
        currentY = lerp(currentY, 0, 0.08);
        card.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        if (Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
          requestAnimationFrame(easeBack);
        } else {
          card.style.transform = '';
        }
      }
      requestAnimationFrame(easeBack);
    });

    /* Touch support */
    wrapper.addEventListener('touchmove', function (e) {
      const touch = e.touches[0];
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width / 2;
      const cy    = rect.top  + rect.height / 2;
      targetY = ((touch.clientX - cx) / (rect.width / 2)) * (MAX_TILT * 0.5);
      targetX = -((touch.clientY - cy) / (rect.height / 2)) * (MAX_TILT * 0.5);
    }, { passive: true });
  }

  /* ════════════════════════════════════════════════════════════
     3. SPLIT-TEXT HEADING REVEAL
     ════════════════════════════════════════════════════════════ */
  function initSplitHeading() {
    const heading = document.querySelector('.split-heading');
    if (!heading) return;

    const text = heading.textContent;
    heading.innerHTML = '';

    text.split('').forEach(function (ch, i) {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.transitionDelay = (i * 0.032) + 's';
      span.textContent = ch === ' ' ? ' ' : ch;
      heading.appendChild(span);
    });

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          heading.classList.add('revealed');
          obs.unobserve(heading);
        }
      });
    }, { threshold: 0.5 });

    obs.observe(heading);
  }

  /* ════════════════════════════════════════════════════════════
     4. STAGGERED SKILL BAR ANIMATION
     ════════════════════════════════════════════════════════════ */
  function initSkillBars() {
    const container = document.querySelector('.skills-3d');
    if (!container) return;

    const bars = container.querySelectorAll('.progress');

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        const bar   = en.target;
        const index = Array.from(bars).indexOf(bar);
        const fill  = bar.querySelector('.progress-bar');
        const value = fill ? (fill.getAttribute('aria-valuenow') || 0) : 0;

        setTimeout(function () {
          bar.classList.add('skill-revealed');
          if (fill) {
            /* Slight delay so the reveal animation plays first */
            setTimeout(function () {
              fill.style.width = value + '%';
            }, 200);
          }
        }, index * 120);

        obs.unobserve(bar);
      });
    }, { threshold: 0.3 });

    bars.forEach(function (b) { obs.observe(b); });
  }

  /* ════════════════════════════════════════════════════════════
     5. INTEREST GRID — 3D Pop + Magnetic Cursor Pull
     ════════════════════════════════════════════════════════════ */
  function initInterestsGrid() {
    const grid  = document.querySelector('.interests-3d');
    if (!grid) return;

    const items = grid.querySelectorAll('.icon-box');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    /* Staggered reveal on scroll */
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        const el    = en.target;
        const index = Array.from(items).indexOf(el);
        el.style.animationDelay = (index * 0.07) + 's';
        el.classList.add('interest-revealed');
        obs.unobserve(el);
      });
    }, { threshold: 0.15 });

    items.forEach(function (item) { obs.observe(item); });

    if (isMobile) return; /* Skip magnetic on touch devices */

    /* Magnetic cursor pull */
    const PULL = 10;

    items.forEach(function (item) {
      const inner = item.querySelector('.icon-inner') || item;

      item.addEventListener('mousemove', function (e) {
        const rect = item.getBoundingClientRect();
        const dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        const dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        inner.style.transform = `translate(${dx * PULL}px, ${dy * PULL}px)`;
      });

      item.addEventListener('mouseleave', function () {
        inner.style.transform = 'translate(0,0)';
      });
    });
  }

})();
