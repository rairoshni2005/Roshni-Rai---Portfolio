# ✨ Roshni Rai — Interactive Portfolio

<p align="center">
  <b>An immersive, system-driven portfolio built with modern frontend technologies 🚀</b><br/>
  Blending <i>design, development, and interactivity</i> into a unique digital experience.
</p>

---

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/FramerMotion-Animation-black?logo=framer)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![Status](https://img.shields.io/badge/Status-Live-success)

</p>

---

## 🌐 Live Website

👉 **[https://roshni-rai-portfolio.vercel.app](https://roshni-rai-portfolio.vercel.app)**

---

## 🎯 About the Project

This is not just a portfolio — it’s a **fully interactive digital experience**.

The project transforms a traditional portfolio into a **system-based UI environment**, where users can interact with features like:

* 🧠 Command Center
* 🏆 Achievement System
* 🌙 Night Vision Mode
* ✍️ Signature Pad
* 📄 Resume Decryption

Built using a **modern frontend stack**, the application demonstrates strong capabilities in:

* Frontend Engineering
* UI/UX Design
* System Architecture
* Interactive Experience Design

---

## ✨ Core Features

### 🧠 Command Center (⌘ / Ctrl + K)

* Global command palette
* Keyboard-driven navigation
* Theme switching
* System actions trigger

---

### 🏆 Achievement System

* Gamified interaction model
* Unlock achievements based on behavior
* Persistent storage using `localStorage`
* Real-time notifications

---

### 🌙 Night Vision Mode

* Toggleable UI overlay
* Event-driven activation
* Enhances visual interaction

---

### 📄 Resume Decryption System

* Simulated secure access flow
* Animated stages:

  * Encrypted
  * Decrypting
  * Decrypted
* Downloads resume from `/public/resume.pdf`

---

### ✍️ Signature Pad

* Draw custom signature
* Save locally in browser
* Display dynamically in footer

---

### 🎨 Advanced UI/UX Experience

* Custom cursor system
* Scroll-based animations
* Hover effects & micro-interactions
* Audio-reactive visuals
* Smooth transitions

---

## 🧰 Tech Stack

| Category   | Technology                |
| ---------- | ------------------------- |
| Frontend   | React 19                  |
| Build Tool | Vite                      |
| Styling    | Tailwind CSS v4           |
| Animation  | Framer Motion             |
| Icons      | Lucide React, React Icons |
| Linting    | ESLint                    |
| Deployment | Vercel                    |

---

## 🏗️ System Architecture

### 🔹 Application Type

* Single Page Application (SPA)
* Anchor-based navigation
* No routing libraries

---

### 🔹 Rendering Flow

```text
index.html → main.jsx → App.jsx → Components
```

---

### 🔹 Component Layers

* UI Sections (Hero, About, Projects, etc.)
* System Components (Command Center, Achievements, etc.)
* Overlay Systems (Night Vision, Modals, Cursor)

---

## 🔄 Event-Driven Architecture

This project uses a **CustomEvent-based global event system**.

### Example:

```js
window.dispatchEvent(new CustomEvent("open-vault"))
```

### 🔑 Key Events

| Event               | Action                  |
| ------------------- | ----------------------- |
| toggle-night-vision | Toggle UI overlay       |
| open-vault          | Open achievements vault |
| open-decryption     | Open resume modal       |
| open-signature      | Open signature pad      |
| unlock-achievement  | Track achievements      |

👉 Enables **loose coupling & scalability**

---

## 💾 State Management

### Global State (App.jsx)

* Loading screen
* Modal visibility
* Night mode
* Achievement tracking

---

### Local State

* Component-level UI interactions

---

### Persistence

| Key                 | Purpose                      |
| ------------------- | ---------------------------- |
| roshni_achievements | Stores unlocked achievements |
| roshni_signature    | Stores signature             |

---

## 📁 Project Structure

```
/public
  /images
  resume.pdf

/src
  /components
  App.jsx
  main.jsx

/dist (auto-generated)
```

---

## ⚙️ Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Locally

```bash
npm run dev
```

### 3️⃣ Build Project

```bash
npm run build
```

### 4️⃣ Preview Production

```bash
npm run preview
```

---

## ✏️ Content Editing

All content is managed directly inside components:

| Section    | File               |
| ---------- | ------------------ |
| Navbar     | Navbar.jsx         |
| Hero       | Hero.jsx           |
| About      | About.jsx          |
| Skills     | Skills.jsx         |
| Experience | WorkExperience.jsx |
| Projects   | Projects.jsx       |
| Education  | Education.jsx      |
| Contact    | Footer.jsx         |

---

## 🖼️ Assets Guide

* Store assets in `/public/images`
* Access using:

```
/images/filename.png
```

* Resume must be placed at:

```
/public/resume.pdf
```

---

## 🚀 Deployment

### 🌐 Vercel (Recommended)

* Build Command → `npm run build`
* Output Directory → `dist`

---

## ✅ Post Deployment Checklist

✔ Navigation working
✔ Command Center opens
✔ Resume download works
✔ Images load correctly
✔ Contact form works
✔ Night mode toggle works

---

## ⚠️ Troubleshooting

### ❌ Blank Screen

* Check console errors
* Run `npm run build`

---

### ❌ Images Not Loading

* Verify `/public` paths
* Check file names

---

### ❌ Resume Not Downloading

* Ensure `resume.pdf` exists

---

### ❌ 404 on Refresh

* Add SPA rewrite rules

---

## 🔮 Future Enhancements

* Backend integration
* Authentication system
* Analytics dashboard
* Blog section
* Theme persistence

---

## 👩‍💻 Author

**Roshni Rai**
📧 [rairoshni2005@gmail.com](mailto:rairoshni2005@gmail.com)

---

<p align="center">
  ⭐ If you like this project, give it a star on GitHub!
</p>

---
# Roshni Rai — Portfolio

Interactive, single-page portfolio built with **React + Vite + Tailwind CSS**, featuring a “system UI” layer (Command Center, achievements, night vision, signature pad) and animation-heavy sections powered by **Framer Motion**.

## Table of contents

- [Quickstart](#quickstart)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Key features](#key-features)
- [App architecture](#app-architecture)
- [Scripts](#scripts)
- [Build output](#build-output)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Docs](#docs)

## Quickstart

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Tech stack

- **Runtime**: React 19 (`react`, `react-dom`)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` + project CSS in `src/index.css`
- **Animation**: `framer-motion`
- **Icons**: `lucide-react`, `react-icons`
- **Linting**: ESLint (`npm run lint`)

## Project structure

High-level map:

- `index.html`: HTML shell + metadata + mounts `#root`
- `src/main.jsx`: React entry point
- `src/App.jsx`: Top-level composition + global “system” overlays
- `src/components/*`: Sections and interactive system components
- `public/`: static assets served at `/` (e.g. `/images/...` if present)
- `dist/`: production build output (generated)

For deeper, file-by-file notes, see `docs/ARCHITECTURE.md`.

## Editing content

Most text/content is currently defined *inline* in component files as arrays/JSX (no CMS).

- **Navigation items / section anchors**: `src/components/Navbar.jsx`
- **Hero titles/roles + CV button behavior**: `src/components/Hero.jsx`
- **About section (bio + contact links)**: `src/components/About.jsx`
- **Work Experience timeline entries**: `src/components/WorkExperience.jsx` (array named `experiences`)
- **Projects / Case Studies carousel entries**: `src/components/Projects.jsx` (array named `projects`)
- **Footer contact/social**: `src/components/Footer.jsx` (and `src/components/TerminalContact.jsx`)

If you change section IDs, keep anchors in sync:

- Section IDs: `#home`, `#about`, `#skills`, `#work`, `#projects`, `#education`, `#contact`
- Navbar anchors must match those IDs (and the `IntersectionObserver` logic depends on them)

## Key features

- **Command Center (⌘K / Ctrl+K)**: search + “system commands” modal, theme switching, and shortcuts.
- **Event-driven UI (CustomEvent bus)**: global actions are fired as `window.dispatchEvent(new CustomEvent(...))`.
- **Achievements system**: unlockable “secrets” persisted to `localStorage`.
- **Night Vision overlay**: toggled via a global event.
- **Resume/CV “decryption” flow**: opened via a global event (Hero button / Command Center).
- **Signature pad**: saves a signature image to `localStorage` and displays it in the footer.
- **High-motion interactions**: scroll-based transforms, hover lenses, cursor effects, etc.

Full feature specs (events, storage keys, triggers) are documented in `docs/FEATURES.md`.

## App architecture

This is a **single-page scroll site** (no router mounted). Sections are rendered in `src/App.jsx`, and the navbar scrolls to anchors.

System overlays communicate through a lightweight global event pattern:

- The “sender” dispatches an event (example: `open-vault`)
- `App.jsx` listens once and toggles modal/overlay state

See `docs/ARCHITECTURE.md` for the exact event names and flows.

## Scripts

From `package.json`:

- `npm run dev`: start Vite dev server
- `npm run build`: production build into `dist/`
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint

## Build output

- Production assets are generated into `dist/`.
- Deployments should serve `dist/` as the static output directory.

## Deployment

This repo is already linked to **Vercel** (there is a `.vercel/project.json`).

Common static hosting settings for Vite:

- **Build command**: `npm run build`
- **Output directory**: `dist`

Detailed guides for Vercel / Netlify / GitHub Pages are in `docs/DEPLOYMENT.md`.

## Troubleshooting

- **Blank page on refresh (static hosts)**: ensure SPA fallback rewrites to `index.html` (see `docs/DEPLOYMENT.md`).
- **Images not loading**: verify paths and whether assets live in `public/` (served from `/...`) vs imported from `src/assets`.
- **Cursor missing**: this site intentionally sets `cursor: none` in `src/index.css`; disable that if you want the default cursor.

More fixes are in `docs/TROUBLESHOOTING.md`.

## Docs

- `docs/ARCHITECTURE.md`: structure, data flow, CustomEvent “event bus”, and localStorage contracts
- `docs/FEATURES.md`: feature-by-feature specs (Command Center, achievements, night vision, etc.)
- `docs/DEVELOPMENT.md`: local dev setup, conventions, and debugging tips
- `docs/DEPLOYMENT.md`: deploy to Vercel/Netlify/GitHub Pages + SPA rewrite rules
- `docs/CONTENT_EDITING.md`: where to edit content safely (projects, experience, contact, images)
- `docs/TROUBLESHOOTING.md`: common issues + fixes
