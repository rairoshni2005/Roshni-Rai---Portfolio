# Roshni Rai | Interactive Portfolio

An immersive, system-driven portfolio for Roshni Rai, a UI/UX researcher, product designer, and full-stack developer. The site combines a case-study portfolio with a playful operating-system-inspired interaction layer: command palette, achievements, ambient effects, resume decryption, signature capture, terminal contact, and responsive motion.

## Contents

- [Overview](#overview)
- [Live Site](#live-site)
- [Features](#features)
- [Portfolio Content](#portfolio-content)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Editing Content](#editing-content)
- [Assets](#assets)
- [Events and Persistence](#events-and-persistence)
- [Responsive and Accessibility Behavior](#responsive-and-accessibility-behavior)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Author](#author)

## Overview

This is a React single-page portfolio with a project-detail route. It is designed to feel like an interactive personal system rather than a static resume.

The experience presents:

- A cinematic hero with a 3D Spline scene, draggable name treatment, rotating roles, and audio-reactive atmosphere.
- About, skills, professional experience, education, leadership, notable endeavors, hobbies, projects, and contact sections.
- Horizontal, scroll-driven case studies with hover/touch inspection effects.
- A floating responsive navigation dock and keyboard-accessible command center.
- Optional ambient sound, visual effects, achievement tracking, and personal signature capture.

## Live Site

[roshni-rai-portfolio.vercel.app](https://roshni-rai-portfolio.vercel.app)

## Features

### Portfolio sections

- **Hero**: Roshni Rai identity, rotating roles (`UI/UX Researcher`, `Product Designer`, `Full-Stack Engineer`), project CTA, CV CTA, draggable headline, and scroll indicator.
- **About**: profile image, positioning statement, skills summary, and email, phone, GitHub, and LinkedIn contact cards.
- **Selected Works**: scroll-driven case-study presentation with project images, tags, problem, outcome, and detail pages.
- **Professional Experience**: animated timeline for Reliance Jio Platforms Ltd. and LetsUpgrade roles, including responsibilities, impact metrics, and technical palette.
- **Skills / Toolkit**: draggable, magnetic skill tags grouped into Research, Design, Development, and Soft Skills.
- **Academia & Credentials**: education cards plus the following content areas:
  - **Leadership & Roles**: Co-Head, Placement Club; Student Representative; NEP SAARTHI Student Ambassador; Event Anchor & Host; Social Media Volunteer.
  - **Notable Endeavors**: SummerHacks 2026, B.Tech & MCA inaugurations, Reliance Family Day 2025, PIWOT Imagine Hackathon 2025, Google DevFest Mumbai, Google I/O Watch Party, and hackathons/conferences across India.
- **Hobbies**: personal interests and additional identity-driven content.
- **Contact**: terminal-style name/message flow plus direct social and contact links.

### Case studies and project details

The project catalog currently includes:

1. **JioGames UX Research & Audit** — Reliance Jio Platforms Ltd.
2. **BTL App for ITM** — MentorME.ai / LetsUpgrade
3. **QueueLess** — smart campus cafeteria and queue management platform
4. **FlowSync** — AI-powered menstrual wellness platform
5. **ZapIt** — hyperlocal delivery platform
6. **TaskMate** — productivity and task manager mobile app

Each project can expose overview, role, timeline, problem, process, outcome, learnings, features, tags, image, and an optional GitHub link. Selecting a project uses the `/project/:id` route and renders `ProjectDetail.jsx`.

### Command Center

Open the system terminal with:

- `Cmd + K` on macOS
- `Ctrl + K` on Windows/Linux
- The terminal button in the floating navigation dock

The command center provides:

- Command search and system-log search.
- Night Vision toggle.
- CV/resume decryption flow.
- Achievement Archive access.
- Four accent themes: Cobalt, Emerald, Ruby, and Amber.

When the command center is open, these shortcuts work:

| Key | Action |
| --- | --- |
| `N` | Toggle Night Vision |
| `D` | Open CV decryption |
| `A` | Open Achievement Archive |
| `Esc` | Close the command center |

### Achievement system

Interactive actions unlock achievements and display animated notifications. Progress is stored locally in the browser.

| ID | Achievement | Trigger |
| --- | --- | --- |
| `FOUND_CMD_K` | System Breaker | Open the Command Center |
| `ALTERED_REALITY` | Reality Glitch | Change the accent theme |
| `HERO_DISTURBED` | Annoyance Expert | Drag/interfere with the hero headline enough times |
| `NEURAL_ACCESS` | Mind Hunter | Activate the Neural Link interaction |
| `LONG_STAY` | Dedicated Visitor | Remain on the page for 60 seconds |
| `FINAL_MASTER` | The Master Explorer | Unlock the first five non-final achievements |

The Achievement Archive is opened from the command center and shows unlocked and locked trophies.

### Resume decryption

The Hero `Access CV` button and command center `D` command open an animated modal:

1. Classified document state.
2. Decryption progress animation.
3. Decryption complete state.
4. Browser download of `public/Roshni Rai - Resume.pdf`.

The current download path is `/Roshni Rai - Resume.pdf`.

### Signature pad

The signature modal provides a canvas for drawing with a mouse or trackpad. A saved signature is:

- Stored as a data URL in `localStorage`.
- Restored when the modal opens again.
- Sent to the footer through the `signature-updated` event.

### Contact terminal

The contact area simulates a secure terminal conversation:

1. Enter a name.
2. Enter a message.
3. Submit the message to FormSubmit's AJAX endpoint.
4. Display a staged transmission-success response.

The endpoint is configured in `src/components/TerminalContact.jsx` for `rairoshni2005@gmail.com`. It is a client-side third-party integration; there is no server in this repository.

### Motion, sound, and visual systems

- Framer Motion entrance, hover, drag, spring, scale, opacity, and scroll animations.
- Lenis smooth scrolling on tablet and desktop when reduced motion is not requested.
- Native scrolling on phones to avoid touch scrolling jank.
- Spline 3D hero scene.
- Particle web / constellation background.
- Custom cursor, fluid cursor, ghost cursor, warp drive, and atmospheric effects.
- Ambient sound and sound mixer with event-driven audio pulses.
- Vibe indicator, Sidebar HUD, Neural Link, Night Vision, and noise overlay.
- Magnetic hover interactions for navigation, buttons, and skill tags.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, React DOM 19 |
| Build and dev server | Vite 8 |
| Styling | Tailwind CSS 4, `src/index.css`, CSS variables |
| Animation | Framer Motion 12 |
| Routing | React Router DOM 7 |
| 3D | `@splinetool/react-spline`, `@splinetool/runtime` |
| Particles | `@tsparticles/react`, `@tsparticles/slim` |
| Smooth scroll | Lenis |
| Icons | Lucide React, React Icons |
| Quality | ESLint 9 |
| Hosting | Vercel-compatible static deployment |

## Architecture

### Runtime flow

```text
index.html
  -> src/main.jsx
  -> BrowserRouter
  -> src/App.jsx
  -> global systems, route views, and portfolio sections
```

`App.jsx` owns the application shell and global state for loading, Night Vision, the Achievement Archive, resume decryption, and the unlocked-achievement cache.

### Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | Hero, About, Projects, WorkExperience, Skills, Education, Hobbies | Main portfolio page |
| `/project/:id` | `ProjectDetail` | Individual project detail view |

The main page uses anchor IDs for the navigation dock:

`#home`, `#about`, `#projects`, `#work`, `#skills`, `#education`, and `#contact`.

### Component layers

- **Shell**: `App.jsx`, `main.jsx`, `Section.jsx`, `Navbar.jsx`, `Footer.jsx`.
- **Content sections**: `Hero`, `About`, `Projects`, `ProjectDetail`, `WorkExperience`, `Skills`, `Education`, `Hobbies`, `FunFacts`, `ExtraProjects`, and `CaseStudies`.
- **Interaction systems**: `CommandCenter`, `AchievementSystem`, `AchievementVault`, `ResumeDecryption`, `SignaturePad`, and `TerminalContact`.
- **Atmosphere and navigation**: `LoadingScreen`, `CustomCursor`, `FluidCursor`, `GhostCursor`, `WarpDrive`, `ParticleWeb`, `AtmosphereEngine`, `AmbientSound`, `SoundMixer`, `NightVision`, `VibeIndicator`, `SidebarHUD`, `NeuralLink`, `SkillConstellation`, `ScrollOrbit`, `Magnetic`, and `ScrambleText`.

### Event-driven communication

Loose coupling between global systems uses browser `CustomEvent`s:

| Event | Producer / consumer | Purpose |
| --- | --- | --- |
| `open-command-center` | Navbar -> CommandCenter | Open terminal from the dock |
| `toggle-night-vision` | CommandCenter -> App | Toggle the Night Vision overlay |
| `open-vault` | CommandCenter -> App | Open the Achievement Archive |
| `open-decryption` | Hero/CommandCenter -> App | Open the CV modal |
| `unlock-achievement` | Interactive systems -> AchievementSystem/App | Record and synchronize achievements |
| `signature-updated` | SignaturePad -> Footer | Refresh the displayed signature |
| `change-vibe` | SoundMixer -> AmbientSound | Change the ambient sound profile |
| `audio-pulse` | AmbientSound -> Hero | Drive the hero aura animation |

Example:

```js
window.dispatchEvent(new CustomEvent('open-vault'));
```

### Browser persistence

| Key | Value |
| --- | --- |
| `roshni_achievements` | JSON array of unlocked achievement IDs |
| `roshni_signature` | Saved signature canvas data URL |
| `roshni_achievements_signature` | Optional footer fallback key used by existing logic |

No database, authentication service, or required environment variable is currently used by the core app.

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── Roshni Rai - Resume.pdf
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── index.css
│   ├── assets/
│   ├── data/
│   │   └── projects.js
│   └── components/
└── docs/
    ├── ARCHITECTURE.md
    ├── CONTENT_EDITING.md
    ├── DEPLOYMENT.md
    ├── DEVELOPMENT.md
    ├── FEATURES.md
    └── TROUBLESHOOTING.md
```

`dist/` is generated by Vite and is excluded from version control.

## Getting Started

### Prerequisites

- Node.js 18 or newer; the latest LTS release is recommended.
- npm 9 or newer.
- A modern browser with JavaScript enabled.

Check versions:

```bash
node --version
npm --version
```

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Production preview

```bash
npm run build
npm run preview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Create the optimized production bundle in `dist/` |
| `npm run preview` | Serve the production bundle locally |
| `npm run lint` | Run ESLint across the repository |

## Editing Content

Content is currently maintained in component files and JavaScript data arrays rather than a CMS.

| Content | Source |
| --- | --- |
| Navigation labels and anchor targets | `src/components/Navbar.jsx` |
| Hero name, roles, CTA behavior | `src/components/Hero.jsx` |
| About copy and contact cards | `src/components/About.jsx` |
| Skills and categories | `src/components/Skills.jsx` |
| Professional experience | `src/components/WorkExperience.jsx` |
| Education, Leadership & Roles, Notable Endeavors | `src/components/Education.jsx` |
| Project catalog and case-study data | `src/data/projects.js` |
| Project detail presentation | `src/components/ProjectDetail.jsx` |
| Footer social links and direct contact | `src/components/Footer.jsx` |
| Terminal contact copy and recipient endpoint | `src/components/TerminalContact.jsx` |
| Resume download filename/path | `src/components/ResumeDecryption.jsx` |

### Adding a project

Add an object to `src/data/projects.js` with the existing fields:

```js
{
  title: 'Project name',
  subtitle: 'Organization or descriptor',
  overview: 'Long-form overview',
  role: 'Your role',
  timeline: 'Project dates',
  problem: 'Problem statement',
  process: 'Process summary',
  outcome: 'Outcome summary',
  learnings: ['Learning one'],
  features: ['Feature one'],
  image: '/images/project.png',
  tags: ['React', 'Figma'],
  github: 'https://github.com/example/project'
}
```

The project URL is derived from the title by lowercasing it and replacing spaces with underscores. Keep titles unique and test the generated detail link.

### Editing section anchors

If a section ID changes, update the matching `href` in `Navbar.jsx`. The active navigation state uses `IntersectionObserver`, so both values must remain aligned.

## Assets

### Public assets

Files in `public/` are served from the site root:

- `public/Roshni Rai - Resume.pdf` -> `/Roshni Rai - Resume.pdf`
- `public/images/profile.png` -> `/images/profile.png`
- `public/images/work1.png` through `work6.png` -> project imagery
- `public/favicon.svg` -> browser favicon

Use root-relative paths for public files. Keep imported build-time assets in `src/assets` when they belong to the module graph.

### External assets and integrations

- The hero uses a hosted Spline scene URL.
- The noise layer references a hosted noise texture.
- The contact terminal posts to FormSubmit.
- These integrations require network access in the browser and may be affected by privacy tools or content blockers.

## Responsive and Accessibility Behavior

- Layouts use responsive Tailwind breakpoints from phone through desktop.
- The bottom navigation dock becomes horizontally scrollable on narrow screens.
- Touch interactions remain available; custom cursor behavior is limited to fine pointers.
- Lenis is disabled on phones and when `prefers-reduced-motion: reduce` is enabled.
- CSS provides reduced-motion fallbacks that shorten animations and transitions.
- Images, video, canvas, and SVG content are constrained to their containers to reduce overflow.
- Modal surfaces use bounded heights and internal scrolling on smaller screens.
- Buttons and links preserve mobile tap behavior and safe-area padding.

## Deployment

The app is a static Vite build and can be deployed to Vercel, Netlify, GitHub Pages, or another static host.

### Vercel

Recommended settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

The repository has previously been linked to Vercel. The Vercel CLI flow is:

```bash
npm install --global vercel
vercel
vercel --prod
```

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* /index.html 200`

### GitHub Pages

If deploying under a repository subpath, set the matching `base` value in `vite.config.js` before building, for example:

```js
export default defineConfig({
  base: '/repository-name/',
  plugins: [react(), tailwindcss()],
});
```

### SPA fallback

Hosts must serve `index.html` for unknown application paths so `/project/:id` and browser refreshes work. Add the host-specific rewrite described in `docs/DEPLOYMENT.md` if refreshes return 404.

### Release checklist

```bash
npm run lint
npm run build
npm run preview
```

Then verify:

- The loading screen completes.
- Dock navigation and section anchors work.
- `Cmd/Ctrl + K` opens the Command Center.
- Theme switching and Night Vision work.
- CV decryption downloads the PDF.
- Project cards open their detail pages.
- Contact terminal submission behaves correctly.
- Profile and project images load.
- The layout works on phone and desktop widths.

## Troubleshooting

### Blank page

Open the browser console, run `npm run build`, and check for missing assets or runtime errors. Then test the production result with `npm run preview`.

### Resume download fails

Confirm the exact file exists at `public/Roshni Rai - Resume.pdf`. The download path is case- and space-sensitive.

### Project detail refresh returns 404

Configure the host's SPA fallback to rewrite requests to `index.html`.

### Images do not load

Confirm the file exists under `public/images/` and that the component uses `/images/<filename>` rather than a filesystem path.

### Command Center does not open

Use `Cmd/Ctrl + K`, click the terminal icon in the dock, inspect the browser console, and check whether a browser extension has claimed the shortcut.

### Contact submission fails

The terminal depends on a browser request to FormSubmit. Check the browser network panel, third-party request blocking, and the configured recipient in `TerminalContact.jsx`.

### Signature is not visible

Save a new signature, confirm browser storage is enabled, and check the `roshni_signature` key. Private browsing settings can restrict local storage.

### Cursor is hidden

This is intentional on fine-pointer devices for the custom cursor experience. Remove or override the fine-pointer cursor rules in `src/index.css` to restore the native cursor.

### Lint or build issues

Run the commands separately to isolate the problem:

```bash
npm run lint
npm run build
```

Build warnings about large chunks may appear because the portfolio includes Spline, particle, physics, and animation dependencies. They do not necessarily indicate a failed build.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): render tree, state boundaries, events, persistence, and deployment architecture.
- [Features](docs/FEATURES.md): detailed behavior of the Command Center, achievements, hero, navigation, resume, signature, contact, and ambient systems.
- [Development](docs/DEVELOPMENT.md): local workflow, conventions, and validation steps.
- [Content Editing](docs/CONTENT_EDITING.md): content locations and safe editing guidance.
- [Deployment](docs/DEPLOYMENT.md): Vercel, Netlify, GitHub Pages, and generic static hosting.
- [Troubleshooting](docs/TROUBLESHOOTING.md): common runtime, asset, integration, and deployment issues.

## Author

**Roshni Rai**

- Email: [rairoshni2005@gmail.com](mailto:rairoshni2005@gmail.com)
- GitHub: [github.com/rairoshni2005](https://github.com/rairoshni2005)
- LinkedIn: [linkedin.com/in/roshni-rai08](https://www.linkedin.com/in/roshni-rai08/)
- Location: Mumbai, India
