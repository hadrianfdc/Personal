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
            // Show feedback animation
            const feedback = document.getElementById('phone-copy-feedback');
            if (feedback) {
              feedback.classList.add('show');
              setTimeout(function() {
                feedback.classList.remove('show');
              }, 2000); // Hide after 2 seconds
            }
          }).catch(function(error) {
            console.error('Could not copy phone number: ', error);
          });
        }
      });
    }

    // Copy phone button in modal
    const copyPhoneModalBtn = document.getElementById('copy-phone-modal-btn');
    if (copyPhoneModalBtn) {
      copyPhoneModalBtn.addEventListener('click', function() {
        navigator.clipboard.writeText('+63 994 325 4337').then(function() {
          // Show feedback animation
          const feedback = document.getElementById('phone-modal-copy-feedback');
          if (feedback) {
            feedback.classList.add('show');
            setTimeout(function() {
              feedback.classList.remove('show');
            }, 2000); // Hide after 2 seconds
          }
        }).catch(function(error) {
          console.error('Could not copy phone: ', error);
        });
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

  // Email Modal functionality (on hover)
  function initEmailModal() {
    const emailContainer = document.querySelector('.email-wrapper');
    const modal = document.getElementById('emailModal');
    const overlay = document.getElementById('emailModalOverlay');
    const closeBtn = document.getElementById('emailModalCloseBtn');

    if (!emailContainer || !modal || !overlay || !closeBtn) return;

    let hoverTimeout;

    // Open modal on hover
    emailContainer.addEventListener('mouseenter', function() {
      clearTimeout(hoverTimeout);
      modal.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal on mouse leave, but not if moving to modal
    emailContainer.addEventListener('mouseleave', function(e) {
      if (emailContainer.contains(e.relatedTarget)) {
        return; // Don't close if moving to child element
      }
      hoverTimeout = setTimeout(function() {
        modal.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
      }, 300); // Delay to allow moving to modal
    });

    // Close modal functions
    function closeEmailModal() {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    }

    // Close on close button click
    closeBtn.addEventListener('click', closeEmailModal);

    // Close on overlay click
    overlay.addEventListener('click', closeEmailModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeEmailModal();
      }
    });
  }

  // Phone Modal functionality (on hover)
  function initPhoneModal() {
    const phoneContainer = document.querySelector('.phone-wrapper');
    const modal = document.getElementById('phoneModal');
    const overlay = document.getElementById('phoneModalOverlay');
    const closeBtn = document.getElementById('phoneModalCloseBtn');

    if (!phoneContainer || !modal || !overlay || !closeBtn) return;

    let hoverTimeout;

    // Open modal on hover
    phoneContainer.addEventListener('mouseenter', function() {
      clearTimeout(hoverTimeout);
      modal.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal on mouse leave, but not if moving to modal
    phoneContainer.addEventListener('mouseleave', function(e) {
      if (phoneContainer.contains(e.relatedTarget)) {
        return; // Don't close if moving to child element
      }
      hoverTimeout = setTimeout(function() {
        modal.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
      }, 300); // Delay to allow moving to modal
    });

    // Close modal functions
    function closePhoneModal() {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    }

    // Close on close button click
    closeBtn.addEventListener('click', closePhoneModal);

    // Close on overlay click
    overlay.addEventListener('click', closePhoneModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closePhoneModal();
      }
    });
  }

  // Social Modal functionality (on hover)
  function initSocialModal() {
    const socialContainer = document.querySelector('.social-wrapper');
    const modal = document.getElementById('socialModal');
    const overlay = document.getElementById('socialModalOverlay');
    const closeBtn = document.getElementById('socialModalCloseBtn');

    if (!socialContainer || !modal || !overlay || !closeBtn) return;

    let hoverTimeout;

    // Open modal on hover
    socialContainer.addEventListener('mouseenter', function() {
      clearTimeout(hoverTimeout);
      modal.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal on mouse leave, but not if moving to modal
    socialContainer.addEventListener('mouseleave', function(e) {
      if (socialContainer.contains(e.relatedTarget)) {
        return; // Don't close if moving to child element
      }
      hoverTimeout = setTimeout(function() {
        modal.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scroll
      }, 300); // Delay to allow moving to modal
    });

    // Close modal functions
    function closeSocialModal() {
      modal.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = ''; // Restore scroll
    }

    // Close on close button click
    closeBtn.addEventListener('click', closeSocialModal);

    // Close on overlay click
    overlay.addEventListener('click', closeSocialModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeSocialModal();
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
      initEmailModal();
      initPhoneModal();
      initSocialModal();
    });
  } else {
    initCopyButtons();
    initModal();
    initTechnicalModal();
    initEducationModal();
    initAboutModal();
    initEmailModal();
    initPhoneModal();
    initSocialModal();
  }
})();
