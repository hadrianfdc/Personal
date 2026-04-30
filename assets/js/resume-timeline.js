/* ============================================================
   Resume Timeline — GSAP + Alpine.js
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   Alpine component: chip hover → experience highlighting
──────────────────────────────────────────────────────────── */
document.addEventListener('alpine:init', function () {
  Alpine.data('resumeSection', function () {
    return {
      activeChip: null,

      /* Skill name → experience entry IDs that use it */
      skillMap: {
        'PHP':            ['exp-nativecamp'],
        'CakePHP':        ['exp-nativecamp'],
        'CI/CD':          ['exp-nativecamp'],
        'GitHub Actions': ['exp-nativecamp'],
        'Codeception':    ['exp-nativecamp'],
        'MySQL':          ['exp-nativecamp'],
        'REST APIs':      ['exp-nativecamp', 'exp-prince'],
        'Git':            ['exp-nativecamp', 'exp-prince'],
        'JIRA':           ['exp-nativecamp', 'exp-prince'],
        'C#':             ['exp-prince'],
        'ASP.NET MVC':    ['exp-prince'],
        'SQL Server':     ['exp-prince'],
        'RBAC':           ['exp-prince'],
        'SQL':            ['exp-prince'],
        /* Skills with no mapped entry highlight nothing */
        'JavaScript':     [],
        'Node.js':        [],
        'ASP.NET Core':   [],
        'Laravel':        [],
        'MongoDB':        [],
        'PostgreSQL':     [],
      },

      hoverChip: function (skill) {
        this.activeChip = skill;
      },

      leaveChip: function () {
        this.activeChip = null;
      },

      isHighlighted: function (entryId) {
        if (!this.activeChip) return false;
        var hits = this.skillMap[this.activeChip] || [];
        return hits.indexOf(entryId) !== -1;
      },

      isDimmed: function (entryId) {
        if (!this.activeChip) return false;
        var hits = this.skillMap[this.activeChip] || [];
        /* Only dim when there are actual hits (don't dim everything for unknown skills) */
        return hits.length > 0 && hits.indexOf(entryId) === -1;
      }
    };
  });
});

/* ────────────────────────────────────────────────────────────
   GSAP animations
──────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var _initialized = false;

  function whenGSAP(cb) {
    if (typeof gsap !== 'undefined') { cb(); return; }
    var t = setInterval(function () {
      if (typeof gsap !== 'undefined') { clearInterval(t); cb(); }
    }, 50);
  }

  /* ── 1. Staggered card reveal (IntersectionObserver) ── */
  function initCardReveals() {
    var entries = document.querySelectorAll('#resume [data-reveal]');
    entries.forEach(function (el, i) {
      gsap.set(el, { opacity: 0, x: -26 });

      var obs = new IntersectionObserver(function (ev) {
        if (!ev[0].isIntersecting) return;
        obs.disconnect();
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: 'power3.out',
          delay: (i % 3) * 0.06   /* slight stagger within each viewport batch */
        });
      }, { threshold: 0.12 });

      obs.observe(el);
    });
  }

  /* ── 2. Timeline line draw ── */
  function initTimelineLines() {
    var progressBars = document.querySelectorAll('#resume .timeline-progress');

    progressBars.forEach(function (bar) {
      var wrapper = bar.closest('.resume-timeline');
      if (!wrapper) return;

      /* Prefer ScrollTrigger scrub; fall back to IntersectionObserver pop */
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.to(bar, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 78%',
            end:   'bottom 22%',
            scrub: 1.2,
          }
        });
      } else {
        var obs = new IntersectionObserver(function (ev) {
          if (!ev[0].isIntersecting) return;
          obs.disconnect();
          gsap.to(bar, { scaleY: 1, duration: 1.6, ease: 'power2.inOut' });
        }, { threshold: 0.08 });
        obs.observe(wrapper);
      }
    });
  }

  /* ── 3. Skill chip micro-interactions ── */
  function initChipHover() {
    if (window.matchMedia('(hover: none)').matches) return;

    var chips = document.querySelectorAll('#resume .skill-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('mouseenter', function () {
        gsap.to(chip, { scale: 1.10, duration: 0.20, ease: 'power2.out', overwrite: 'auto' });
      });
      chip.addEventListener('mouseleave', function () {
        gsap.to(chip, { scale: 1, duration: 0.38, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
      });
    });
  }

  /* ── 4. Summary card lift on hover ── */
  function initSummaryHover() {
    var card = document.getElementById('resume-summary');
    if (!card || window.matchMedia('(hover: none)').matches) return;

    card.addEventListener('mouseenter', function () {
      gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { y: 0, duration: 0.45, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
    });
  }

  /* ── 5. Floating download button ── */
  function initFAB() {
    var fab = document.getElementById('resumeFab');
    if (!fab) return;

    var summary = document.getElementById('resume-summary');
    if (!summary) return;

    var obs = new IntersectionObserver(function (ev) {
      var out = !ev[0].isIntersecting;

      if (out) {
        fab.classList.add('fab-visible');
        gsap.to(fab, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.42, ease: 'back.out(1.8)',
          overwrite: 'auto'
        });
      } else {
        fab.classList.remove('fab-visible');
        gsap.to(fab, {
          opacity: 0, y: 16, scale: 0.88,
          duration: 0.28, ease: 'power2.in',
          overwrite: 'auto'
        });
      }
    }, { threshold: 0, rootMargin: '-60px 0px 0px 0px' });

    obs.observe(summary);
  }

  /* ── Bootstrap: run once the Resume section becomes visible ── */
  function initAll() {
    if (_initialized) return;
    _initialized = true;

    whenGSAP(function () {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      initCardReveals();
      initTimelineLines();
      initChipHover();
      initSummaryHover();
      initFAB();

      /* Refresh ScrollTrigger after a tick so layout is settled */
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(function () { ScrollTrigger.refresh(); }, 120);
      }
    });
  }

  function watchSection() {
    var section = document.getElementById('resume');
    if (!section) return;

    if (section.classList.contains('section-show')) { initAll(); return; }

    var mo = new MutationObserver(function () {
      if (section.classList.contains('section-show')) {
        mo.disconnect();
        initAll();
      }
    });
    mo.observe(section, { attributes: true, attributeFilter: ['class'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchSection);
  } else {
    watchSection();
  }
}());
