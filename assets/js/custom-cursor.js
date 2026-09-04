(function () {
  'use strict';

  const supportsCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!supportsCursor || reduceMotion) return;

  document.documentElement.classList.add('has-custom-cursor');

  const DEFAULT_SIZE = 34;
  const HOVER_SIZE = 64;

  const ring = document.createElement('div');
  ring.className = 'cc-ring';
  const dot = document.createElement('div');
  dot.className = 'cc-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let prevRingX = ringX;
  let prevRingY = ringY;
  let started = false;

  // 'default' | 'hover' | 'nav'
  let state = 'default';
  let navTarget = null;

  function centerTransform(x, y) {
    return 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      ringX = mouseX;
      ringY = mouseY;
      prevRingX = ringX;
      prevRingY = ringY;
      started = true;
    }
    dot.style.transform = centerTransform(mouseX, mouseY);
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  function tick() {
    const isNav = state === 'nav';
    const targetX = isNav && navTarget ? navTarget.x : mouseX;
    const targetY = isNav && navTarget ? navTarget.y : mouseY;
    const lerp = isNav ? 0.24 : (state === 'hover' ? 0.07 : 0.09);

    ringX += (targetX - ringX) * lerp;
    ringY += (targetY - ringY) * lerp;

    const dx = ringX - prevRingX;
    const dy = ringY - prevRingY;
    const dist = Math.min(Math.hypot(dx, dy), 60);

    let transform = centerTransform(ringX, ringY);

    // Ring stretches along its travel direction, proportional to lag distance —
    // only in the free-roaming default state (hover/nav states hold their shape).
    if (state === 'default' && dist > 0.4) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const stretch = 1 + Math.min(dist * 0.028, 0.85);
      const squash = 1 - Math.min(dist * 0.014, 0.4);
      transform += ' rotate(' + angle + 'deg) scale(' + stretch + ', ' + squash + ')';
    }

    ring.style.transform = transform;

    prevRingX = ringX;
    prevRingY = ringY;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function setHoverState() {
    if (state === 'nav') return;
    state = 'hover';
    ring.classList.add('cc-hover');
    ring.style.width = HOVER_SIZE + 'px';
    ring.style.height = HOVER_SIZE + 'px';
    ring.style.borderRadius = '50%';
  }

  function clearHoverState() {
    if (state !== 'hover') return;
    state = 'default';
    ring.classList.remove('cc-hover');
    ring.style.width = DEFAULT_SIZE + 'px';
    ring.style.height = DEFAULT_SIZE + 'px';
    ring.style.borderRadius = '50%';
  }

  const hoverSelector = 'a, button, .btn, input[type="submit"], .skill-chip, .icon-box, [data-cursor="hover"]';
  document.querySelectorAll(hoverSelector).forEach((el) => {
    if (el.closest('#navbar')) return; // nav links get the pill treatment instead
    el.addEventListener('mouseenter', setHoverState);
    el.addEventListener('mouseleave', clearHoverState);
  });

  // Nav pill morph — the ring snaps to each nav link's bounds and follows it.
  const navLinks = document.querySelectorAll('#navbar .nav-link');
  function updateNavTarget(link) {
    const r = link.getBoundingClientRect();
    navTarget = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    ring.style.width = (r.width + 36) + 'px';
    ring.style.height = (r.height + 22) + 'px';
  }

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      state = 'nav';
      ring.classList.remove('cc-hover');
      ring.classList.add('cc-nav');
      ring.style.borderRadius = '999px';
      dot.classList.add('cc-nav-hidden');
      updateNavTarget(link);
    });
    link.addEventListener('mousemove', () => {
      if (state === 'nav') updateNavTarget(link);
    });
    link.addEventListener('mouseleave', () => {
      state = 'default';
      navTarget = null;
      ring.classList.remove('cc-nav');
      ring.style.width = DEFAULT_SIZE + 'px';
      ring.style.height = DEFAULT_SIZE + 'px';
      ring.style.borderRadius = '50%';
      dot.classList.remove('cc-nav-hidden');
    });
  });

  window.addEventListener('resize', () => {
    if (!started) {
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
    }
  });
})();
