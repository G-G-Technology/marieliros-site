# GOLIVE Plan — marieliros-site

> **Site:** [marieliros.com.br](https://marieliros.com.br)  
> **Stack:** Nuxt 3 · Vue 3 · TypeScript · Tailwind CSS · MongoDB · Cloudinary · Vercel  
> **Estimated total effort:** ~5 focused days

---

## Overview

The site is currently a **static single-page landing site** deployed to GitHub Pages. All content (text, images) is hardcoded in Vue components. This plan transforms it into a fully managed site where the owner can update images, bio, services, and contact info through a secure admin panel — without touching code.

### What will change

| Feature | Before | After |
|---|---|---|
| Content updates | Edit source code | Admin panel |
| Image hosting | `/public/img/` static files | Cloudinary CDN |
| Authentication | None | Email OTP (secure, no passwords) |
| Data storage | Hardcoded | MongoDB Atlas |
| Deployment | GitHub Pages (static only) | Vercel (supports serverless API) |

---

## Phase 1 — Library Upgrades

**Goal:** Modernize dependencies before building new features. `nuxt-primevue` is deprecated and must be replaced.

### Package changes

```bash
# Remove deprecated packages
npm uninstall nuxt-primevue primeicons

# Upgrade core
npm install nuxt@latest vue@latest

# PrimeVue 4 (replaces nuxt-primevue)
npm install primevue@^4 @primevue/nuxt-module primeicons@^7

# Other modules
npm install @nuxt/image@latest @nuxtjs/tailwindcss@latest @nuxtjs/sitemap@latest nuxt-viewport@latest

# New backend dependencies
npm install mongoose nodemailer cloudinary nuxt-auth-utils
npm install --save-dev @types/nodemailer
```

### `nuxt.config.ts` module name change

```ts
// Before
modules: ['nuxt-primevue', ...]

// After
modules: ['@primevue/nuxt-module', ...]
```

### Verification
- `npm run dev` loads without errors
- All existing UI components render correctly
- PrimeVue components still work (check carousel, buttons)

---

## Phase 2 — Fix Image Display Issues

**Goal:** Images should never crop unexpectedly. Use responsive containers with proper aspect ratios.

### Problem
`PictureComponent.vue` uses fixed pixel dimensions (`w-778 h-372`) that cause images to be cut off at different screen sizes.

### Changes

**`components/common/PictureComponent.vue`**
- Replace fixed pixel sizes with responsive aspect-ratio containers
- Use `object-cover` with `object-position: center top` for portraits
- Add skeleton loading state while image loads

**`components/banner-carousel/BannerCarousel.vue` & `BannerCarouselMobile.vue`**
- Use `aspect-[16/9]` or `aspect-[4/3]` containers
- Ensure full-width fill without overflow clipping

**`components/contacts/ContactSection.vue`**
- Fix background image clipping with `bg-cover bg-center`

**`nuxt.config.ts`**
- Configure `@nuxt/image` with `quality: 80`, `format: ['webp']`
- Set Cloudinary as provider for production

### Verification
- All 5 sections display images without cropping on mobile and desktop
- Images load as WebP in production
- No layout shift on page load

---

## Phase 3 — OTP Authentication ✅

**Goal:** Only pre-approved emails can log in. No passwords stored.

### Admin email allowlist

Rather than a database users table, allowed admin emails are stored in `ADMIN_EMAILS` env var — simple, secure, easy to change without touching the database.

```
ADMIN_EMAILS="psi.marieliros@gmail.com,compilation.sideprojects@gmail.com"
```

To add or remove an admin: update this variable in Vercel and redeploy.

> **ORM decision:** Using **Mongoose** (not Prisma) — Mongoose is more mature for MongoDB and gives better native-feature support. Prisma shines with relational databases (PostgreSQL).

### Login flow

```
/admin  →  middleware checks session
           └─ no session → redirect to /admin/login
           └─ valid session → show dashboard

/admin/login:
  1. Admin enters their email
  2. POST /api/auth/send-otp { email } → validates allowlist, generates 6-digit OTP, hashes with SHA-256, stores in DB, emails code to that address
  3. Admin enters code → POST /api/auth/verify-otp { email, otp } → validates, sets signed session cookie
  4. Redirect to /admin (session shows which email is logged in)
```

### Rate limiting
OTP requests are limited to 1 per 2 minutes per email (`OTP_RATE_LIMIT_MINUTES=2`).

### Files created

| File | Purpose |
|---|---|
| `server/utils/mongoose.ts` | Lazy MongoDB connection |
| `server/models/otp.ts` | OTP document model |
| `server/api/auth/send-otp.post.ts` | Allowlist check, generate OTP, send email |
| `server/api/auth/verify-otp.post.ts` | Validate OTP, set session |
| `server/api/auth/logout.post.ts` | Clear session cookie |
| `middleware/admin.ts` | Nuxt route middleware, protects `/admin/**` |
| `pages/admin/login.vue` | Email + OTP login form |
| `pages/admin/index.vue` | Admin dashboard |
| `types/auth.d.ts` | Augments `nuxt-auth-utils` User type |

### MongoDB schema — `otps` collection

```ts
{
  email: string,
  otpHash: string,     // SHA-256 hash of the 6-digit code
  expiresAt: Date,     // now + 10 minutes (TTL index auto-deletes)
  used: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Session shape

```ts
{ user: { isAdmin: true, email: "psi.marieliros@gmail.com" } }
```

### Environment variables

```
ADMIN_EMAILS="psi.marieliros@gmail.com,compilation.sideprojects@gmail.com"
NUXT_SESSION_PASSWORD="<32+ char random string>"   # already set in .env
```

### Verification
1. Visit `/admin` → redirected to `/admin/login`
2. Enter an email NOT in `ADMIN_EMAILS` → error "Email não autorizado"
3. Enter allowed email → OTP arrives at that address within 30 seconds
4. Enter wrong code → "Código incorreto ou expirado"
5. Enter correct code → redirected to `/admin` dashboard (shows logged-in email)
6. Request second code within 2 min → rate limit error
7. Click logout → session cleared, redirected to login

---

## Phase 4 — Cloudinary Integration

**Goal:** Admin can replace any site image from the dashboard. Images are served from Cloudinary CDN worldwide.

### Image slots

Each named slot maps to a Cloudinary public ID in the folder `marieli-website-prod/`:

| Slot name | Used in |
|---|---|
| `carousel-1` | Hero carousel, slide 1 |
| `carousel-2` | Hero carousel, slide 2 |
| `carousel-3` | Hero carousel, slide 3 |
| `about` | About Me section |
| `about-online` | Appointment type — Online |
| `about-presencial` | Appointment type — In-person |
| `how-can-i-help` | How Can I Help section |
| `contact` | Contact section background |

### New files

| File | Purpose |
|---|---|
| `server/api/images/upload.post.ts` | Receive file → upload to Cloudinary → return URL |
| `server/api/images/list.get.ts` | List current images from Cloudinary folder |
| `pages/admin/images.vue` | Image management UI |

### How upload works

```
Browser: select file
  → POST /api/images/upload (multipart, slot name + file)
    → server: validate session, upload to Cloudinary with public_id = `{folder}/{slot}`
    → returns { url, publicId }
  → update content document in MongoDB with new URL
  → frontend refreshes image
```

### Nuxt Image + Cloudinary

```ts
// nuxt.config.ts
image: {
  cloudinary: {
    baseURL: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`
  }
}
```

### Verification
1. Log in to `/admin/images`
2. Upload a new image for `about` slot
3. Refresh homepage → new image displays in About section
4. Image served as WebP from Cloudinary CDN

---

## Phase 5 — Database Content Management

**Goal:** Bio, services, and contact info stored in MongoDB, editable from admin without code changes.

### MongoDB schema — `content` collection (singleton document)

```ts
{
  _id: "site-content",
  bio: {
    name: string,
    title: string,
    credentials: string[],
    paragraphs: string[]
  },
  services: [
    { id: string, title: string, description: string, icon: string }
  ],
  contact: {
    whatsapp: string,    // phone number for wa.me link
    email: string,
    instagram: string    // @handle
  },
  images: {
    [slotName: string]: string  // Cloudinary URL
  }
}
```

### New API routes

| Route | Auth | Purpose |
|---|---|---|
| `GET /api/content` | Public | Return full content document (used by homepage SSR) |
| `PUT /api/content` | Admin only | Update content document |

### Frontend refactor

**`pages/index.vue`**
```ts
const { data: content } = await useFetch('/api/content')
```

Each section component receives content as props:
- `AboutMe.vue` ← `content.bio`
- `OfferedServices.vue` ← `content.services`
- `ContactSection.vue` ← `content.contact`
- Image components ← `content.images[slotName]`

### Admin pages

| Page | Purpose |
|---|---|
| `pages/admin/index.vue` | Dashboard with links to all sections |
| `pages/admin/images.vue` | Upload/replace images |
| `pages/admin/bio.vue` | Edit name, title, credentials, paragraphs |
| `pages/admin/services.vue` | Add/edit/delete services |
| `pages/admin/contact.vue` | Edit WhatsApp, email, Instagram |

### Database seeding

Before going live, run a one-time seed script to insert the current hardcoded content into MongoDB so the site doesn't break on first deploy.

```bash
# Will be provided as server/scripts/seed.ts
npx tsx server/scripts/seed.ts
```

### Verification
1. Log in to admin → edit bio → save → refresh homepage → new bio text appears
2. Add a new service → save → refresh homepage → new service card appears
3. Update Instagram handle → save → refresh contact section → new handle shown

---

## Phase 6 — Vercel Deployment ✅

**Goal:** Migrate from GitHub Pages (static only) to Vercel (supports server API routes via serverless functions).

### Why Vercel
- Free tier is sufficient for this site
- Auto-detects Nuxt 3 — zero config needed
- Server API routes become serverless functions automatically
- Easy custom domain connection
- Preview deploys on every PR

### CI/CD — GitHub Actions

The old `nuxtjs.yml` workflow (GitHub Pages) has been **deleted** and replaced with `.github/workflows/deploy.yml`:

```yaml
name: CI/CD Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx nuxt typecheck
      - run: npm run lint

  deploy-staging:
    needs: test
    if: github.event_name == 'pull_request'
    uses: amondnet/vercel-action@v25
    with:
      vercel-token: ${{ secrets.VERCEL_TOKEN }}
      vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
      vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-production:
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    uses: amondnet/vercel-action@v25
    with:
      vercel-token: ${{ secrets.VERCEL_TOKEN }}
      vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
      vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
      vercel-args: '--prod'
```

### Required GitHub Secrets

Add these in the repository's **Settings → Secrets and variables → Actions**:

| Secret | How to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel dashboard → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel dashboard → Team/Account Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel project → Settings → General → Project ID |

### Setup steps

**1. Create Vercel project**
- Go to [vercel.com](https://vercel.com) → Import Git Repository → select `marieliros-site`
- Framework preset: Nuxt.js (auto-detected)
- **Do not** set a build command — defaults are correct

**2. Set environment variables in Vercel dashboard**

| Variable | Value / Source |
|---|---|
| `DATABASE_URL` | MongoDB Atlas connection string |
| `NUXT_SESSION_PASSWORD` | Generate: `openssl rand -base64 32` |
| `ADMIN_EMAILS` | `psi.marieliros@gmail.com,compilation.sideprojects@gmail.com` |
| `EMAIL_USER` | `compilation.sideprojects@gmail.com` |
| `EMAIL_APP_PASSWORD` | Gmail App Password from `.env` |
| `CLOUDINARY_CLOUD_NAME` | `dmzxqlog7` |
| `CLOUDINARY_API_KEY` | From `.env` |
| `CLOUDINARY_API_SECRET` | From `.env` |
| `CLOUDINARY_GALLERY_FOLDER` | `marieli-site` |
| `OTP_RATE_LIMIT_MINUTES` | `2` |

**3. MongoDB Atlas — allow Vercel IPs**
- Go to Network Access → Add IP `0.0.0.0/0` (allow all, simplest option)
- Or add Vercel's IP ranges (listed in Vercel docs under Static IPs)

**4. Connect custom domain**
- In Vercel: Settings → Domains → Add `marieliros.com.br`
- Update DNS at your registrar: add CNAME pointing to `cname.vercel-dns.com`

**5. Add GitHub secrets** (see table above)

**6. Push to `main`** — the workflow runs tests then deploys to production automatically

### Pre-launch checklist

- [ ] All environment variables added to Vercel dashboard
- [ ] GitHub secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` set
- [ ] MongoDB Atlas IP whitelist updated (allow `0.0.0.0/0` or Vercel ranges)
- [ ] Cloudinary folder `marieli-website-prod` exists — upload initial images with the correct slot names
- [ ] OTP email flow tested on the Vercel preview URL (staging)
- [ ] Content document seeded: first `GET /api/content` auto-seeds from defaults in code
- [ ] All images display correctly — no cropping, loads as WebP from Cloudinary
- [ ] Admin login works end-to-end on production URL
- [ ] DNS propagated and HTTPS certificate issued by Vercel (usually < 5 min)
- [ ] Old GitHub Pages site disabled: repository Settings → Pages → disable
- [ ] Sitemap accessible at `https://marieliros.com.br/sitemap.xml`

### Verification
```bash
# Test production build locally before pushing
npm run build && npm run preview
```

---

## Database Schemas

The app uses **MongoDB** with **Mongoose**. There are no migration files — Mongoose applies schema defaults and indexes automatically on startup. Two collections are created:

---

### Collection: `otps`

Stores one-time passwords for the login flow. Documents are **automatically deleted by MongoDB** when `expiresAt` passes (TTL index).

| Field | Type | Required | Notes |
|---|---|---|---|
| `_id` | ObjectId | auto | Mongoose default |
| `email` | String | yes | Email that requested the OTP |
| `otpHash` | String | yes | SHA-256 hex hash of the 6-digit code |
| `expiresAt` | Date | yes | `now + 10 minutes` — TTL index deletes the doc automatically |
| `used` | Boolean | no | `false` until code is verified; prevents replay |
| `createdAt` | Date | auto | Mongoose timestamps |
| `updatedAt` | Date | auto | Mongoose timestamps |

**Indexes:**
- `{ email: 1 }` — for rate-limit lookup
- `{ expiresAt: 1 }` with `expireAfterSeconds: 0` — **TTL index** (MongoDB auto-deletes expired OTPs)

**Model file:** [server/models/otp.ts](server/models/otp.ts)

---

### Collection: `contents`

Singleton document — always one record with `_id = "site-content"`. Stores all editable site content.

> **No `_id` auto-generation** — the schema uses `{ _id: false }` and the document is created with a fixed string ID. The content is auto-seeded on the first `GET /api/content` request if the document doesn't exist.

| Field | Type | Required | Notes |
|---|---|---|---|
| `bio.mainParagraph` | String | no | Intro paragraph on About Me section |
| `bio.education` | String | no | Credentials / education text |
| `bio.practice` | String | no | Who you work with / modalities text |
| `services` | String[] | no | List of topics shown in "Como posso te ajudar?" |
| `contact.whatsapp` | String | no | Phone number (digits only, e.g. `554891507605`) |
| `contact.email` | String | no | Contact email address |
| `contact.instagram` | String | no | Instagram handle without @ |
| `images` | Map<String, String> | no | Cloudinary URLs keyed by slot name (see below) |
| `createdAt` | Date | auto | Mongoose timestamps |
| `updatedAt` | Date | auto | Mongoose timestamps |

**Image slot keys** (values are Cloudinary URLs):

| Key | Section |
|---|---|
| `carousel-1` | Hero carousel — slide 1 |
| `carousel-2` | Hero carousel — slide 2 |
| `carousel-3` | Hero carousel — slide 3 |
| `about` | About Me section photo |
| `about-online` | Appointment type — Online |
| `about-presencial` | Appointment type — In-person |
| `how-can-i-help` | "How Can I Help" section |
| `contact` | Contact section background |

**Model file:** [server/models/content.ts](server/models/content.ts)

---

### No migrations needed

MongoDB is schemaless — Mongoose validates shape at the application level. When a new field is added to the schema:
- New documents get the default value automatically
- Existing documents return `undefined` for the new field (Mongoose applies the default in code, not in the DB record)
- No migration script is needed unless you need to backfill existing documents with a specific value

---

## Local Development & Testing

### Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 20+ | Use [nvm](https://github.com/nvm-sh/nvm) to manage versions |
| npm | 10+ | Included with Node 20 |
| MongoDB | Local or Atlas free tier | Local: `brew install mongodb-community` |

### 1. Clone and install

```bash
git clone https://github.com/<your-org>/marieliros-site.git
cd marieliros-site
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Minimum required for local development:

```env
# MongoDB — use a local instance or a free Atlas cluster
DATABASE_URL=mongodb://localhost:27017/marieliros-dev

# Session — generate a random 32+ char string
NUXT_SESSION_PASSWORD=your-random-32-char-string-here

# Allowed admin emails (comma-separated, no spaces)
ADMIN_EMAILS=your@email.com

# OTP email sender — requires a Gmail App Password
# https://myaccount.google.com/apppasswords
EMAIL_USER=your-sender@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# Cloudinary — from your Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_GALLERY_FOLDER=marieli-site

# Rate limiting
OTP_RATE_LIMIT_MINUTES=2
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail". Use the 16-char code (spaces optional, the server strips them).

### 3. Start MongoDB locally (if not using Atlas)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or run directly
mongod --dbpath /usr/local/var/mongodb
```

### 4. Run the dev server

```bash
npm run dev
```

The site will be at [http://localhost:3000](http://localhost:3000).  
The admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin).

> The content document is **auto-seeded** on the first page load — no seed script needed. MongoDB indexes (including the OTP TTL index) are also created automatically on startup.

### 5. Test the admin flow end-to-end

```
1. Open http://localhost:3000/admin
   → Should redirect to /admin/login

2. Enter your email (must be in ADMIN_EMAILS)
   → Click "Enviar código"
   → Check your inbox — OTP arrives within ~30 seconds

3. Enter the 6-digit code
   → Should redirect to /admin dashboard

4. Edit bio → Save → Open http://localhost:3000 in another tab → Confirm text changed

5. Upload an image (any slot) → Refresh homepage → Confirm image updates

6. Click Logout → Confirm session clears and redirects to login
```

### 6. Type checking and linting

```bash
# TypeScript type check
npx nuxt typecheck

# Lint (check only)
npm run lint

# Lint + auto-fix
npm run lint:fix
```

### 7. Test the production build locally

```bash
npm run build
npm run preview
```

This runs the Nitro server (same runtime as Vercel) at [http://localhost:3000](http://localhost:3000). Use this to verify API routes work correctly before deploying.

### Common local issues

| Issue | Fix |
|---|---|
| `DATABASE_URL environment variable is not set` | Check `.env` exists and `DATABASE_URL` is set |
| OTP email not arriving | Check spam; verify `EMAIL_APP_PASSWORD` has no trailing spaces |
| `Email não autorizado` on login | Your email is not in `ADMIN_EMAILS` |
| Images not loading | Cloudinary env vars missing or `CLOUDINARY_GALLERY_FOLDER` doesn't exist in Cloudinary |
| Session not persisting | `NUXT_SESSION_PASSWORD` must be 32+ characters |

---

## Environment Variables Reference

| Variable | Used by | Notes |
|---|---|---|
| `DATABASE_URL` | MongoDB connection | Atlas connection string |
| `NUXT_SESSION_PASSWORD` | nuxt-auth-utils | 32+ char random string |
| `EMAIL_USER` | Nodemailer (OTP sender) | `geguitechnology@gmail.com` |
| `EMAIL_APP_PASSWORD` | Nodemailer | Gmail App Password (not account password) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary SDK | `dmzxqlog7` |
| `CLOUDINARY_API_KEY` | Cloudinary SDK | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary SDK | From Cloudinary dashboard |
| `CLOUDINARY_GALLERY_FOLDER` | Image upload | `marieli-site` |
| `RECAPTCHA_SITE_KEY` | reCAPTCHA widget | Public key |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA verify | Private key |
| `OTP_RATE_LIMIT_MINUTES` | OTP rate limiter | `2` |

---

## Implementation Order

| # | Phase | Effort | Risk | Dependencies |
|---|---|---|---|---|
| 1 | Library upgrades | 0.5 day | Low | None |
| 2 | Fix image display | 0.5 day | Low | Phase 1 |
| 3 | OTP authentication | 1 day | Medium | Phase 1 |
| 4 | Cloudinary integration | 1 day | Low | Phase 3 |
| 5 | Database content management | 1.5 days | Medium | Phase 3, 4 |
| 6 | Vercel deployment | 0.5 day | Low | All phases |

**Total: ~5 focused days**

---

## For the Site Owner (Post-Launch Guide)

Once deployed, you can manage your site at `https://marieliros.com.br/admin`.

### How to log in
1. Go to `/admin/login`
2. Click **Send code**
3. Check your email at `psi.marieliros@gmail.com`
4. Enter the 6-digit code (valid for 10 minutes)

### What you can change
- **Images** — Replace any photo on the site (hero carousel, about section, etc.)
- **Bio** — Update your name, title, credentials, and description text
- **Services** — Add, edit, or remove the services you offer
- **Contact info** — Update your WhatsApp number, email, or Instagram handle

### Tips
- Images work best in landscape orientation for the carousel (recommended ratio: 16:9)
- For the About section photo, portrait orientation works best (recommended ratio: 3:4)
- Changes appear on the live site immediately after saving
