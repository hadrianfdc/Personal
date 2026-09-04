// Utility functions for the portfolio website

(function() {
  'use strict';

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

  // Profile List Items Animation on Scroll (Re-triggering)
  function initProfileItemsAnimation() {
    // Select all profile list items in the about section
    const profileItems = document.querySelectorAll('.about .content ul li');
    
    if (!profileItems.length) return;

    // Create IntersectionObserver with re-trigger capability
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When entering viewport: add animation class
            // Use requestAnimationFrame to ensure smooth animation application
            requestAnimationFrame(() => {
              entry.target.classList.add('animate-in');
            });
          } else {
            // When leaving viewport: remove animation class to reset
            // This allows re-triggering when scrolling back
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully visible
      }
    );

    // Observe each profile item continuously (no unobserve)
    profileItems.forEach((item) => {
      observer.observe(item);
    });
  }

  // Skills Progress Bar Animation (Re-triggering)
  function initSkillsAnimation() {
    const skillsContent = document.querySelector('.skills-content');
    const progressBars = document.querySelectorAll('.skills .progress .progress-bar');
    
    if (!skillsContent || progressBars.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      progressBars.forEach(bar => {
        bar.style.width = bar.getAttribute('aria-valuenow') + '%';
      });
      return;
    }

    // Create IntersectionObserver with re-trigger capability
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When entering viewport: animate progress bars
            progressBars.forEach((bar) => {
              requestAnimationFrame(() => {
                bar.style.width = bar.getAttribute('aria-valuenow') + '%';
              });
            });
          } else {
            // When leaving viewport: reset progress bars
            progressBars.forEach((bar) => {
              requestAnimationFrame(() => {
                bar.style.width = '1px';
              });
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe the skills content continuously
    observer.observe(skillsContent);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initModal();
      initTechnicalModal();
      initEducationModal();
      initAboutModal();
      initProfileItemsAnimation();
      initSkillsAnimation();
    });
  } else {
    initModal();
    initTechnicalModal();
    initEducationModal();
    initAboutModal();
    initProfileItemsAnimation();
    initTypewriterAnimation();
    initSkillsAnimation();
  }
})();
