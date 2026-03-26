# Deployment Guide

This project is a Vite single-page app. All hosts must serve:

- Build command: `npm run build`
- Output directory: `dist`

## 1) Vercel

This repo already has `.vercel/project.json`, meaning it has been linked before.

### Vercel dashboard settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### CLI flow

```bash
npm i -g vercel
vercel
vercel --prod
```

### SPA fallback

Vite + Vercel usually works without extra config, but for strict SPA fallback you can add `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Use this only if you see refresh/deep-link 404 behavior.

## 2) Netlify

### Build settings

- Build command: `npm run build`
- Publish directory: `dist`

### SPA redirect

Create `public/_redirects` (or in publish root at build output stage) with:

```txt
/*  /index.html  200
```

## 3) GitHub Pages

You can deploy `dist` to GitHub Pages, but ensure base path handling if repository is not served from root domain.

### Update Vite config for project subpath (if needed)

In `vite.config.js`, set:

```js
export default defineConfig({
  base: '/<repo-name>/',
  plugins: [react(), tailwindcss()],
})
```

Only do this for Pages under `https://<user>.github.io/<repo-name>/`.

### Build and publish

Use any Pages workflow (manual `gh-pages` branch or GitHub Actions) to publish `dist`.

## 4) Generic static host

Any host works if it can:

1. Run `npm run build`
2. Serve `dist`
3. Apply SPA fallback rewrite to `index.html`

## 5) Environment variables

This project currently has no required env vars for core rendering.

If future integrations are added:

- prefix client-exposed vars with `VITE_`
- access via `import.meta.env.VITE_*`
- document required keys in README and this file

## 6) Post-deploy verification checklist

After deployment:

1. Open homepage
2. Test section navigation dock
3. Open Command Center (`Cmd/Ctrl + K`)
4. Toggle night vision
5. Trigger CV decryption and download
6. Submit a test message in terminal contact
7. Verify social links and footer contact data
8. Hard-refresh and test deep links if any

## 7) Common deployment issues

- **404 on refresh** -> missing SPA rewrite rule
- **Broken images** -> wrong asset paths or missing files in `public/`
- **Resume not downloading** -> missing `public/resume.pdf`
- **Contact form not sending** -> blocked third-party request or incorrect FormSubmit endpoint
