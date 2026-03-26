# Architecture

## 1) Application model

This portfolio is a **single-page React application** built with Vite.  
There is no route-level page switching; navigation is anchor-based scrolling between sections rendered in one tree.

Runtime entry:

- `index.html` mounts `#root`
- `src/main.jsx` renders `<App />`
- `src/App.jsx` composes all sections and global overlays

## 2) Render structure

Top-level composition in `src/App.jsx`:

1. Always-mounted visual/system overlays (cursor layers, warp effect, etc.)
2. Loading gate (`LoadingScreen`) shown first
3. Main app shell after loading:
   - system controllers (`AchievementSystem`, `CommandCenter`, `VibeIndicator`, `SidebarHUD`, `NeuralLink`, `CustomCursor`)
   - navigation (`Navbar`)
   - sections (`Hero`, `About`, `Skills`, `WorkExperience`, `Education`, `Projects`)
   - `Footer`
4. Modal/overlay portals toggled from app state:
   - `AchievementVault`
   - `ResumeDecryption`
   - `SignaturePad`
   - `NightVision`

## 3) Section and anchor contract

Navigation and section IDs must stay aligned.

Expected anchors:

- `#home`
- `#about`
- `#skills`
- `#work`
- `#projects`
- `#education`
- `#contact`

`Navbar` uses:

- `IntersectionObserver` to set active section state
- smooth scroll handler on anchor click

If section IDs change, update `navItems` in `src/components/Navbar.jsx`.

## 4) System communication pattern (CustomEvent bus)

The app uses a lightweight global event bus via `window.dispatchEvent(new CustomEvent(...))` and listeners in related components.

Primary events:

- `toggle-night-vision`  
  Trigger: Command Center command  
  Consumer: `App.jsx` toggles `isNightVision`

- `open-vault`  
  Trigger: Command Center command  
  Consumer: `App.jsx` opens `AchievementVault`

- `open-decryption`  
  Trigger: Hero CTA + Command Center command  
  Consumer: `App.jsx` opens `ResumeDecryption`

- `open-signature`  
  Trigger: Command Center command  
  Consumer: `App.jsx` opens `SignaturePad`

- `unlock-achievement`  
  Trigger: multiple components (Hero, Navbar timer, Command Center, NeuralLink, SoundMixer, etc.)  
  Consumers: `AchievementSystem` (records + notifications) and `App.jsx` (sync unlocked count for vault)

- `signature-updated`  
  Trigger: `SignaturePad` save action  
  Consumer: `Footer` reloads signature image from storage

- `change-vibe`  
  Trigger: `SoundMixer`  
  Consumer: `AmbientSound` adjusts sound profile

- `audio-pulse`  
  Trigger: `AmbientSound`  
  Consumer: `Hero` adjusts aura pulse animation

## 5) State boundaries

- **Global app UI state** (`App.jsx`): loading, modal open/close, night vision, unlocked achievements cache
- **Feature-local state**: each component owns local interactions (drag counters, command search input, timeline hover, etc.)
- **Persistence**: browser `localStorage` for achievements and signature artifacts

## 6) Persistence contract (localStorage)

Keys currently used:

- `roshni_achievements`: JSON array of unlocked achievement IDs
- `roshni_signature`: saved signature image (data URL)
- `roshni_achievements_signature`: optional alternate key read by footer fallback logic

## 7) Styling architecture

- Tailwind v4 is enabled via `@tailwindcss/vite` plugin
- Base theme tokens and global styles are in `src/index.css`
- Visual behavior includes:
  - CSS variables (`--color-accent`, `--color-accent-light`, etc.)
  - custom cursor override (`cursor: none`)
  - noise overlay layer
  - custom scrollbar styles

## 8) Asset model

- Static public assets are referenced from `/...` (for example `/images/profile.png`)
- Build-time imported assets may live in `src/assets`
- Resume download flow expects `/resume.pdf` in `public/`

## 9) Build/deploy architecture

- Build tool: `vite build`
- Output: `dist/`
- Host requirement: static hosting with SPA fallback to `index.html` for deep links/refresh compatibility
