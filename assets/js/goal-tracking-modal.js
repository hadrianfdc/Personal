(function() {
  'use strict';

  const elements = {
    modal: document.getElementById('goal-modal'),
    modalContent: document.getElementById('goal-modal-content'),
    backdrop: document.getElementById('goal-modal-backdrop'),
    closeBtn: document.getElementById('goal-modal-close'),
    counter: document.getElementById('goal-counter-value'),
    checkmark: document.getElementById('goal-checkmark')
  };

  const state = {
    isOpen: false,
    closeTimeout: null,
    counterValue: 0,
    counterAnimation: null,
    ringAnimation: null,
    hoverTarget: false,
    hoverModal: false
  };

  const ringConfigs = [
    { selector: '.ring-outer-fill', percent: 75 },
    { selector: '.ring-middle-fill', percent: 90 },
    { selector: '.ring-inner-fill', percent: 60 }
  ];

  function createRing(circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    return { circle, circumference };
  }

  function updateRing(ring, percent) {
    const offset = ring.circumference * (1 - percent / 100);
    ring.circle.style.strokeDashoffset = offset;
  }

  function animateRings() {
    const ringEls = ringConfigs.map(cfg => {
      const circle = document.querySelector(cfg.selector);
      return createRing(circle);
    });

    const startTime = performance.now();
    const duration = 700;

    function step(timestamp) {
      const elapsed = Math.min((timestamp - startTime) / duration, 1);
      ringConfigs.forEach((cfg, index) => {
        const target = cfg.percent;
        const current = Math.round(target * elapsed);
        updateRing(ringEls[index], current);
      });

      if (elapsed < 1) {
        state.ringAnimation = requestAnimationFrame(step);
      } else {
        state.ringAnimation = null;
        revealCheckmark();
      }
    }

    if (state.ringAnimation) {
      cancelAnimationFrame(state.ringAnimation);
    }
    state.ringAnimation = requestAnimationFrame(step);
  }

  function animateCounter() {
    const target = 42;
    const duration = 600;
    const startTime = performance.now();

    function step(timestamp) {
      const elapsed = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(target * elapsed);
      if (elements.counter) {
        elements.counter.textContent = current;
      }

      if (elapsed < 1) {
        state.counterAnimation = requestAnimationFrame(step);
      } else {
        state.counterAnimation = null;
      }
    }

    if (state.counterAnimation) {
      cancelAnimationFrame(state.counterAnimation);
    }
    state.counterAnimation = requestAnimationFrame(step);
  }

  function revealCheckmark() {
    if (elements.checkmark) {
      elements.checkmark.classList.add('revealed');
    }
  }

  function resetCheckmark() {
    if (elements.checkmark) {
      elements.checkmark.classList.remove('revealed');
    }
  }

  function openModal() {
    if (state.isOpen) return;
    state.isOpen = true;

    if (elements.modal) {
      elements.modal.style.display = 'flex';
    }
    if (elements.modalContent) {
      elements.modalContent.style.animation = '';
      elements.modalContent.classList.add('open', 'glow');
    }

    animateCounter();
    animateRings();

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    state.isOpen = false;

    if (elements.modalContent) {
      elements.modalContent.classList.remove('open', 'glow');
      elements.modalContent.style.animation = 'modal-scale-out 0.28s ease forwards';
    }

    if (state.counterAnimation) {
      cancelAnimationFrame(state.counterAnimation);
      state.counterAnimation = null;
    }
    if (state.ringAnimation) {
      cancelAnimationFrame(state.ringAnimation);
      state.ringAnimation = null;
    }

    resetCheckmark();

    setTimeout(() => {
      if (elements.modal) {
        elements.modal.style.display = 'none';
      }
      if (elements.modalContent) {
        elements.modalContent.style.animation = '';
      }
      document.body.style.overflow = '';
    }, 280);
  }

  function scheduleClose() {
    clearCloseTimeout();
    state.closeTimeout = window.setTimeout(() => {
      if (!state.hoverTarget && !state.hoverModal) {
        closeModal();
      }
    }, 150);
  }

  function clearCloseTimeout() {
    if (state.closeTimeout) {
      clearTimeout(state.closeTimeout);
      state.closeTimeout = null;
    }
  }

  function initHoverListeners() {
    const goalCard = Array.from(document.querySelectorAll('.icon-box')).find(card => {
      const title = card.querySelector('h3');
      return title && title.textContent.trim() === 'Goal Tracking';
    });

    if (!goalCard || !elements.modal) {
      return;
    }

    goalCard.addEventListener('mouseenter', () => {
      state.hoverTarget = true;
      clearCloseTimeout();
      openModal();
    });

    goalCard.addEventListener('mouseleave', () => {
      state.hoverTarget = false;
      scheduleClose();
    });

    elements.modal.addEventListener('mouseenter', () => {
      state.hoverModal = true;
      clearCloseTimeout();
    });

    elements.modal.addEventListener('mouseleave', () => {
      state.hoverModal = false;
      scheduleClose();
    });

    if (elements.backdrop) {
      elements.backdrop.addEventListener('click', closeModal);
    }

    if (elements.closeBtn) {
      elements.closeBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isOpen) {
        closeModal();
      }
    });
  }

  function initRingSetup() {
    ringConfigs.forEach(cfg => {
      const circle = document.querySelector(cfg.selector);
      if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
      }
    });
  }

  function init() {
    initRingSetup();
    initHoverListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();