# DSYNZ — Premium Corporate Website

Strategy-led technology partner website built with **HTML5**, **Tailwind CSS**, and **vanilla ES modules** (no React, no WordPress).

Brand aligned with **DSYNZ Logo 2026.pdf**: primary `#7C3AED`, Archivo Black headings, Montserrat body, dark-first aesthetic.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| Process | `process.html` |
| Careers | `careers.html` |
| Contact | `contact.html` |
| Blog | `blog.html` |
| 404 | `404.html` |

## Structure

```
assets/
  css/          input.css → main.css (Tailwind build)
  js/           main, animations, components, forms, seo, home
  favicon/      SVG favicon + web manifest
  images/       OG placeholder SVG
components/     head-meta reference template
robots.txt
sitemap.xml
```

## Quick start

```bash
npm install
npm run build:css    # compile Tailwind after CSS changes
```

Serve locally (ES modules require HTTP):

```bash
npx serve .
# or: python -m http.server 8080
```

Open `http://localhost:3000` (or your port).

## Features

- Sticky glass navbar, dark/light theme toggle
- GSAP scroll reveals + stat counters
- Cursor glow (desktop), page loader
- Reusable components: nav, footer, CTA, forms, newsletter
- Schema.org JSON-LD via `assets/js/seo.js`
- SEO: semantic HTML, meta/OG tags, canonical URLs, sitemap, robots.txt

## Production checklist

1. Run `npm run build:css` before deploy
2. Export `assets/images/og-default.svg` to **1200×630 JPG** as `og-default.jpg` for social previews
3. Point domain in `sitemap.xml`, canonical tags, and `seo.js` base URL
4. Wire contact/newsletter forms to your backend or service (currently client-side UI)
5. Configure host **404** → `404.html`

## Brand copy

- Tagline: *We design unbeatable businesses.*
- Hero: *From clarity to growth, we design technology that helps businesses become unbeatable.*
- Descriptor: *Strategy-led technology partner for growing businesses.*

© DSYNZ
