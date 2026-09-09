# Hadrian Evarula — Portfolio

[![Live](https://img.shields.io/badge/site-live-18d26e)](https://hadrianfdc.github.io/Personal/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A production portfolio for an AI/backend developer, built as a dependency-light static site rather than a framework scaffold — every interaction (theming, chat, timelines, project modals) is hand-rolled against the DOM, which keeps the payload small and the behavior fully inspectable. The centerpiece is an AI assistant grounded in a structured knowledge base of the owner's actual experience, backed by Firestore analytics.

**Live:** https://hadrianfdc.github.io/Personal/

---

## Engineering highlights

A few decisions worth calling out, since they're not obvious from a file listing:

- **Two full stylesheets, not CSS variables, for theming.** `theme-light.css` and `theme-dark.css` are separate `<link>` tags toggled via the `disabled` property (see `theme-toggle.js`), with the theme applied synchronously in an inline `<head>` script before first paint to avoid a flash of the wrong theme. `theme-dark.css` intentionally only patches the handful of elements that hardcode a non-green accent color elsewhere — the rest of the site is already black/white/green by default, so dark mode is a thin diff, not a parallel design system.
- **Tailwind and Bootstrap coexist deliberately.** Tailwind is loaded via the Play CDN with `corePlugins.preflight` disabled specifically so it doesn't fight Bootstrap's reset — Tailwind is used for one-off utility composition (spacing, responsive text sizing) on top of Bootstrap's grid and component base, not as a replacement for it.
- **The AI assistant is knowledge-grounded, not a bare API passthrough.** `knowledge_base.json` holds structured, factual data about experience, skills, and projects that's fed into the Gemini prompt context (`chat-assistant.js`), so answers stay accurate instead of hallucinating credentials.
- **Chat analytics are first-party.** Conversations and usage metrics are written to Firestore (Firebase modular SDK v10) and surfaced on a password-gated dashboard (`analytics.html`) — no third-party analytics script.
- **Motion is GSAP-driven, not CSS-keyframe-only.** Hero entrance sequencing, scroll-triggered reveals (`ScrollTrigger`), and the profile image's mouse-parallax tilt are all timeline-based for precise sequencing; CSS keyframes are reserved for simple, self-contained loops (glow pulses, cursor blink).
- **Custom UI chrome:** a magnifying-glass lens navbar effect (`nav-magnifier.js`, canvas-rendered refraction), a trailing custom cursor, and a tilt-responsive 3D "About" card are all built from scratch against `<canvas>` and CSS transforms rather than a plugin.

## Tech stack

| Layer | Choice |
|---|---|
| Markup / structure | Semantic HTML5, no templating engine |
| Styling | Bootstrap 5, Tailwind (Play CDN, preflight off), hand-written CSS per feature area |
| Interactivity | Vanilla JS (ES6+), Alpine.js for small declarative bits, GSAP 3 + ScrollTrigger for motion |
| AI assistant | Google Gemini API, grounded via a local JSON knowledge base |
| Data / analytics | Firebase Firestore (modular SDK v10) |
| Supporting libraries | GLightbox, Isotope, Swiper, PureCounter, Waypoints, Bootstrap/Boxicons |
| Hosting | GitHub Pages (static, no build step) |

## Project structure

```
Personal/
├── index.html                  # Main portfolio page
├── analytics.html              # Password-gated chat analytics dashboard
├── portfolio-details.html      # Case-study detail template
├── knowledge_base.json         # Structured profile data grounding the AI assistant
├── assets/
│   ├── css/
│   │   ├── style.css            # Base layout, theme-agnostic structure
│   │   ├── theme-light.css      # Light theme overrides (loaded last, wins on specificity)
│   │   ├── theme-dark.css       # Dark theme overrides
│   │   ├── animations.css       # Entrance/scroll/hover animation rules
│   │   ├── about-3d.css         # Tilt-responsive About card
│   │   ├── resume-timeline.css  # Resume/experience timeline component
│   │   ├── contact-enhanced.css
│   │   ├── chat-assistant.css
│   │   └── custom-cursor.css
│   ├── js/
│   │   ├── main.js              # Core portfolio interactions
│   │   ├── hero-enhanced.js     # Hero canvas, text scramble, GSAP entrance/parallax
│   │   ├── chat-assistant.js    # Gemini-backed assistant + Firestore logging
│   │   ├── nav-magnifier.js     # Canvas-rendered nav lens effect
│   │   ├── about-3d.js          # 3D tilt card interactions
│   │   ├── resume-timeline.js
│   │   ├── contact-enhanced.js
│   │   ├── custom-cursor.js
│   │   ├── theme-toggle.js      # Light/dark <link> toggling + persistence
│   │   ├── *-modal.js           # Per-project showcase modals (coding, goal-tracking, web-design, data-structure)
│   │   ├── config.js            # API key placeholders (injected at deploy time)
│   │   └── utils.js
│   ├── img/ / vendor/           # Static assets and third-party libraries
├── forms/contact.php            # Contact form handler
└── firebase-config.js
```

## Getting started

No build step — it's static HTML/CSS/JS served as-is.

```bash
git clone https://github.com/hadrianfdc/Personal.git
cd Personal
python3 -m http.server 8000   # or any static file server
```

Then open `http://localhost:8000`.

### Configuring the AI assistant (optional)

The chat assistant degrades to fallback responses without a key.

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
2. Replace `GEMINI_API_KEY_PLACEHOLDER` in `assets/js/config.js`.

### Configuring analytics (optional)

1. Create a Firebase project and enable Firestore.
2. Replace `FIREBASE_API_KEY_PLACEHOLDER` in the Firebase config block in `index.html`.
3. Set Firestore security rules appropriately for your deployment (the placeholders are safe to commit; a real key is not).

## Deployment

The `main` branch is served directly via GitHub Pages — no CI build step, since there's nothing to compile. Pushing to `main` is the deploy.

## License

MIT — see [LICENSE](LICENSE).

## Contact

**Hadrian Evarula** — AI Developer & Backend Engineer, Cebu, Philippines
- Email: hadrianevarula@gmail.com
- GitHub: [@hadrianfdc](https://github.com/hadrianfdc)
