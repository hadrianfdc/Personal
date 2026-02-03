// Utility functions for the portfolio website

(function() {
  'use strict';

  // Copy to Clipboard functionality
  function initCopyButtons() {
    // Copy phone number button
    const copyPhoneBtn = document.getElementById('copy-btn');
    if (copyPhoneBtn) {
      copyPhoneBtn.addEventListener('click', function() {
        const phoneNumber = document.getElementById('phone-number');
        if (phoneNumber) {
          const text = phoneNumber.innerText;
          navigator.clipboard.writeText(text).then(function() {
            alert('Phone number copied to clipboard!');
          }).catch(function(error) {
            console.error('Could not copy phone number: ', error);
          });
        }
      });
    }
  }

  // Education Modal functionality
  function initEducationModal() {
    const educationContainer = document.querySelector('.education-container');
    const modal = document.getElementById('educationModal');
    const overlay = document.getElementById('educationModalOverlay');
    const closeBtn = document.getElementById('educationModalCloseBtn');

    if (!educationContainer || !modal || !overlay || !closeBtn) return;

    // Open modal on click
    educationContainer.addEventListener('click', function(e) {
      // Prevent opening if clicking on the modal itself
      if (e.target.closest('.education-modal')) return;
      
      modal.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal functions
    function closeEducationModal() {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    }

    // Close on close button click
    closeBtn.addEventListener('click', closeEducationModal);

    // Close on overlay click
    overlay.addEventListener('click', closeEducationModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeEducationModal();
      }
    });
  }

  // About Description Modal functionality
  function initAboutModal() {
    const aboutContainer = document.querySelector('.about-description-container');
    const modal = document.getElementById('aboutModal');
    const overlay = document.getElementById('aboutModalOverlay');
    const closeBtn = document.getElementById('aboutModalCloseBtn');

    if (!aboutContainer || !modal || !overlay || !closeBtn) return;

    // Open modal on click
    aboutContainer.addEventListener('click', function(e) {
      // Prevent opening if clicking on the modal itself
      if (e.target.closest('.about-modal')) return;
      
      modal.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal functions
    function closeAboutModal() {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    }

    // Close on close button click
    closeBtn.addEventListener('click', closeAboutModal);

    // Close on overlay click
    overlay.addEventListener('click', closeAboutModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeAboutModal();
      }
    });
  }

  // Technical Expertise Modal functionality
  function initTechnicalModal() {
    const technicalContainer = document.querySelector('.technical-expertise-container');
    const modal = document.getElementById('technicalModal');
    const overlay = document.getElementById('technicalModalOverlay');
    const closeBtn = document.getElementById('technicalModalCloseBtn');

    if (!technicalContainer || !modal || !overlay || !closeBtn) return;

    // Open modal on click
    technicalContainer.addEventListener('click', function(e) {
      // Prevent opening if clicking on the modal itself
      if (e.target.closest('.technical-modal')) return;
      
      modal.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal functions
    function closeTechnicalModal() {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    }

    // Close on close button click
    closeBtn.addEventListener('click', closeTechnicalModal);

    // Close on overlay click
    overlay.addEventListener('click', closeTechnicalModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeTechnicalModal();
      }
    });
  }

  // Modal functionality
  function initModal() {
    const summaryContainer = document.querySelector('.resume-summary-container');
    const modal = document.getElementById('summaryModal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalCloseBtn');

    if (!summaryContainer || !modal || !overlay || !closeBtn) return;

    // Open modal on click
    summaryContainer.addEventListener('click', function(e) {
      // Prevent opening if clicking on the modal itself
      if (e.target.closest('.summary-modal')) return;
      
      modal.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal functions
    function closeModal() {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    }

    // Close on close button click
    closeBtn.addEventListener('click', closeModal);

    // Close on overlay click
    overlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initCopyButtons();
      initModal();
      initTechnicalModal();
      initEducationModal();
      initAboutModal();
    });
  } else {
    initCopyButtons();
    initModal();
    initTechnicalModal();
    initEducationModal();
    initAboutModal();
  }
})();
