# 🌿 Verdant Space

> *Connecting People, Nature & Knowledge*

A modern, full-featured blog and pictorial website for environmental storytelling. Built with React + Vite, Tailwind CSS, and optional Supabase backend.

---

## ✨ Features

- **Home Page** — Dynamic hero, core pillars section, latest posts, gallery preview
- **Blog Hub** (`/blog`) — Searchable, filterable grid of articles
- **Blog Articles** (`/blog/:id`) — Distraction-free reading with Markdown rendering
- **Pictorial Gallery** (`/gallery`) — Masonry layout with lightbox and hover overlays
- **About & Contact** (`/about`) — Origin story, values, contact form
- **Hidden Admin Panel** (`/vs-admin`) — Secure dashboard for full content management
  - Hero carousel editor (multiple rotating slides)
  - Site content editor (About page, Vision/Mission, Objectives, Footer)
  - Blog publisher with live Markdown preview
  - Gallery manager
  - Post dashboard with edit/delete

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Optional: Supabase (skip for localStorage mode)
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Admin password (change this!)
VITE_ADMIN_PASSWORD=YourSecurePassword123!
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Backend Options

### Option A: localStorage (Zero-config, works instantly)

No setup needed! The app uses browser `localStorage` as a fallback when Supabase is not configured. Perfect for development and demos.

- Data persists across page reloads in the same browser
- Seed content is pre-loaded automatically
- No sign-up required

### Option B: Supabase (Recommended for production)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Copy your **Project URL** and **anon public key** from Project Settings → API
4. Add them to your `.env` file
5. Create an admin user in Supabase Authentication → Users

---

## 🔐 Admin Panel

Access at: `/vs-admin`

**Default password** (localStorage mode): `VerdantAdmin2024!`

Change this immediately by setting `VITE_ADMIN_PASSWORD` in your `.env`.

For Supabase mode, use the email/password of a user you created in Supabase Auth.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Forest Green | `#1F4D2E` | Primary CTA, headings, nav |
| Verdant Green | `#6A8F45` | Tags, active states, links |
| Sage Green | `#A8B47A` | Cards, borders, accents |
| Warm White | `#FAFAF7` | Site background |
| Charcoal | `#2F3439` | Body text |
| Light Grey | `#8E9E93` | Secondary text, borders |

**Fonts:** Cormorant Garamond (headings) · DM Sans (body) · Mansalva (accent)

---

## 📂 File Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Glassmorphism sticky nav
│   ├── Footer.jsx          # Site footer
│   ├── BlogCard.jsx        # Blog post card (normal + featured)
│   ├── GalleryCard.jsx     # Photo card with hover overlay
│   ├── Lightbox.jsx        # Full-screen image viewer
│   └── LoadingSpinner.jsx  # Loading state
├── pages/
│   ├── HomePage.jsx        # Landing page with all sections
│   ├── BlogHubPage.jsx     # Blog listing with search/filter
│   ├── BlogArticlePage.jsx # Individual article reader
│   ├── GalleryPage.jsx     # Masonry pictorial gallery
│   ├── AboutPage.jsx       # About + contact form
│   └── admin/
│       ├── AdminPanel.jsx   # Main admin wrapper + layout
│       ├── AdminLogin.jsx   # Login screen
│       ├── Dashboard.jsx    # Posts table overview
│       ├── HeroEditor.jsx   # Edit hero section
│       ├── BlogPublisher.jsx # Write + publish articles
│       └── PictorialManager.jsx # Add/remove gallery images
├── contexts/
│   └── AuthContext.jsx     # Auth state (Supabase or session)
├── hooks/
│   └── useScrollFade.js    # Scroll-triggered fade-in animations
├── lib/
│   ├── supabase.js         # Supabase client
│   ├── dataStore.js        # Data layer (Supabase or localStorage)
│   └── seedData.js         # Default content
└── utils/
    └── markdown.js         # Lightweight Markdown renderer
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy /dist to Vercel via CLI or GitHub integration
```

Add environment variables in Vercel dashboard under Settings → Environment Variables.

### GitHub Pages

```bash
npm run build
# Push /dist contents to gh-pages branch
```

Update `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

---

## 🌱 Content Guide

### Adding Articles (Admin Panel)

1. Go to `/vs-admin`
2. Click **Publish Article** in the sidebar
3. Fill in Title, Category, Subtitle, Image URL, and Body
4. Body supports Markdown:
   ```markdown
   ## Section Heading
   
   Regular paragraph text.
   
   > A blockquote for key quotes.
   
   **Bold** and *italic* text.
   
   - Bullet point
   - Another point
   ```
5. Click **Publish Article**

### Adding Gallery Images

1. Go to `/vs-admin` → **Pictorial**
2. Paste an image URL (Unsplash works great)
3. Add caption and location
4. Click **Add to Gallery**

---

## 🔧 Customization

- **Brand colors** — Edit `tailwind.config.js`
- **Navigation links** — Edit `src/components/Navbar.jsx`
- **Categories** — Edit `src/lib/seedData.js` → `seedCategories`
- **Seed content** — Edit `src/lib/seedData.js` for default posts/images
- **Hero defaults** — Edit `src/lib/seedData.js` → `seedHero`

---

*Built with care for the living world. 🌿*
