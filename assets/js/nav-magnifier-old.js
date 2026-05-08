(function() {
  'use strict';

  function initMagnifier() {
    const navbar = document.getElementById('navbar');
    const magnifier = document.getElementById('nav-magnifier');
    const svg = document.getElementById('magnifying-glass-svg');
    if (!navbar || !magnifier || !svg) return;

    const ctx = canvas.getContext('2d');
    const links = Array.from(navbar.querySelectorAll('.nav-link'));

    const lensSize = 168;
    const radius = lensSize / 2;
    const magnification = 1.45;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);

    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');

    let activeLink = null;
    let targetX = -999;
    let targetY = -999;
    let cursorRelX = 0.5;
    let cursorRelY = 0.5;
    let listenersEnabled = false;

    // GSAP QuickSetters for performance
    const setLensX = gsap.quickSetter(lens, "x", "px");
    const setLensY = gsap.quickSetter(lens, "y", "px");
    const setLensOpacity = gsap.quickSetter(lens, "opacity");

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

      // Enhanced background with refraction effect
      const bgGradient = ctx.createRadialGradient(radius * 0.3, radius * 0.3, 0, radius, radius, radius);
      bgGradient.addColorStop(0, 'rgba(255,255,255,0.15)');
      bgGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.05)'); // Subtle cyan haze
      bgGradient.addColorStop(1, 'rgba(30, 45, 80, 0.2)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, lensSize, lensSize);

      // Distortion effect
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

      // Enhanced shine with chromatic aberration
      const lensShine = ctx.createRadialGradient(radius * 0.55, radius * 0.35, 0, radius, radius, radius);
      lensShine.addColorStop(0, 'rgba(255,255,255,0.15)');
      lensShine.addColorStop(0.7, 'rgba(255,255,255,0.05)');
      lensShine.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = lensShine;
      ctx.fillRect(0, 0, lensSize, lensSize);

      ctx.restore();

      // Soft edge with blur
      ctx.save();
      ctx.beginPath();
      ctx.arc(radius, radius, radius - 1.5, 0, Math.PI * 2);
      ctx.shadowColor = 'rgba(255,255,255,0.3)';
      ctx.shadowBlur = 2;
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Moving glint effect
      const glintX = radius + Math.sin(Date.now() * 0.005) * 30;
      const glintY = radius + Math.cos(Date.now() * 0.005) * 20;
      ctx.save();
      ctx.beginPath();
      ctx.arc(glintX, glintY, 8, 0, Math.PI * 2);
      const glintGradient = ctx.createRadialGradient(glintX, glintY, 0, glintX, glintY, 8);
      glintGradient.addColorStop(0, 'rgba(255,255,255,0.8)');
      glintGradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glintGradient;
      ctx.fill();
      ctx.restore();
    }

    function showLens() {
      gsap.to(lens, { opacity: 1, duration: 0.3, ease: "power2.out" });
    }

    function hideLens() {
      gsap.to(lens, { opacity: 0, duration: 0.3, ease: "power2.out" });
      activeLink = null;
    }

    function updateCursor(event) {
      if (!event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      cursorRelX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      cursorRelY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      const margin = radius + 8;
      targetX = Math.min(window.innerWidth - margin, Math.max(margin, event.clientX));
      targetY = Math.min(window.innerHeight - margin, Math.max(margin, rect.top + rect.height / 2));

      // Smooth animation to target position
      gsap.to({}, {
        duration: 0.4,
        ease: "power2.out",
        onUpdate: () => {
          setLensX(targetX);
          setLensY(targetY);
          if (activeLink) {
            drawMagnifiedText(activeLink);
          }
        }
      });
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

    function enableListeners() {
      if (listenersEnabled) return;
      listenersEnabled = true;
      links.forEach((link) => {
        link.addEventListener('mouseenter', onLinkEnter);
        link.addEventListener('mousemove', onLinkMove);
        link.addEventListener('mouseleave', onLinkLeave);
        link.addEventListener('focus', onLinkEnter);
        link.addEventListener('blur', onLinkLeave);
      });
      navbar.addEventListener('mouseleave', hideLens);
    }

    function disableListeners() {
      if (!listenersEnabled) return;
      listenersEnabled = false;
      hideLens();
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onLinkEnter);
        link.removeEventListener('mousemove', onLinkMove);
        link.removeEventListener('mouseleave', onLinkLeave);
        link.removeEventListener('focus', onLinkEnter);
        link.removeEventListener('blur', onLinkLeave);
      });
      navbar.removeEventListener('mouseleave', hideLens);
    }

    // Check if Home section is active based on nav link highlight
    function isHomeActive() {
      const homeLink = document.querySelector('.navbar a[href="#header"]');
      return homeLink && homeLink.classList.contains('active');
    }

    function updateListeners() {
      if (isHomeActive()) {
        enableListeners();
      } else {
        disableListeners();
      }
    }

    // Initial check
    updateListeners();

    // Listen for changes to the active class
    // Use MutationObserver on the navbar to detect when active class changes
    if (navbar) {
      const observer = new MutationObserver(updateListeners);
      observer.observe(navbar, { attributes: true, subtree: true, attributeFilter: ['class'] });
    }

    // Also listen for scroll to update in case the scroll spy updates on scroll
    window.addEventListener('scroll', updateListeners);

    // Hide lens on navigation clicks
    links.forEach((link) => {
      link.addEventListener('click', hideLens);
    });

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
  }

  // Wait for GSAP to load
  if (typeof gsap !== 'undefined') {
    initMagnifier();
  } else {
    window.addEventListener('load', () => {
      if (typeof gsap !== 'undefined') {
        initMagnifier();
      }
    });
  }
})();
