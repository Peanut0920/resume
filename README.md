# Enson Chuan · AI Engineer Resume

A modern, interactive, and fully responsive resume website built with a dark cosmic theme, 3D animations, scroll effects, and a built-in photo upload feature. Designed to showcase your AI engineering profile with visual flair and smooth performance on both desktop and mobile.

![Preview](https://via.placeholder.com/1200x600/0a0514/a78bfa?text=Enson+Chuan+Resume)

---

## ✨ Features

### Visual & Interactive
- **Dynamic Starfield Background** – Subtle drifting stars that create a tech-forward ambiance.
- **Parallax Orbs** – Floating gradient orbs that shift as you scroll, adding depth.
- **3D Rotating Cube** – A decorative cube with AI-themed icons in the hero section.
- **Glass-morphism Cards** – Frosted glass panels with subtle glow effects.
- **Scroll Progress Bar** – A top progress indicator showing your reading position.
- **Varied Scroll Reveals** – Sections slide, scale, or rotate into view as you scroll.
- **Staggered Animations** – Skills and experience cards fade in with a delayed cascade.

### Profile & Photo
- **Profile Photo Upload** – Click the circular frame to upload your own photo (PNG with transparent background recommended).
- **Instant Preview** – Your photo replaces the placeholder icon immediately.
- **Hover Hint** – A camera icon appears on hover to indicate upload action.

### Content Sections
- **Hero** – Name, title, typing animation, and contact links.
- **Profile** – Summary with tag badges and key statistics.
- **Education & Certificates** – Timeline layout with clickable certificate previews.
- **Professional Skills** – Detailed explanations for ML, NLP, Data Analysis, Deep Learning, C/C++, and Python.
- **Experience & Activities** – Interactive cards that open photo modals on click.
- **Achievements** – Badges for awards and certifications.

### Performance & Accessibility
- **GPU-accelerated animations** – `will-change` and `backface-visibility` for smooth 60fps.
- **Throttled scroll events** – Uses `requestAnimationFrame` to prevent jank.
- **Touch-optimized** – Works flawlessly on iOS and Android with double-tap prevention.
- **Responsive** – Adapts to all screen sizes from desktop to mobile.
- **Safe Area support** – Respects notches and bottom bars on modern phones.

---

## 🚀 Live Demo

Open `index.html` in your browser, or deploy to any static hosting service:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

---

## 📁 File Structure

```
/
├── index.html          # Main HTML file (contains all CSS & JavaScript)
└── README.md           # This file
```

> **Note:** All styles and scripts are self-contained within `index.html` – no external dependencies other than Font Awesome (CDN) and Vanilla Tilt (CDN).

---

## 🔧 Customization Guide

### 1. Replace the Profile Photo

Click the circular photo frame in the hero section and select your own image. The upload accepts:
- PNG (recommended for transparent backgrounds)
- JPEG
- WebP
- SVG

The photo is stored locally in your browser – no server upload required.

### 2. Update Personal Information

Open `index.html` and search for the following sections:

| Information | Where to Edit |
|-------------|---------------|
| Name & Title | `<h1>Enson Chuan</h1>` and `<p class="hero-sub">Chen Chun</p>` |
| Contact Details | `.hero-contact` links and spans |
| Profile Description | `.about-text p` |
| Education | `.timeline-item` blocks |
| Skills | `.pro-skill-card` cards |
| Experience | `.exp-card` elements |
| Achievements | `.achievement-badge` spans |

### 3. Modify Typing Words

Find the `words` array in the JavaScript section:
```javascript
const words = ["AI Engineer", "Data Scientist", "ML Enthusiast", "Problem Solver"];
```
Replace with your own roles or keywords.

### 4. Change Colors & Theme

The main accent color is `#7c3aed` (purple). To change it:

1. Search for `#7c3aed` in the CSS and replace with your preferred color.
2. Update the gradient in `.hero h1` and `#scroll-progress` to match.

### 5. Replace Certificate & Activity Images

The modal uses placeholder images from `https://picsum.photos/`. To use your own:
- Replace the `src` URL in each `onclick="openModal('...')"` with your own image link.
- Supported formats: JPG, PNG, WebP, SVG.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling, animations, glass-morphism |
| Vanilla JavaScript | Interactivity, scroll effects, typing animation |
| Font Awesome 6 | Icons |
| Vanilla Tilt | 3D tilt effect on cards |
| Canvas API | Starfield background |

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

---

## 📝 License

This project is open-source and available under the MIT License.

```
MIT License

Copyright (c) 2026 Enson Chuan Chen Chun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙌 Credits

- **Font Awesome** – Icons  
- **Vanilla Tilt** – 3D tilt effects  
- **Picsum Photos** – Placeholder images for certificates and activities  

---

## 📬 Contact

For questions, suggestions, or collaboration:

- **Email:** yinkang90804586@gmail.com  
- **Phone:** 019-589 7668  

---

Built with ❤️ and cosmic vibes.
