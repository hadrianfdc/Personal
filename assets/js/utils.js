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

  // Fast Typewriter Animation for Closing Paragraph (Re-triggering)
  function initTypewriterAnimation() {
    const closingParagraph = document.querySelector('.about .content > p:last-of-type');
    
    if (!closingParagraph) return;

    // Store original text
    const originalText = closingParagraph.textContent.trim();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      closingParagraph.classList.add('typing-active');
      return;
    }

    let typingTimeout = null;

    function typeWriter(text, element, speed = 8) {
      element.textContent = '';
      element.classList.add('typing-active');
      let i = 0;
      
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          typingTimeout = setTimeout(type, speed);
        }
      }
      
      // Start typing after list items complete (2600ms)
      setTimeout(type, 2600);
    }

    function resetTyping() {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
      }
      closingParagraph.textContent = '';
      closingParagraph.classList.remove('typing-active');
    }

    // Create IntersectionObserver with re-trigger capability
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start typewriter effect
            requestAnimationFrame(() => {
              typeWriter(originalText, closingParagraph, 8);
            });
          } else {
            // Reset when out of viewport
            requestAnimationFrame(() => {
              resetTyping();
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe the paragraph continuously
    observer.observe(closingParagraph);
  }

  // Line-by-line About Description Animation (Re-triggering)
  function initAboutDescriptionAnimation() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const aboutText = document.querySelector('.about-description-container p.fst-italic');
    if (!aboutText) return;

    // Store original text
    const originalText = aboutText.textContent.trim();
    
    if (prefersReducedMotion) {
      // If user prefers reduced motion, show content immediately without animation
      aboutText.style.opacity = '1';
      aboutText.style.transform = 'none';
      return;
    }

    // Split text into sentences for more reliable line-by-line animation
    const sentences = originalText.split(/(?<=[.!?])\s+/);
    
    // Clear the paragraph and add sentence spans
    aboutText.innerHTML = '';
    sentences.forEach((sentence, index) => {
      const sentenceSpan = document.createElement('span');
      sentenceSpan.className = 'line';
      sentenceSpan.textContent = sentence;
      if (index < sentences.length - 1) {
        sentenceSpan.textContent += ' ';
      }
      aboutText.appendChild(sentenceSpan);
    });

    // Create IntersectionObserver with re-trigger capability
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When entering viewport: animate sentences sequentially
            const lines = aboutText.querySelectorAll('.line');
            lines.forEach((line, index) => {
              setTimeout(() => {
                requestAnimationFrame(() => {
                  line.classList.add('animate-line');
                });
              }, 100 + (index * 200)); // Start at 100ms, then 200ms delay between each sentence
            });
          } else {
            // When leaving viewport: reset all lines
            const lines = aboutText.querySelectorAll('.line');
            lines.forEach(line => {
              line.classList.remove('animate-line');
            });
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -40px 0px' // Subtle offset for smooth trigger
      }
    );

    // Observe the paragraph continuously (allows re-triggering)
    observer.observe(aboutText);
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
      initCopyButtons();
      initModal();
      initTechnicalModal();
      initEducationModal();
      initAboutModal();
      initEmailModal();
      initPhoneModal();
      initSocialModal();
      initProfileItemsAnimation();
      initTypewriterAnimation();
      initAboutDescriptionAnimation();
      initSkillsAnimation();
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
    initProfileItemsAnimation();
    initTypewriterAnimation();
    initAboutDescriptionAnimation();
    initSkillsAnimation();
  }
})();
