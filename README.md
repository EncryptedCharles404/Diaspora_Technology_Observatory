# Diaspora Technology Observatory — v3

Africa's free patent intelligence platform. Built on React + Vite + Supabase.

## Stack
- **Frontend**: React 18 + Vite → static build
- **Hosting**: Cloudflare Pages (free, unlimited bandwidth)
- **Database**: Supabase PostgreSQL (free tier)
- **Payments**: Lemon Squeezy
- **Analytics**: Google Analytics (G-LDC5RGGMDB)
- **Keep-alive**: GitHub Actions (pings Supabase every 3 days)

---

## Setup Order

### 1 — Supabase (5 minutes)
1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose a region close to your users (London or Frankfurt for UK/Africa)
3. SQL Editor → New Query → paste and run `supabase/schema.sql`
4. SQL Editor → New Query → paste and run `supabase/seed.sql`
5. Authentication → Users → Add User:
   - Email: `hello@dtoportal.com`
   - Password: choose something strong (16+ characters)
   - Tick "Auto Confirm User"
6. Project Settings → API → copy:
   - **Project URL** (looks like `https://abc123.supabase.co`)
   - **anon public key** (long string starting with `eyJ`)

### 2 — Local setup
```bash
cp .env.example .env
# Edit .env and paste your Supabase URL and anon key

npm install
npm run dev
# Open http://localhost:5173
# Test admin at http://localhost:5173/#admin
```

### 3 — Test the admin panel
1. Go to `http://localhost:5173/#admin`
2. Log in with your Supabase Auth email and password
3. Verify you can see all 80 entries
4. Try adding, editing, and deleting a test entry
5. Check the Consultations, Subscribers, Analytics, and Audit Log tabs

### 4 — Build and deploy to Cloudflare Pages
```bash
npm run build
# This creates the dist/ folder
```

**Deploy via Direct Upload:**
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → Create a project
2. Choose "Direct Upload" → upload the `dist/` folder
3. Environment Variables → add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Custom domains → add `dtoportal.com`

### 5 — GitHub (for keepalive workflow)
1. Push this project to a GitHub repository
2. Settings → Secrets and variables → Actions → New repository secret:
   - `SUPABASE_URL` = your Supabase project URL
   - `SUPABASE_ANON_KEY` = your Supabase anon key
3. The workflow in `.github/workflows/keepalive.yml` will run automatically every 3 days

---

## Admin Panel

**URL:** `dtoportal.com/#admin` — not linked from public navigation

**Login:** Your Supabase Auth email and password (set in step 1 above)

**What you can do:**
- **Patents tab**: Add, edit, delete entries; toggle published/draft; search and filter
- **Consultations tab**: View all requests; update status (new → replied → closed)
- **Subscribers tab**: View everyone who signed up to the newsletter
- **Analytics tab**: See which entries get viewed most
- **Audit Log tab**: Full record of every add, edit, and delete you make

**Adding a new entry:**
1. Go to `dtoportal.com/#admin` → sign in
2. Click "Add Entry"
3. Fill in the form — Name, Sector, Access Type, and Description are required
4. Toggle "Published" on to make it visible immediately, or leave as Draft
5. Click "Add Entry" — it appears in the public library within seconds

---

## File Structure

```
dto-v3/
├── index.html                     ← SEO meta, OG tags, JSON-LD, GA
├── vite.config.js
├── package.json
├── .env.example                   ← Copy to .env — add your Supabase keys
├── .gitignore
├── public/
│   └── robots.txt
├── supabase/
│   ├── schema.sql                 ← Run first — creates all tables
│   ├── seed.sql                   ← Run second — loads all 80 entries
│   └── create_admin.sql           ← Instructions for creating your admin account
├── .github/workflows/
│   └── keepalive.yml              ← Pings Supabase every 3 days
└── src/
    ├── main.jsx
    ├── App.jsx                    ← Hash router
    ├── styles.css                 ← Complete design system
    ├── lib/
    │   ├── supabase.js            ← Public queries
    │   ├── auth.js                ← Sign in / sign out / session
    │   └── admin.js               ← All admin database operations + audit log
    ├── components/
    │   ├── Nav.jsx
    │   ├── Footer.jsx
    │   ├── CookieBanner.jsx       ← UK GDPR compliant
    │   ├── BackToTop.jsx
    │   ├── Ticker.jsx
    │   ├── WaitlistForm.jsx       ← Writes to subscribers table
    │   ├── PatentCard.jsx         ← With share button, view count, expandable notes
    │   ├── SkeletonCard.jsx       ← Loading skeleton
    │   └── PatentForm.jsx         ← Admin add/edit form
    └── pages/
        ├── Home.jsx
        ├── Library.jsx            ← Search, 4 filters, shareable ?id= links
        ├── Shop.jsx
        ├── Contact.jsx            ← Writes to consultation_requests table
        ├── Methodology.jsx
        ├── About.jsx
        ├── Terms.jsx
        ├── Updates.jsx            ← Changelog + recently added
        ├── ErrorPage.jsx          ← 404
        ├── Admin.jsx              ← Auth wrapper
        ├── AdminLogin.jsx
        └── AdminDashboard.jsx     ← Full CRUD + 5 tabs
```

---

## Changing Your Admin Password

Supabase dashboard → Authentication → Users → click your account → Reset password

---

## Adding More Entries Later

From the live site at `dtoportal.com/#admin`:
1. Sign in
2. Patents tab → Add Entry
3. Fill in the form → click Add Entry
4. Done — visible immediately on the public site

No GitHub, no code, no deployment needed.

---

## Lemon Squeezy Checkout URLs

| Report | Price | URL |
|--------|-------|-----|
| Complete Bundle (all 5) | £199 | `https://dtoportal.lemonsqueezy.com/checkout/buy/b66a064b-441d-4938-bfd8-0c34a6abb1fd` |
| Pharmaceuticals | £79 | `https://dtoportal.lemonsqueezy.com/checkout/buy/fb3c4a7c-ddbc-4bd8-895e-517fb87f35a4` |
| Agriculture | £59 | `https://dtoportal.lemonsqueezy.com/checkout/buy/29b01940-0e53-46ea-9a18-e92e02f32c77` |
| Energy | £69 | `https://dtoportal.lemonsqueezy.com/checkout/buy/9f8c920f-2a78-4eed-9352-d741f6adb6bf` |
| Mining & Minerals | £79 | `https://dtoportal.lemonsqueezy.com/checkout/buy/76bbdc16-ff4e-4460-862f-30492c739c40` |
| Textiles & Leather | £49 | `https://dtoportal.lemonsqueezy.com/checkout/buy/b2c45afc-5e0f-423c-ac24-b676d4a43d3a` |
