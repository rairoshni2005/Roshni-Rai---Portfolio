# Troubleshooting

## App loads blank

Possible causes:

- Build/deploy misconfiguration
- JavaScript runtime error
- Missing assets with hard failure

Checks:

1. Open browser devtools console
2. Run `npm run build` locally
3. Run `npm run preview` and verify local production behavior

## 404 when refreshing deployed URL

Cause:

- Missing SPA fallback rewrite on host

Fix:

- Vercel rewrite to `index.html`
- Netlify `/* /index.html 200`
- Equivalent rewrite for your host

## Resume download button does nothing

Cause:

- `ResumeDecryption` expects `/resume.pdf`

Fix:

1. Place file at `public/resume.pdf`
2. Rebuild and redeploy

## Profile/project images missing

Cause:

- incorrect `/images/...` path or missing file in `public/images`

Fix:

1. Put assets in `public/images/`
2. Reference as `/images/<name>.png`
3. Rebuild

## Command Center shortcut not opening

Checks:

- Confirm key combo is `Cmd/Ctrl + K`
- Ensure browser extensions are not hijacking shortcut
- Verify there is no runtime error in console

## Achievements not persisting

Cause:

- localStorage disabled/blocked
- private browsing constraints

Fix:

- Test in normal browser context
- Clear and retest:
  - `localStorage.removeItem('roshni_achievements')`

## Signature not appearing in footer

Checks:

1. Save signature in modal
2. Confirm keys in storage:
   - `roshni_signature` (primary)
   - `roshni_achievements_signature` (fallback read path)
3. Confirm `signature-updated` event dispatch occurs

## Contact terminal not sending message

Cause:

- external endpoint request issue

Checks:

1. Open network tab
2. Inspect request to FormSubmit URL
3. Verify recipient email in `TerminalContact.jsx`

## Cursor is hidden

Expected behavior:

- `src/index.css` sets `cursor: none` for the custom cursor experience

If undesired:

- remove or override those cursor rules

## Lint/build failures

Recovery sequence:

1. Run `npm run lint`
2. Fix all reported issues
3. Run `npm run build`
4. Run `npm run preview`
