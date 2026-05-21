# Shelvey Elmo Dias — Portfolio Website

> Digital Marketing Specialist · SEO & SEM Expert · Analytics & CRO Strategist

A full-featured personal portfolio website with a **retro terminal aesthetic** and a complete **admin panel** for managing all content dynamically — no code changes required.

**Live:** [shelvey.vercel.app](https://shelve.vercel.app)

---

## ✨ Features

### Portfolio (Public)
- **Retro terminal aesthetic** — Phosphor green `#39FF14`, dark navy background, CRT scanlines, IBM Plex Mono font
- **Dark / Light mode** toggle — persisted via `localStorage`
- **Smooth scroll** — Lenis + GSAP ScrollTrigger
- **Particle canvas** hero background (Three.js / Canvas 2D)
- **Animated sections** — GSAP scroll-triggered reveals, typewriter, skill bars, stat counters
- **5 sections** — Hero, About, Experience, Services, Contact
- **Live data** — All content fetched from MongoDB via `/api/public/*` routes with static fallbacks
- **Contact form** — Saves messages to MongoDB, viewable in admin panel

### Admin Panel (`/admin`)
- **Secure login** — NextAuth.js v5 with credentials, JWT in httpOnly cookie
- **Brute-force protection** — 5 attempts → 15-min lockout
- **Route protection** — Middleware-based, all `/admin/*` routes guarded
- **7 editable sections** — Hero, About, Experience, Services, Social, SEO, Messages inbox
- **CRUD** — Add / Edit / Delete experience entries and service cards
- **OG image upload** — Drag & drop to Cloudinary
- **Messages inbox** — Read contact form submissions, reply via email

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS variables |
| Animation | GSAP 3 + ScrollTrigger, Framer Motion |
| 3D / Canvas | Three.js, @react-three/fiber |
| Smooth scroll | Lenis |
| Database | MongoDB Atlas + Mongoose |
| Auth | NextAuth.js v5 (Credentials + JWT) |
| Image upload | Cloudinary |
| Notifications | Sonner |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alizubu/Shelvey-s-Portfolio.git
cd Shelvey-s-Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Auth
NEXTAUTH_SECRET=          # Run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_URL=http://localhost:3000

# Admin login credentials
ADMIN_USER=shelvey
ADMIN_PASSWORD=your_secure_password

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# Cloudinary (for OG image upload in admin)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to access the admin panel.

---

## 🗄 Database Setup (MongoDB Atlas)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free M0 cluster
2. Create a **Database User** with a strong password
3. Under **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — required for Vercel)
4. Get your **Connection String** → Drivers → Node.js
5. Replace `<password>` with your actual password and add `/portfolio` as the database name
6. Paste the full URI as `MONGODB_URI` in your `.env.local`

> The database auto-seeds with default content on first request — no manual setup needed.

---

## ☁ Deploying to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.example` in **Settings → Environment Variables**
4. Deploy

> Set `NEXTAUTH_URL` to your production domain, e.g. `https://shelveyelmodias.vercel.app`

---

## 📁 Project Structure

```
├── app/
│   ├── admin/                  # Admin panel (login + dashboard)
│   │   ├── login/              # Retro terminal login page
│   │   └── dashboard/          # Hero, About, Experience, Services, Social, SEO, Messages
│   ├── api/
│   │   ├── admin/              # Protected CRUD endpoints
│   │   ├── public/             # Public read-only endpoints (portfolio frontend)
│   │   ├── contact/            # POST — saves contact form messages
│   │   └── upload/             # POST — Cloudinary image upload
│   ├── globals.css             # CSS variables, component classes, animations
│   ├── layout.tsx              # Root layout with ThemeProvider + Lenis
│   └── page.tsx                # Portfolio home (Hero → About → Experience → Services → Contact)
│
├── components/
│   ├── admin/                  # Admin UI (Sidebar, Header, Field, Section, SessionWrapper)
│   ├── layout/                 # Portfolio chrome (TopNavbar, Sidebar, CustomCursor, ThemeToggle)
│   ├── sections/               # Hero, About, Experience, Services, Contact
│   └── ui/                     # TypewriterText, TerminalWindow, GlowBadge, SkillBar, StatCounter
│
├── lib/
│   ├── db/                     # mongoose.ts (connection), seed.ts (default data)
│   ├── models/                 # Hero, About, Experience, Service, Social, Seo, Message
│   ├── apiGuard.ts             # requireAdmin() — checks session on API routes
│   └── sanitize.ts             # XSS sanitization for all user inputs
│
├── middleware.ts               # Protects /admin/* routes, redirects unauthenticated users
├── auth.ts                     # NextAuth config — Credentials provider + brute-force guard
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

---

## 🔒 Admin Panel

### Login

Navigate to `/admin/login`

| Field | Value |
|---|---|
| User ID | Value of `ADMIN_USER` in your `.env.local` |
| Password | Value of `ADMIN_PASSWORD` in your `.env.local` |

### Dashboard Routes

| Route | Purpose |
|---|---|
| `/admin/dashboard` | Overview — section cards + live stats |
| `/admin/dashboard/hero` | Name, title, tagline, CTA buttons, badge |
| `/admin/dashboard/about` | Bio, location, email, disciplines CRUD |
| `/admin/dashboard/experience` | Work history — add / edit / delete jobs |
| `/admin/dashboard/services` | Service cards — add / edit / delete |
| `/admin/dashboard/social` | Facebook, Instagram, GitHub, LinkedIn, Twitter |
| `/admin/dashboard/seo` | Meta title, description, OG image upload |
| `/admin/dashboard/messages` | Contact form inbox — read & reply |

---

## 🌐 API Reference

### Public (no auth)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/public/hero` | Hero section content |
| `GET` | `/api/public/about` | About section content |
| `GET` | `/api/public/experience` | Experience list |
| `GET` | `/api/public/services` | Services list |
| `GET` | `/api/public/social` | Social media links |

### Admin (session required)

| Method | Route | Description |
|---|---|---|
| `GET/PUT` | `/api/admin/hero` | Read / update hero |
| `GET/PUT` | `/api/admin/about` | Read / update about |
| `GET/POST` | `/api/admin/experience` | List / create experience |
| `PUT/DELETE` | `/api/admin/experience/[id]` | Update / delete experience entry |
| `GET/POST` | `/api/admin/services` | List / create service |
| `PUT/DELETE` | `/api/admin/services/[id]` | Update / delete service card |
| `GET/PUT` | `/api/admin/social` | Read / update social links |
| `GET/PUT` | `/api/admin/seo` | Read / update SEO settings |
| `GET` | `/api/admin/messages` | Read contact form messages |
| `POST` | `/api/contact` | Submit contact form (public) |
| `POST` | `/api/upload` | Upload image to Cloudinary |

---

## 🧑‍💻 Author

**Shelvey Elmo Dias**
Digital Marketing Specialist · R&D Executive at Hirdaramani Bangladesh

- 📍 Chittagong, Bangladesh
- ✉ shelveyelmodias@gmail.com
- 🔗 [facebook.com/shelveyelmodias](https://facebook.com/shelveyelmodias)
- 📷 [instagram.com/shelveyelmodias](https://instagram.com/shelveyelmodias)
- 💻 [github.com/shelveyelmodias](https://github.com/shelveyelmodias)

---

## 📄 License

This project is private. All rights reserved © 2026 Shelvey Elmo Dias.
