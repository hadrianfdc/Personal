(function() {
  'use strict';

  // Typing Animation
  function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const text = 'web developer';
    let index = 0;
    const typingSpeed = 150; // Slower for visibility
    const startDelay = 1200; // Delay after page load

    // Ensure element is empty at start
    typingElement.textContent = '';
    typingElement.classList.remove('typing-complete');

    setTimeout(() => {
      function type() {
        if (index < text.length) {
          typingElement.textContent += text.charAt(index);
          index++;
          setTimeout(type, typingSpeed);
        } else {
          // Add slight delay before removing cursor
          setTimeout(() => {
            typingElement.classList.add('typing-complete');
          }, 500);
        }
      }
      type();
    }, startDelay);
  }

  // Smooth Section Navigation
  function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.navbar a.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Smooth scroll with offset for fixed header
          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        
        // Close mobile menu if open
        const navbar = document.getElementById('navbar');
        if (navbar && navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const mobileToggle = document.querySelector('.mobile-nav-toggle');
          if (mobileToggle) {
            mobileToggle.classList.remove('bi-x');
            mobileToggle.classList.add('bi-list');
          }
        }
      });
    });
  }

  // Enhanced Mobile Menu Toggle
  function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.getElementById('navbar');
    
    if (mobileToggle && navbar) {
      mobileToggle.addEventListener('click', function() {
        navbar.classList.toggle('navbar-mobile');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }
  }

  // Scroll-based Navigation Highlighting
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPosition = window.pageYOffset + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      // Handle header
      if (window.pageYOffset < 100) {
        current = 'header';
      }
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  // Animate elements on scroll
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Observe section elements
    document.querySelectorAll('.icon-box, .resume-item, .info-box').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  // Enhanced Form Submission
  function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loadingEl = this.querySelector('.loading');
        const errorEl = this.querySelector('.error-message');
        const sentEl = this.querySelector('.sent-message');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        if (!loadingEl || !errorEl || !sentEl || !submitBtn) return;
        
        // Reset messages
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';
        sentEl.style.display = 'none';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
          loadingEl.style.display = 'none';
          sentEl.style.display = 'block';
          submitBtn.disabled = false;
          
          // Reset form
          setTimeout(() => {
            contactForm.reset();
            sentEl.style.display = 'none';
          }, 3000);
        }, 2000);
      });
    }
  }

  // Add ripple effect to buttons
  function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, button[type="submit"], .download-resume a');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize Parallax Effect on Header
  function initParallax() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        header.style.transform = `translateY(${scrolled * 0.4}px)`;
        header.style.opacity = 1 - (scrolled / 500);
      }
    });
  }

  // Add stagger animation to skills progress bars
  function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach((bar, index) => {
              setTimeout(() => {
                const targetWidth = bar.getAttribute('aria-valuenow') + '%';
                bar.style.width = targetWidth;
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(skillsSection);
    }
  }

  // Initialize all features
  function init() {
    initTypingAnimation();
    initSmoothNavigation();
    initMobileMenu();
    initScrollSpy();
    initScrollAnimations();
    initFormHandling();
    initRippleEffect();
    initParallax();
    initSkillsAnimation();
    
    // Add loaded class to body
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
