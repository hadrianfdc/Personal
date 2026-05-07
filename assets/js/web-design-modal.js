(function() {
  'use strict';

  const modal = document.getElementById('web-design-modal');
  const modalContent = document.getElementById('web-design-modal-content');
  const modalBackdrop = document.getElementById('web-design-modal-backdrop');
  const closeBtn = document.getElementById('web-design-modal-close');
  const card = document.querySelector('.icon-box[data-modal-card="web-design"]');
  const preview = document.getElementById('web-design-typo-preview');
  const swatches = Array.from(document.querySelectorAll('.web-design-swatch'));

  const fonts = [
    {
      label: 'Serif Elegance',
      family: "'Cormorant Garamond', Georgia, serif"
    },
    {
      label: 'Sans Clarity',
      family: "'Inter', 'Helvetica Neue', sans-serif"
    },
    {
      label: 'Monospace Precision',
      family: "'JetBrains Mono', Consolas, monospace"
    }
  ];

  let fontIndex = 0;
  let typoInterval = null;
  let isOpen = false;

  function updateTypo() {
    if (!preview) return;
    const next = fonts[fontIndex];
    preview.textContent = next.label;
    preview.style.fontFamily = next.family;
    fontIndex = (fontIndex + 1) % fonts.length;
  }

  function startTypoCycle() {
    updateTypo();
    if (typoInterval) {
      clearInterval(typoInterval);
    }
    typoInterval = window.setInterval(updateTypo, 2800);
  }

  function stopTypoCycle() {
    if (typoInterval) {
      clearInterval(typoInterval);
      typoInterval = null;
    }
  }

  function setModalPosition() {
    if (!modalContent || !card) return;

    const rect = card.getBoundingClientRect();
    const vw = window.innerWidth;
    const isMobile = vw < 768;

    modalContent.classList.toggle('fullscreen', isMobile);

    if (isMobile) {
      modalContent.style.left = '50%';
      modalContent.style.top = '24px';
      modalContent.style.width = 'calc(100vw - 2rem)';
      modalContent.style.transform = 'translate(-50%, 0) scale(1)';
      return;
    }

    const modalWidth = Math.min(560, Math.max(420, vw - 96));
    const centerX = rect.left + rect.width / 2;
    const contentHeight = modalContent.offsetHeight || 480;
    const aboveTop = rect.top - 24 - contentHeight;
    const belowTop = rect.bottom + 24;
    const chosenTop = aboveTop > 24 ? aboveTop : belowTop;

    const minLeft = 36 + modalWidth / 2;
    const maxLeft = vw - 36 - modalWidth / 2;
    const left = Math.min(maxLeft, Math.max(minLeft, centerX));

    modalContent.style.width = `${modalWidth}px`;
    modalContent.style.left = `${left}px`;
    modalContent.style.top = `${Math.max(24, chosenTop)}px`;
    modalContent.style.transform = 'translate(-50%, 0) scale(0.96)';
  }

  function animateEntrance() {
    if (!modalContent || !modalContent.animate) return;

    modalContent.animate(
      [
        { transform: 'translate(-50%, 24px) scale(0.92)', opacity: 0 },
        { transform: 'translate(-50%, 0) scale(1)', opacity: 1 }
      ],
      {
        duration: 420,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }
    );
  }

  function openModal() {
    if (!modal || !modalContent || isOpen) return;

    setModalPosition();
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');

    window.requestAnimationFrame(() => {
      modal.classList.add('open');
      modalContent.classList.add('open');
      animateEntrance();
    });

    startTypoCycle();
    isOpen = true;
  }

  function closeModal() {
    if (!modal || !modalContent || !isOpen) return;

    modal.classList.remove('open');
    modalContent.classList.remove('open');
    stopTypoCycle();

    window.setTimeout(() => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }, 320);

    isOpen = false;
  }

  function initHoverListeners() {
    if (!card || !modal) return;

    let cardOver = false;
    let modalOver = false;

    const scheduleClose = () => {
      window.setTimeout(() => {
        if (!cardOver && !modalOver) {
          closeModal();
        }
      }, 140);
    };

    card.addEventListener('mouseenter', () => {
      cardOver = true;
      openModal();
    });

    card.addEventListener('mouseleave', () => {
      cardOver = false;
      scheduleClose();
    });

    modal.addEventListener('mouseenter', () => {
      modalOver = true;
    });

    modal.addEventListener('mouseleave', () => {
      modalOver = false;
      scheduleClose();
    });

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', () => {
        closeModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    });

    window.addEventListener('resize', () => {
      if (isOpen) {
        setModalPosition();
      }
    });

    swatches.forEach((swatch) => {
      swatch.addEventListener('mouseenter', () => {
        const label = swatch.dataset.hex || '';
        const span = swatch.querySelector('span');
        if (span) {
          span.textContent = label;
        }
      });
    });
  }

  function init() {
    initHoverListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
