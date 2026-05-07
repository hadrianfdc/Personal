(function() {
  'use strict';

  function isHomePage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const filename = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
    return filename === '' || filename === 'index.html' || filename === 'index.htm';
  }

  if (!isHomePage()) {
    return;
  }

  const navbar = document.getElementById('navbar');
  const lens = document.getElementById('nav-magnifier');
  const canvas = document.getElementById('nav-magnifier-canvas');
  if (!navbar || !lens || !canvas) return;

  const ctx = canvas.getContext('2d');
  const links = Array.from(navbar.querySelectorAll('.nav-link'));

  const lensSize = 168;
  const radius = lensSize / 2;
  const magnification = 1.45;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);

  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d');

  let activeLink = null;
  let currentX = -999;
  let currentY = -999;
  let targetX = -999;
  let targetY = -999;
  let cursorRelX = 0.5;
  let cursorRelY = 0.5;
  let rafId = null;

  function resizeCanvas() {
    canvas.width = lensSize * dpr;
    canvas.height = lensSize * dpr;
    canvas.style.width = `${lensSize}px`;
    canvas.style.height = `${lensSize}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    offscreen.width = lensSize * dpr;
    offscreen.height = lensSize * dpr;
    offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawMagnifiedText(link) {
    if (!link) return;

    const text = link.textContent.trim();
    const style = getComputedStyle(link);
    const baseFontSize = parseFloat(style.fontSize) || 18;
    const fontFamily = style.fontFamily || 'Poppins, sans-serif';
    const fontWeight = style.fontWeight || '700';
    const magnifiedFont = `${fontWeight} ${baseFontSize * magnification}px ${fontFamily}`;

    offCtx.clearRect(0, 0, lensSize, lensSize);
    offCtx.save();
    offCtx.font = magnifiedFont;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = style.color || '#ffffff';
    offCtx.fillText(text, radius, radius);
    offCtx.restore();

    ctx.clearRect(0, 0, lensSize, lensSize);
    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 1, 0, Math.PI * 2);
    ctx.clip();

    const bgGradient = ctx.createRadialGradient(radius * 0.3, radius * 0.3, 0, radius, radius, radius);
    bgGradient.addColorStop(0, 'rgba(255,255,255,0.12)');
    bgGradient.addColorStop(1, 'rgba(30, 45, 80, 0.16)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, lensSize, lensSize);

    const slideX = (cursorRelX - 0.5) * 24;
    const slideY = (cursorRelY - 0.5) * 12;
    const sourceWidth = lensSize * dpr;

    const distortionSteps = 5;
    for (let row = 0; row < lensSize; row += distortionSteps) {
      const ratio = (row - radius) / radius;
      const warp = 1 + Math.sin(ratio * Math.PI) * 0.08;
      const drawWidth = lensSize * warp;
      const destX = (lensSize - drawWidth) / 2 + slideX;
      const destY = row + slideY * Math.sin((row / lensSize) * Math.PI) * 0.24;
      ctx.drawImage(
        offscreen,
        0,
        row * dpr,
        sourceWidth,
        distortionSteps * dpr,
        destX,
        destY,
        drawWidth,
        distortionSteps
      );
    }

    const lensShine = ctx.createRadialGradient(radius * 0.55, radius * 0.35, 0, radius, radius, radius);
    lensShine.addColorStop(0, 'rgba(255,255,255,0.12)');
    lensShine.addColorStop(0.7, 'rgba(255,255,255,0.02)');
    lensShine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = lensShine;
    ctx.fillRect(0, 0, lensSize, lensSize);

    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 1.5, 0, Math.PI * 2);
    const edgeGradient = ctx.createRadialGradient(radius * 0.3, radius * 0.3, 0, radius, radius, radius);
    edgeGradient.addColorStop(0, 'rgba(255,255,255,0.38)');
    edgeGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
    edgeGradient.addColorStop(1, 'rgba(255,255,255,0.18)');
    ctx.strokeStyle = edgeGradient;
    ctx.lineWidth = 2.2;
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    currentX += (targetX - currentX) * 0.24;
    currentY += (targetY - currentY) * 0.24;
    lens.style.left = `${currentX}px`;
    lens.style.top = `${currentY}px`;

    if (activeLink) {
      drawMagnifiedText(activeLink);
    }

    rafId = window.requestAnimationFrame(animate);
  }

  function showLens() {
    if (!lens.classList.contains('open')) {
      lens.classList.add('open');
      lens.setAttribute('aria-hidden', 'false');
    }
    if (!rafId) {
      currentX = targetX;
      currentY = targetY;
      rafId = window.requestAnimationFrame(animate);
    }
  }

  function hideLens() {
    if (lens.classList.contains('open')) {
      lens.classList.remove('open');
      lens.setAttribute('aria-hidden', 'true');
    }
    activeLink = null;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function updateCursor(event) {
    if (!event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    cursorRelX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    cursorRelY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const margin = radius + 8;
    targetX = Math.min(window.innerWidth - margin, Math.max(margin, event.clientX));
    targetY = Math.min(window.innerHeight - margin, Math.max(margin, rect.top + rect.height / 2));
  }

  function onLinkEnter(event) {
    activeLink = event.currentTarget;
    updateCursor(event);
    showLens();
  }

  function onLinkMove(event) {
    updateCursor(event);
  }

  function onLinkLeave() {
    hideLens();
  }

  links.forEach((link) => {
    link.addEventListener('mouseenter', onLinkEnter);
    link.addEventListener('mousemove', onLinkMove);
    link.addEventListener('mouseleave', onLinkLeave);
    link.addEventListener('focus', onLinkEnter);
    link.addEventListener('blur', onLinkLeave);
  });

  navbar.addEventListener('mouseleave', hideLens);
  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
})();
