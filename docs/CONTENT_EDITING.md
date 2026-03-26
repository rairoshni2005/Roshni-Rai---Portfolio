# Content Editing Guide

## Before editing

1. Run `npm run dev`
2. Keep this guide open
3. Edit one section at a time
4. Validate in browser after each change

## Where each content block lives

### Navigation

File: `src/components/Navbar.jsx`

- `navItems` array controls dock items and anchor targets
- Keep each `href` in sync with the section `id`

### Hero section

File: `src/components/Hero.jsx`

- Main name/title text is inline in JSX
- Rotating roles are in inline array:
  - `"UI/UX Researcher"`
  - `"Product Designer"`
  - `"Full-Stack Engineer"`
- Button labels and actions are in the CTA block

### About section

File: `src/components/About.jsx`

- Bio headline, summary bullets, and contact details are inline
- Email, phone, GitHub, and LinkedIn links are set directly in JSX
- Profile image path: `/images/profile.png`

### Skills section

File: `src/components/Skills.jsx`

- `skills` array controls all skill tags and categories
- Categories currently used:
  - `Research`
  - `Design`
  - `Dev`
  - `Soft`

### Work experience

File: `src/components/WorkExperience.jsx`

- `experiences` array is the source of truth
- Each object includes:
  - `role`
  - `company`
  - `date`
  - `intro`
  - `responsibilities` (array)
  - `impact` (HTML string)
  - `tools`

Note: `impact` uses `dangerouslySetInnerHTML`. Keep HTML safe and intentional.

### Education and memberships

File: `src/components/Education.jsx`

- `educationData`: academics
- `memberData`: memberships/positions
- `activityData`: activities/events

### Projects / case studies

File: `src/components/Projects.jsx`

- `projects` array controls cards
- Object keys:
  - `title`
  - `subtitle`
  - `description`
  - `problem`
  - `process`
  - `outcome` (supports HTML string)
  - `image`
  - `tags`

Image paths are currently from `/images/...`.

### Footer and contact

Files:

- `src/components/Footer.jsx`
- `src/components/TerminalContact.jsx`

Edit here for:

- social links
- direct email/phone display
- terminal contact copy
- FormSubmit target endpoint (if email needs to change)

## Asset editing

## Public assets

Put static files in `public/` and reference as `/filename.ext` or `/images/filename.ext`.

Examples:

- `public/resume.pdf` -> `/resume.pdf`
- `public/images/profile.png` -> `/images/profile.png`

## Imported source assets

Keep design assets in `src/assets` when you want bundler-managed imports.

## Safe edit checklist

- Confirm section IDs did not break nav
- Confirm links open correct URLs
- Confirm no missing images in console/network
- Confirm no HTML syntax mistakes in `impact`/`outcome` fields
- Run:
  - `npm run lint`
  - `npm run build`
