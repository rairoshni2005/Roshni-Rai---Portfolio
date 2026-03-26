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
