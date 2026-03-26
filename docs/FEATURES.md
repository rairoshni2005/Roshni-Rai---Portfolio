# Feature Reference

## Command Center

File: `src/components/CommandCenter.jsx`

Behavior:

- Opens with `Cmd/Ctrl + K`
- Supports free-text filtering across:
  - command actions
  - system logs
- Keyboard shortcuts while open:
  - `N`: toggle night vision
  - `D`: open CV decryption modal
  - `S`: open signature modal
  - `A`: open achievement vault
- Theme switcher updates CSS variables on `document.documentElement`

Achievement hooks:

- Unlocks `FOUND_CMD_K` first time terminal is opened
- Unlocks `ALTERED_REALITY` when theme is changed

## Achievement System

Files:

- `src/components/AchievementSystem.jsx` (notifications + persistence)
- `src/components/AchievementVault.jsx` (archive modal)

Known IDs:

- `FOUND_CMD_K`
- `ALTERED_REALITY`
- `HERO_DISTURBED`
- `NEURAL_ACCESS`
- `LONG_STAY`
- `FINAL_MASTER`

Notes:

- `AchievementSystem` stores unlocked IDs to `roshni_achievements`
- Notifications appear even if achievement already existed (feedback behavior)
- `FINAL_MASTER` auto-triggers after the first 5 non-final achievements

## Hero interaction system

File: `src/components/Hero.jsx`

Capabilities:

- Draggable headline with auto-recenter behavior
- “Roshni intervention” fake cursor animation after drag
- Role text rotates periodically
- Audio-reactive aura based on `audio-pulse` events
- CTA actions:
  - `View Projects`: scrolls to `#projects`
  - `Access CV`: fires `open-decryption`

Achievement hook:

- Dragging/interrupting enough times unlocks `HERO_DISTURBED`

## Navigation dock

File: `src/components/Navbar.jsx`

Capabilities:

- Floating bottom dock anchor navigation
- Active section tracking through `IntersectionObserver`
- Brand logo anchor to `#home`
- “System Terminal” action dispatches synthetic key event for command center

Achievement hook:

- Unlocks `LONG_STAY` after 60 seconds on page

## Resume decryption modal

File: `src/components/ResumeDecryption.jsx`

Flow:

1. Encrypted state
2. Decrypting progress animation
3. Success state
4. Download trigger

Download contract:

- Expects resume at `/resume.pdf`
- Creates temporary anchor element and downloads as `Roshni_Rai_Resume.pdf`

## Signature system

Files:

- `src/components/SignaturePad.jsx`
- `src/components/Footer.jsx`

Flow:

1. User opens signature modal
2. Draws/saves signature
3. Signature is persisted to localStorage
4. `signature-updated` event notifies footer
5. Footer displays saved signature image if available

## Contact terminal

File: `src/components/TerminalContact.jsx`

Flow:

- Simulated terminal prompt asks for name + message
- Submits message to FormSubmit endpoint
- Shows staged success response after delay

Integration detail:

- Outbound request is made to `https://formsubmit.co/ajax/rairoshni2005@gmail.com`
- No server-side handling in this repo

## Visual effect systems (ambient)

Related files include:

- `CustomCursor.jsx`
- `GhostCursor.jsx`
- `FluidCursor.jsx`
- `WarpDrive.jsx`
- `NightVision.jsx`
- `VibeIndicator.jsx`
- `SidebarHUD.jsx`
- `NeuralLink.jsx`

These are presentation/interaction layers, mostly event-driven and independent from content sections.
