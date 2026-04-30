/* ============================================================
   3D Interactive About Section — Neural BG + Radar + Glitch
   ============================================================ */

(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initNeuralNetwork();
    initProfileCard();
    initPhotoGlitch();
    initSplitHeading();
    initBioText();
    initSysSpecs();
    initDecryptReveal();
    initSkillRadar();
    initInterestsGrid();

    const aboutSection = document.getElementById('about');
    if (aboutSection && window._aboutNeuralResize) {
      const mo = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.attributeName === 'class' && aboutSection.classList.contains('section-show')) {
            setTimeout(window._aboutNeuralResize, 50);
          }
        });
      });
      mo.observe(aboutSection, { attributes: true });
    }
  });

  /* ════════════════════════════════════════════════════════════
     1. NEURAL NETWORK CANVAS BACKGROUND
     ════════════════════════════════════════════════════════════ */
  function initNeuralNetwork() {
    const section = document.getElementById('about');
    if (!section) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'about-neural-canvas';
    section.insertBefore(canvas, section.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H;
    const COUNT  = window.innerWidth < 768 ? 22 : 48;
    const MDIST  = window.innerWidth < 768 ? 110 : 150;
    const COLORS = { node: 'rgba(24,210,110,', edge: 'rgba(139,92,246,' };
    let nodes    = [];
    let raf      = null;
    let active   = false;

    function resize() {
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    }

    function mkNode() {
      return {
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 0.38,
        vy:    (Math.random() - 0.5) * 0.38,
        r:     Math.random() * 1.6 + 1,
        pulse: Math.random() * Math.PI * 2,
        fired: 0,
      };
    }

    function build() { nodes = Array.from({ length: COUNT }, mkNode); }

    /* Occasionally "fire" a node to simulate signal propagation */
    setInterval(function () {
      if (!active || nodes.length === 0) return;
      nodes[Math.floor(Math.random() * nodes.length)].fired = 1.0;
    }, 800);

    function loop() {
      ctx.clearRect(0, 0, W, H);

      /* Draw edges between nearby nodes */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a  = nodes[i];
          const b  = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d > MDIST) continue;

          const proximity = 1 - d / MDIST;
          const signal    = Math.max(a.fired, b.fired);
          const edgeAlpha = proximity * (0.18 + signal * 0.35);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = COLORS.edge + edgeAlpha.toFixed(3) + ')';
          ctx.lineWidth   = 0.6 + signal * 0.8;
          ctx.stroke();
        }
      }

      /* Draw nodes */
      nodes.forEach(function (n) {
        n.pulse += 0.022;
        n.fired  = Math.max(0, n.fired - 0.022);

        const glow  = 0.55 + 0.45 * Math.sin(n.pulse);
        const alpha = 0.45 + n.fired * 0.55;

        /* Outer glow ring when fired */
        if (n.fired > 0.05) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5 * n.fired, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.node + (n.fired * 0.25).toFixed(3) + ')';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + n.fired * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = COLORS.node + (glow * alpha).toFixed(3) + ')';
        ctx.fill();

        /* Move */
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20)     n.x = W + 20;
        if (n.x > W + 20)  n.x = -20;
        if (n.y < -20)     n.y = H + 20;
        if (n.y > H + 20)  n.y = -20;
      });

      raf = requestAnimationFrame(loop);
    }

    /* Start/stop based on visibility */
    const vis = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !raf) {
          active = true;
          raf    = requestAnimationFrame(loop);
        } else if (!en.isIntersecting && raf) {
          active = false;
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
    }, { threshold: 0.05 });

    resize();
    build();
    vis.observe(section);

    window._aboutNeuralResize = function () { resize(); build(); };

    const ro = new ResizeObserver(function () { resize(); build(); });
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

    function rotateBorder() {
      angle = (angle + 0.8) % 360;
      card.style.setProperty('--glow-angle', angle + 'deg');
      requestAnimationFrame(rotateBorder);
    }
    rotateBorder();

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
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      targetY = ((e.clientX - cx) / (rect.width  / 2)) * MAX_TILT;
      targetX = -((e.clientY - cy) / (rect.height / 2)) * MAX_TILT;
    });

    wrapper.addEventListener('mouseleave', function () {
      cancelAnimationFrame(animId);
      targetX = 0; targetY = 0;
      card.classList.remove('tilt-active');

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

    wrapper.addEventListener('touchmove', function (e) {
      const touch = e.touches[0];
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      targetY = ((touch.clientX - cx) / (rect.width  / 2)) * (MAX_TILT * 0.5);
      targetX = -((touch.clientY - cy) / (rect.height / 2)) * (MAX_TILT * 0.5);
    }, { passive: true });
  }

  /* ════════════════════════════════════════════════════════════
     3. PHOTO GLITCH — Scanlines + Chromatic Aberration
     ════════════════════════════════════════════════════════════ */
  function initPhotoGlitch() {
    const wrapper = document.querySelector('.profile-card-3d-wrapper');
    const card    = document.querySelector('.profile-card-3d');
    const img     = card && card.querySelector('.profile-card-img');
    if (!wrapper || !card || !img) return;

    /* Scanlines overlay */
    const scanDiv = document.createElement('div');
    scanDiv.className = 'photo-scanlines';
    card.appendChild(scanDiv);

    /* Chromatic aberration clones — cloned so they share same src */
    const cloneR = img.cloneNode(true);
    cloneR.className = 'glitch-chr glitch-chr--r';
    cloneR.removeAttribute('id');
    cloneR.removeAttribute('loading');
    cloneR.removeAttribute('fetchpriority');
    card.appendChild(cloneR);

    const cloneB = img.cloneNode(true);
    cloneB.className = 'glitch-chr glitch-chr--b';
    cloneB.removeAttribute('id');
    cloneB.removeAttribute('loading');
    cloneB.removeAttribute('fetchpriority');
    card.appendChild(cloneB);

    /* GSAP glitch timeline — only runs when GSAP is available */
    function whenGSAP(cb) {
      if (typeof gsap !== 'undefined') { cb(); return; }
      const t = setInterval(function () {
        if (typeof gsap !== 'undefined') { clearInterval(t); cb(); }
      }, 50);
    }

    whenGSAP(function () {
      let tlRef = null;

      function buildGlitchTl() {
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: gsap.utils.random(0.4, 1.2),
          paused: true,
        });

        tl.set([cloneR, cloneB], { opacity: 0, x: 0, y: 0 })
          /* Glitch burst 1 — horizontal shift */
          .to(cloneR, { opacity: 0.65, x: 6,  duration: 0.055, ease: 'none' })
          .to(cloneB, { opacity: 0.65, x: -6, duration: 0.055, ease: 'none' }, '<')
          .to([cloneR, cloneB], { opacity: 0, x: 0, duration: 0.055, ease: 'none' })
          /* Glitch burst 2 — vertical micro-shift */
          .to(cloneR, { opacity: 0.5, y: 4,  duration: 0.04, ease: 'none' }, '+=0.18')
          .to(cloneB, { opacity: 0.5, y: -4, duration: 0.04, ease: 'none' }, '<')
          .to([cloneR, cloneB], { opacity: 0, y: 0, duration: 0.04, ease: 'none' })
          /* Glitch burst 3 — diagonal */
          .to(cloneR, { opacity: 0.45, x: -5, y: 3,  duration: 0.035, ease: 'none' }, '+=0.12')
          .to(cloneB, { opacity: 0.45, x: 5,  y: -3, duration: 0.035, ease: 'none' }, '<')
          .to([cloneR, cloneB], { opacity: 0, x: 0, y: 0, duration: 0.035, ease: 'none' });

        return tl;
      }

      wrapper.addEventListener('mouseenter', function () {
        if (!tlRef) tlRef = buildGlitchTl();
        tlRef.play();
      });

      wrapper.addEventListener('mouseleave', function () {
        if (tlRef) { tlRef.pause(); tlRef = null; }
        gsap.to([cloneR, cloneB], { opacity: 0, x: 0, y: 0, duration: 0.1 });
      });
    });
  }

  /* ════════════════════════════════════════════════════════════
     4. SPLIT-TEXT HEADING REVEAL
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
     5. SYSTEM SPECS — Scroll-reveal stagger
     ════════════════════════════════════════════════════════════ */
  function initSysSpecs() {
    const specs = document.getElementById('sys-specs');
    if (!specs) return;

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          specs.classList.add('specs-revealed');
          obs.unobserve(specs);
        }
      });
    }, { threshold: 0.3 });

    obs.observe(specs);
  }

  /* ════════════════════════════════════════════════════════════
     6. DECRYPT REVEAL — Key Phrase
     ════════════════════════════════════════════════════════════ */
  function initDecryptReveal() {
    const el = document.getElementById('keyphrase-core');
    if (!el) return;

    const original = el.textContent.trim();
    const chars    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*><[]{}|';
    let revealed   = false;

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || revealed) return;
        revealed = true;

        let frame     = 0;
        const frames  = 28;
        const total   = original.length;

        const iid = setInterval(function () {
          frame++;
          const progress  = frame / frames;
          const revealedN = Math.floor(progress * total);

          let out = '';
          for (let i = 0; i < total; i++) {
            if (i < revealedN || original[i] === ' ' || original[i] === '"' || original[i] === '.' || original[i] === ',') {
              out += original[i];
            } else {
              out += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          el.textContent = out;

          if (frame >= frames) {
            clearInterval(iid);
            el.textContent = original;
          }
        }, 55);

        obs.unobserve(en.target);
      });
    }, { threshold: 0.6 });

    obs.observe(el);
  }

  /* ════════════════════════════════════════════════════════════
     7. BIO TEXT — Glass-Shatter GSAP Reveal + Magnetic Hover
     ════════════════════════════════════════════════════════════ */
  function initBioText() {
    const para = document.getElementById('about-bio-text');
    if (!para) return;

    const isMobile   = window.matchMedia('(max-width: 768px)').matches;
    const prefersRed = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const glass      = para.closest('.about-bio-glass');
    const rawText    = para.textContent.trim();
    para.textContent = '';

    const allChars = [];

    rawText.split(' ').forEach(function (word, wi, words) {
      const wordEl = document.createElement('span');
      wordEl.className = 'bio-word';

      word.split('').forEach(function (ch) {
        const charEl = document.createElement('span');
        charEl.className = 'bio-char';
        charEl.textContent = ch;
        wordEl.appendChild(charEl);
        allChars.push(charEl);
      });

      para.appendChild(wordEl);
      if (wi < words.length - 1) para.appendChild(document.createTextNode(' '));
    });

    if (!isMobile) {
      allChars.forEach(function (ch, i) { ch.style.animationDelay = (i * 0.018) + 's'; });
      if (glass) glass.classList.add('bio-chars-ready');
    }

    if (prefersRed) {
      allChars.forEach(function (ch) {
        ch.style.opacity = '1';
        ch.style.transform = 'none';
        ch.style.filter = 'none';
      });
      return;
    }

    function whenGSAP(cb) {
      if (typeof gsap !== 'undefined') { cb(); return; }
      const t = setInterval(function () {
        if (typeof gsap !== 'undefined') { clearInterval(t); cb(); }
      }, 50);
    }

    whenGSAP(function () {
      gsap.set(allChars, { opacity: 0, z: -260, scale: 0.75, filter: 'blur(9px)', transformPerspective: 900 });

      let bioRevealed = false;
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting || bioRevealed) return;
          bioRevealed = true;
          gsap.to(allChars, {
            opacity: 1, z: 0, scale: 1, filter: 'blur(0px)',
            duration: 0.72, ease: 'power3.out',
            stagger: { amount: 1.5, from: 'random' }
          });
          obs.unobserve(para);
        });
      }, { threshold: 0.18 });

      obs.observe(para);

      if (isMobile || !glass) return;

      const RADIUS = 50;
      let rafId  = null;
      let mouseX = -9999, mouseY = -9999;

      function applyMagnet() {
        allChars.forEach(function (ch) {
          const r    = ch.getBoundingClientRect();
          const cx   = r.left + r.width  / 2;
          const cy   = r.top  + r.height / 2;
          const dist = Math.hypot(mouseX - cx, mouseY - cy);

          if (dist < RADIUS) {
            const s = 1 - dist / RADIUS;
            gsap.to(ch, { z: 14 * s, scale: 1 + 0.06 * s, filter: 'brightness(' + (1 + 0.55 * s) + ')', duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
          } else {
            gsap.to(ch, { z: 0, scale: 1, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
          }
        });
        rafId = null;
      }

      glass.addEventListener('mousemove', function (e) {
        mouseX = e.clientX; mouseY = e.clientY;
        if (!rafId) rafId = requestAnimationFrame(applyMagnet);
      });

      glass.addEventListener('mouseleave', function () {
        mouseX = -9999; mouseY = -9999;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        gsap.to(allChars, { z: 0, scale: 1, filter: 'brightness(1)', duration: 0.5, ease: 'power3.out' });
      });
    });
  }

  /* ════════════════════════════════════════════════════════════
     8. SVG SKILL RADAR + COUNT-UP STAT BARS
     ════════════════════════════════════════════════════════════ */
  function initSkillRadar() {
    const svg = document.getElementById('skill-radar-svg');
    if (!svg) return;

    const NS  = 'http://www.w3.org/2000/svg';
    const CX  = 150, CY = 150, MAXR = 105;
    const N   = 6;

    /* Skills in clockwise order starting from top */
    const skills = [
      { name: 'PHP',        pct: 80 },
      { name: 'Laravel',    pct: 80 },
      { name: 'CakePHP',    pct: 85 },
      { name: 'ASP.NET',    pct: 80 },
      { name: 'Node.js',    pct: 75 },
      { name: 'JavaScript', pct: 75 },
    ];

    function angle(i) { return -Math.PI / 2 + (i / N) * Math.PI * 2; }
    function pt(i, r) {
      return {
        x: CX + r * Math.cos(angle(i)),
        y: CY + r * Math.sin(angle(i)),
      };
    }
    function polyStr(radii) {
      return radii.map(function (r, i) {
        const p = pt(i, r);
        return p.x.toFixed(2) + ',' + p.y.toFixed(2);
      }).join(' ');
    }

    /* Build grid rings */
    const gridLevels = [0.25, 0.5, 0.75, 1.0];
    const gridG = document.createElementNS(NS, 'g');

    gridLevels.forEach(function (lvl) {
      const r    = MAXR * lvl;
      const pts  = skills.map(function (_, i) { return pt(i, r); });
      const poly = document.createElementNS(NS, 'polygon');
      poly.setAttribute('points', pts.map(function (p) { return p.x.toFixed(2) + ',' + p.y.toFixed(2); }).join(' '));
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', lvl === 1.0 ? 'rgba(24,210,110,0.22)' : 'rgba(24,210,110,0.1)');
      poly.setAttribute('stroke-width', '1');
      gridG.appendChild(poly);

      /* Percentage label on the right axis */
      const labelPt = pt(1, r); /* put label near the 1st axis */
      const txt = document.createElementNS(NS, 'text');
      txt.setAttribute('x', (CX + (MAXR * lvl + 6) * Math.cos(angle(1))).toFixed(1));
      txt.setAttribute('y', (CY + (MAXR * lvl + 6) * Math.sin(angle(1)) - 2).toFixed(1));
      txt.setAttribute('font-size', '7');
      txt.setAttribute('fill', 'rgba(200,220,200,0.35)');
      txt.setAttribute('font-family', 'Courier New, monospace');
      txt.textContent = Math.round(lvl * 100) + '%';
      gridG.appendChild(txt);
    });
    svg.appendChild(gridG);

    /* Build axes */
    const axisG = document.createElementNS(NS, 'g');
    skills.forEach(function (_, i) {
      const p    = pt(i, MAXR);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', CX); line.setAttribute('y1', CY);
      line.setAttribute('x2', p.x.toFixed(2)); line.setAttribute('y2', p.y.toFixed(2));
      line.setAttribute('stroke', 'rgba(24,210,110,0.18)');
      line.setAttribute('stroke-width', '1');
      axisG.appendChild(line);
    });
    svg.appendChild(axisG);

    /* Data polygon — starts at zero, animates to skill pct */
    const dataPoly = document.createElementNS(NS, 'polygon');
    dataPoly.setAttribute('points', polyStr(skills.map(function () { return 0; })));
    dataPoly.setAttribute('fill', 'rgba(24,210,110,0.14)');
    dataPoly.setAttribute('stroke', '#18d26e');
    dataPoly.setAttribute('stroke-width', '2');
    dataPoly.setAttribute('stroke-linejoin', 'round');
    dataPoly.style.filter = 'drop-shadow(0 0 8px rgba(24,210,110,0.5))';
    svg.appendChild(dataPoly);

    /* Skill labels */
    const labelG = document.createElementNS(NS, 'g');
    skills.forEach(function (sk, i) {
      const LABEL_R = MAXR + 20;
      const p       = pt(i, LABEL_R);
      const txt     = document.createElementNS(NS, 'text');
      txt.setAttribute('x', p.x.toFixed(2));
      txt.setAttribute('y', p.y.toFixed(2));
      txt.setAttribute('font-size', '9.5');
      txt.setAttribute('fill', 'rgba(200,220,200,0.8)');
      txt.setAttribute('font-family', 'Courier New, monospace');
      txt.setAttribute('font-weight', '700');
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('dominant-baseline', 'central');
      txt.textContent = sk.name;
      labelG.appendChild(txt);
    });
    svg.appendChild(labelG);

    /* Node dots at vertices */
    const nodeG = document.createElementNS(NS, 'g');
    const nodeDots = skills.map(function (sk, i) {
      const circle = document.createElementNS(NS, 'circle');
      circle.setAttribute('cx', CX);
      circle.setAttribute('cy', CY);
      circle.setAttribute('r', '3.5');
      circle.setAttribute('fill', '#18d26e');
      circle.style.filter = 'drop-shadow(0 0 4px #18d26e)';
      nodeG.appendChild(circle);
      return circle;
    });
    svg.appendChild(nodeG);

    /* Animate radar on scroll */
    let radarRevealed = false;

    function animateRadar() {
      if (radarRevealed) return;
      radarRevealed = true;

      const duration = 1400; /* ms */
      const start    = performance.now();

      function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

      function tick(now) {
        const t       = Math.min((now - start) / duration, 1);
        const eased   = easeOutCubic(t);
        const radii   = skills.map(function (sk) { return (sk.pct / 100) * MAXR * eased; });

        dataPoly.setAttribute('points', polyStr(radii));

        radii.forEach(function (r, i) {
          const p = pt(i, r);
          nodeDots[i].setAttribute('cx', p.x.toFixed(2));
          nodeDots[i].setAttribute('cy', p.y.toFixed(2));
        });

        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    /* Stat bars + count-up */
    const statItems = document.querySelectorAll('#skill-stat-list .skill-stat');

    function animateStats() {
      statItems.forEach(function (item, idx) {
        const pct      = parseInt(item.dataset.pct, 10) || 0;
        const fill     = item.querySelector('.skill-stat-fill');
        const countEl  = item.querySelector('.count-num');

        setTimeout(function () {
          item.classList.add('stat-revealed');

          /* Bar fill */
          if (fill) {
            setTimeout(function () { fill.style.width = pct + '%'; }, 100);
          }

          /* Count-up */
          if (countEl) {
            const dur   = 1200;
            const start = performance.now();
            function countTick(now) {
              const t = Math.min((now - start) / dur, 1);
              countEl.textContent = Math.round(t * pct);
              if (t < 1) requestAnimationFrame(countTick);
            }
            requestAnimationFrame(countTick);
          }
        }, idx * 110);
      });
    }

    const skillsSection = document.querySelector('.skills-radar');
    if (!skillsSection) return;

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        animateRadar();
        animateStats();
        obs.unobserve(en.target);
      });
    }, { threshold: 0.25 });

    obs.observe(skillsSection);
  }

  /* ════════════════════════════════════════════════════════════
     9. INTEREST GRID — 3D Pop + Tooltip + Magnetic Cursor Pull
     ════════════════════════════════════════════════════════════ */
  function initInterestsGrid() {
    const grid = document.querySelector('.interests-3d');
    if (!grid) return;

    const items    = grid.querySelectorAll('.icon-box');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    /* Populate tooltip text from data-tip */
    items.forEach(function (item) {
      const tip    = item.querySelector('.interest-tip');
      const tipTxt = item.getAttribute('data-tip');
      if (tip && tipTxt) tip.textContent = tipTxt;
    });

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

    if (isMobile) return;

    /* Magnetic cursor pull on icon-inner */
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
