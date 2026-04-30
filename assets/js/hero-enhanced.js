/**
 * Hero Section Enhancements
 * - Animated dot-grid canvas with mouse parallax
 * - TextScramble typing effect on tagline
 * - GSAP entrance animations
 * - Floating + parallax profile image
 * - Magnetic social icon hover
 * - Scroll-up sticky navbar
 */
(function () {
  'use strict';

  // ── 1. DOT-GRID CANVAS ─────────────────────────────────────────────────
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const SPACING       = 34;
  const DOT_R         = 1.4;
  const INFLUENCE_R   = 140;
  const MAX_SHIFT     = 7;
  const mouse         = { x: -9999, y: -9999 };

  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cols = Math.ceil(canvas.width  / SPACING) + 2;
    const rows = Math.ceil(canvas.height / SPACING) + 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx   = c * SPACING;
        const by   = r * SPACING;
        const dx   = mouse.x - bx;
        const dy   = mouse.y - by;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const infl = Math.max(0, 1 - dist / INFLUENCE_R);

        const x = bx + (dx / dist) * infl * MAX_SHIFT * 0.5;
        const y = by + (dy / dist) * infl * MAX_SHIFT * 0.5;

        const baseAlpha  = 0.07;
        const accentPct  = infl;
        const r_ch = Math.round(44  + accentPct * (255 - 44));
        const g_ch = Math.round(62  + accentPct * (159 - 62));
        const b_ch = Math.round(80  + accentPct * (67  - 80));
        const alpha = baseAlpha + infl * 0.38;

        ctx.beginPath();
        ctx.arc(x, y, DOT_R + infl * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r_ch},${g_ch},${b_ch},${alpha})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(drawDots);
  }

  // Track mouse only while over the header
  const header = document.getElementById('header');
  if (header) {
    header.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    header.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawDots();


  // ── 2. TEXT SCRAMBLE ───────────────────────────────────────────────────
  class TextScramble {
    constructor(el) {
      this.el    = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const promise = new Promise(r => (this.resolve = r));
      this.queue = [...newText].map((to, i) => ({
        to,
        start : Math.floor(i * 1.5),
        end   : Math.floor(i * 1.5) + Math.floor(Math.random() * 8) + 5,
        char  : '',
      }));
      cancelAnimationFrame(this.raf);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let out = '', done = 0;
      for (const item of this.queue) {
        if (this.frame >= item.end) {
          done++;
          out += item.to;
        } else if (this.frame >= item.start) {
          if (!item.char || Math.random() < 0.3)
            item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
          out += `<span class="scramble-glyph">${item.char}</span>`;
        } else {
          out += `<span class="scramble-blank">_</span>`;
        }
      }
      this.el.innerHTML = out;
      if (done === this.queue.length) {
        this.resolve();
      } else {
        this.raf = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  const tagline = document.getElementById('hero-tagline');
  if (tagline) {
    const original = tagline.textContent.trim();
    tagline.textContent = '';
    const fx = new TextScramble(tagline);
    setTimeout(() => {
      fx.setText(original).then(() => {
        // Restore plain text so screen readers see it correctly,
        // then drop the blinking cursor class
        tagline.textContent = original;
        tagline.classList.remove('scrambling');
      });
    }, 500);
  }


  // ── 3. GSAP ANIMATIONS ─────────────────────────────────────────────────
  if (typeof gsap === 'undefined') return;

  // Entrance timeline
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('#header h1',               { y: 44, opacity: 0, duration: 0.9 })
    .from('#hero-tagline',            { y: 22, opacity: 0, duration: 0.7 }, '-=0.45')
    .from('#header .social-links a',  { y: 18, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.35')
    .from('.hero-cta',                { y: 18, opacity: 0, duration: 0.5 }, '-=0.25');


  // ── 4. FLOATING + PARALLAX PROFILE IMAGE ──────────────────────────────
  const profileEl = document.getElementById('animated-image');
  if (profileEl) {
    // Continuous float
    gsap.to(profileEl, {
      y       : -18,
      duration: 3.4,
      ease    : 'sine.inOut',
      yoyo    : true,
      repeat  : -1,
    });

    // Subtle horizontal parallax on mouse move
    window.addEventListener('mousemove', (e) => {
      const xFactor = (e.clientX / window.innerWidth  - 0.5) * 2;
      const yFactor = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(profileEl, {
        x        : xFactor * 14,
        rotationY: xFactor * 4,
        duration : 1.4,
        ease     : 'power2.out',
        overwrite: 'auto',
      });
    });
  }


  // ── 5. MAGNETIC SOCIAL ICONS ──────────────────────────────────────────
  document.querySelectorAll('#header .social-links a').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r  = btn.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      gsap.to(btn, {
        x       : (e.clientX - cx) * 0.42,
        y       : (e.clientY - cy) * 0.42,
        duration: 0.25,
        ease    : 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' });
    });
  });


  // ── 6. SCROLL-UP STICKY NAVBAR ────────────────────────────────────────
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const hdr = document.getElementById('header');
    if (!hdr || !hdr.classList.contains('header-top')) return;

    const current = window.scrollY;
    if (current > lastScrollY + 4 && current > 80) {
      gsap.to(hdr, { y: -84, duration: 0.28, ease: 'power2.in', overwrite: 'auto' });
    } else if (current < lastScrollY - 2) {
      gsap.to(hdr, { y: 0,   duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
    }
    lastScrollY = Math.max(0, current);
  });

})();
