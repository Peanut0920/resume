# Enson Chuan — Portfolio (React + Vite)

Professional portfolio for **Enson Chuan Chen Chun** (AI Undergraduate, XMUM). Built with React 18 + Vite 5 — ready to upload to any static host.

## Quick Start

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # outputs to dist/
npm run preview # preview production build
```

## Deploy / Upload to Website

The production build is in `dist/` — upload the **contents of `dist/`** to your host.

### Option A — Static hosting (cPanel / File Manager)
1. Run `npm run build` locally
2. Upload everything inside `dist/` to `public_html/` (or your domain folder) via File Manager / FTP
3. Ensure `.htaccess` is not required — this is a SPA with hash-free routing, but all routes are anchor links so no rewrite needed. For subfolder deployment, `vite.config.js` `base: './'` already handles relative assets.

### Option B — Vercel
```bash
npm i -g vercel
vercel --prod
# or connect GitHub repo and set Build Command: npm run build, Output: dist
```

### Option C — Netlify
- Drag-and-drop `dist/` in Netlify dashboard, or
- Connect repo: Build `npm run build`, Publish `dist`

### Option D — GitHub Pages
```bash
npm run build
# push dist to gh-pages branch, or set vite.config.js base to "/REPO_NAME/" then use gh-pages
```

## Project Structure

```
.
├── index.html          # Vite entry
├── public/
│   └── Enson resume.pdf
├── src/
│   ├── main.jsx        # ReactDOM entry
│   ├── App.jsx         # All sections: Hero, Profile, Education, Skills, Experience, Achievements, CTA
│   └── App.css         # Design tokens & responsive styles
├── vite.config.js
└── dist/               # Production build (generated)
```

## Editing Content

- **Text / resume data**: `src/App.jsx`
- **Styling**: `src/App.css` (`:root` variables for colors, radius, shadow)
- **Images / certificates**: Replace `https://picsum.photos/...` URLs in `App.jsx` `openModal(...)` calls with local files in `public/certs/` e.g. `public/certs/spm.jpg` → `"/certs/spm.jpg"`
- **Resume PDF**: replace `public/Enson resume.pdf`
- **Avatar**: click avatar in UI to upload — persists in `localStorage` (key `enson_avatar`)

## Legacy Static Version

Original static file preserved as `index.legacy.html` for reference.

## Stack

- React 18 (JavaScript, no TypeScript)
- Vite 5
- Google Fonts: Inter, Instrument Serif/Sans, JetBrains Mono
- Font Awesome 6.5.2 (CDN)

## Notes

- `base: './'` in `vite.config.js` makes the build portable (works in subfolders and domain root).
- No backend required — fully static.
