// Coding Challenges Modal - High-Impact Interactive Experience
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    typewriter: {
      speed: 50,
      pauseBetween: 2000,
      phrases: [
        'function dijkstra(graph, start) {',
        'class BinaryTree { constructor() {',
        'def recursive_backtrack(maze):',
        'const memoize = (fn) => {',
        'public void quickSort(int[] arr) {',
        'SELECT * FROM users WHERE id = ?',
        'git commit -m "Solved LeetCode #42"',
        'npm install algorithm-visualizer'
      ]
    },
    matrix: {
      chars: '01',
      fontSize: 14,
      speed: 30
    }
  };

  // DOM Elements
  const elements = {
    modal: document.getElementById('coding-modal'),
    backdrop: document.getElementById('modal-backdrop'),
    content: document.getElementById('modal-content'),
    closeBtn: document.getElementById('modal-close'),
    codingCard: null, // Will be set in initEventListeners
    typewriterText: document.getElementById('typewriter-text'),
    cursor: document.getElementById('cursor'),
    matrixCanvas: document.getElementById('matrix-canvas')
  };

  // State
  const state = {
    isOpen: false,
    typewriterIndex: 0,
    typewriterCharIndex: 0,
    isTyping: false,
    matrixDrops: [],
    animationFrame: null
  };

  // Matrix Rain Effect
  function initMatrixRain() {
    if (!elements.matrixCanvas) return;

    const canvas = elements.matrixCanvas;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initDrops();
    }

    function initDrops() {
      state.matrixDrops = [];
      const columns = Math.floor(canvas.width / CONFIG.matrix.fontSize);

      for (let i = 0; i < columns; i++) {
        state.matrixDrops[i] = Math.random() * canvas.height;
      }
    }

    function draw() {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88'; // Matrix green
      ctx.font = CONFIG.matrix.fontSize + 'px monospace';

      for (let i = 0; i < state.matrixDrops.length; i++) {
        const text = CONFIG.matrix.chars[Math.floor(Math.random() * CONFIG.matrix.chars.length)];
        ctx.fillText(text, i * CONFIG.matrix.fontSize, state.matrixDrops[i] * CONFIG.matrix.fontSize);

        if (state.matrixDrops[i] * CONFIG.matrix.fontSize > canvas.height && Math.random() > 0.975) {
          state.matrixDrops[i] = 0;
        }
        state.matrixDrops[i]++;
      }
    }

    function animate() {
      draw();
      state.animationFrame = requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
  }

  // Typewriter Effect
  function typeWriter() {
    if (!elements.typewriterText || state.isTyping) return;

    state.isTyping = true;
    const currentPhrase = CONFIG.typewriter.phrases[state.typewriterIndex];

    function typeChar() {
      if (state.typewriterCharIndex < currentPhrase.length) {
        elements.typewriterText.textContent = currentPhrase.substring(0, state.typewriterCharIndex + 1);
        state.typewriterCharIndex++;
        setTimeout(typeChar, CONFIG.typewriter.speed);
      } else {
        // Pause before next phrase
        setTimeout(() => {
          state.typewriterCharIndex = 0;
          state.typewriterIndex = (state.typewriterIndex + 1) % CONFIG.typewriter.phrases.length;
          state.isTyping = false;
          typeWriter(); // Start next phrase
        }, CONFIG.typewriter.pauseBetween);
      }
    }

    typeChar();
  }

  // Modal Animation Functions
  function openModal() {
    if (state.isOpen) return;

    state.isOpen = true;
    elements.modal.style.display = 'flex';

    // Trigger animations
    requestAnimationFrame(() => {
      elements.content.style.animation = 'modal-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    });

    // Start effects
    initMatrixRain();
    typeWriter();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!state.isOpen) return;

    state.isOpen = false;

    // Animate out
    elements.content.style.animation = 'modal-scale-out 0.3s ease-in forwards';

    // Hide after animation
    setTimeout(() => {
      elements.modal.style.display = 'none';
      document.body.style.overflow = '';

      // Stop matrix animation
      if (state.animationFrame) {
        cancelAnimationFrame(state.animationFrame);
        state.animationFrame = null;
      }
    }, 300);
  }

  // Mouse glow effect for the card
  function initGlowEffect() {
    if (!elements.codingCard) return;

    const card = elements.codingCard;

    function updateGlow(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--glow-x', x + 'px');
      card.style.setProperty('--glow-y', y + 'px');
    }

    card.addEventListener('mousemove', updateGlow);
    card.addEventListener('mouseenter', () => {
      card.classList.add('glow-active');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('glow-active');
    });
  }

  // Event Listeners
  function initEventListeners() {
    // Find the coding challenges card
    const codingCard = Array.from(document.querySelectorAll('.icon-box')).find(card => {
      const h3 = card.querySelector('h3');
      return h3 && h3.textContent.trim() === 'Coding Challenges';
    });

    if (codingCard) {
      elements.codingCard = codingCard;

      // Hover to open modal
      codingCard.addEventListener('mouseenter', (e) => {
        openModal();
      });

      // Click to open modal (fallback)
      codingCard.addEventListener('click', openModal);
    }

    // Close modal events
    if (elements.backdrop) {
      elements.backdrop.addEventListener('click', closeModal);
    }

    if (elements.closeBtn) {
      elements.closeBtn.addEventListener('click', closeModal);
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isOpen) {
        closeModal();
      }
    });

    // Initialize glow effect
    initGlowEffect();
  }

  // Initialize
  function init() {
    initEventListeners();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();