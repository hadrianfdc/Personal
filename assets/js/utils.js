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

    // Copy email button
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', function() {
        const emailAddress = document.getElementById('email-address');
        if (emailAddress) {
          const text = emailAddress.innerText;
          navigator.clipboard.writeText(text).then(function() {
            alert('Email address copied to clipboard!');
          }).catch(function(error) {
            console.error('Could not copy email address: ', error);
          });
        }
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }
})();
