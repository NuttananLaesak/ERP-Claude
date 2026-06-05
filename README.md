# ERP System — HR Module

A web-based ERP system with HR management built on Next.js, Auth.js v5, and Prisma Postgres.

**Live Demo:** [https://nattanan-erp-claude.vercel.app](https://nattanan-erp-claude.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth | Auth.js v5 (next-auth beta) |
| Database | PostgreSQL via Prisma Accelerate |
| ORM | Prisma 7 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Deploy | Vercel |

---

## Features

- Role-based access control — `ADMIN` and `EMPLOYEE` roles
- HR dashboard — employee list, department & position management
- Employee portal — self-service profile view
- Authentication — credentials login with bcrypt-hashed passwords
- Animated UI with Framer Motion

---

## Prerequisites

- Node.js 18+
- npm
- A [Prisma Postgres](https://www.prisma.io/postgres) database (with Accelerate enabled)

---

## Local Setup

### 1. Clone the repo

```bash
git clone <repo-url>
cd my-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Prisma Postgres (Accelerate) — from prisma.io/postgres dashboard
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"

# Auth.js — generate with: npx auth secret
AUTH_SECRET="your-secret-here"
```

> **DATABASE_URL** — get this from your [Prisma Postgres dashboard](https://console.prisma.io).  
> **AUTH_SECRET** — run `npx auth secret` and paste the output.

### 4. Push database schema

```bash
npm run db:push
```

### 5. Seed demo data

```bash
npm run db:seed
```

This creates departments, positions, employees, and two admin accounts.

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@company.com` | `password123` |
| Admin | `demo@company.com` | `password123` |
| Employee | `alice@company.com` | `password123` |
| Employee | `bob@company.com` | `password123` |

> All seeded employees use `password123` and have the `EMPLOYEE` role.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (webpack mode) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push schema to database (no migration history) |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:seed` | Seed demo data |
| `npm run db:reset` | Wipe and re-seed the database |
| `npm run db:studio` | Open Prisma Studio |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login page
│   ├── dashboard/       # Main dashboard
│   │   ├── hr/          # HR management (admin only)
│   │   ├── employee/    # Employee portal
│   │   └── settings/    # Settings
│   └── api/             # API routes
├── actions/             # Server actions
├── components/          # Shared UI components
├── lib/                 # Prisma client, utilities
└── types/               # TypeScript types
prisma/
├── schema.prisma        # Database schema
└── seed.ts              # Demo data seeder
```

---

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add environment variables: `DATABASE_URL` and `AUTH_SECRET`
4. Deploy
