(function() {
  'use strict';

  const elements = {
    modal: document.getElementById('data-structure-modal'),
    content: document.getElementById('data-structure-modal-content'),
    backdrop: document.getElementById('data-structure-modal-backdrop'),
    closeBtn: document.getElementById('data-structure-modal-close')
  };

  const state = {
    isOpen: false,
    hoverCard: false,
    hoverModal: false,
    closeTimeout: null
  };

  function openModal() {
    if (state.isOpen || !elements.modal || !elements.content) return;
    state.isOpen = true;

    elements.modal.style.display = 'flex';
    elements.content.classList.add('open', 'glitch');
    elements.content.style.animation = 'glitch-entrance 0.34s ease-out forwards';

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!state.isOpen || !elements.modal || !elements.content) return;
    state.isOpen = false;

    elements.content.classList.remove('glitch');
    elements.content.style.animation = 'modal-scale-out 0.26s ease forwards';

    clearTimeout(state.closeTimeout);
    state.closeTimeout = window.setTimeout(() => {
      elements.modal.style.display = 'none';
      elements.content.style.animation = '';
      document.body.style.overflow = '';
    }, 260);
  }

  function scheduleClose() {
    clearTimeout(state.closeTimeout);
    state.closeTimeout = window.setTimeout(() => {
      if (!state.hoverCard && !state.hoverModal) {
        closeModal();
      }
    }, 140);
  }

  function clearClose() {
    if (state.closeTimeout) {
      clearTimeout(state.closeTimeout);
      state.closeTimeout = null;
    }
  }

  function initCardHover() {
    const dsCard = Array.from(document.querySelectorAll('.icon-box')).find(card => {
      const title = card.querySelector('h3');
      return title && title.textContent.trim() === 'Data Structure';
    });

    if (!dsCard || !elements.modal) return;

    dsCard.addEventListener('mouseenter', () => {
      state.hoverCard = true;
      clearClose();
      openModal();
    });

    dsCard.addEventListener('mouseleave', () => {
      state.hoverCard = false;
      scheduleClose();
    });

    elements.modal.addEventListener('mouseenter', () => {
      state.hoverModal = true;
      clearClose();
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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && state.isOpen) {
        closeModal();
      }
    });
  }

  function initCursorMotion() {
    if (!elements.content) return;

    elements.content.addEventListener('mousemove', (event) => {
      const rect = elements.content.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      elements.content.style.setProperty('--cursor-x', x.toFixed(3));
      elements.content.style.setProperty('--cursor-y', y.toFixed(3));
    });
  }

  function init() {
    initCardHover();
    initCursorMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();