# ChicaTechHub

Portfolio and lead-generation site for ChicaTechHub, built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion and PostgreSQL.

## Features

- Animated portfolio: hero with rotating services and counters, client case-study pop-ups, filterable projects, tabbed tech stack, experience timeline, FAQ
- Dark / light mode, scroll progress bar, mobile menu, floating WhatsApp button
- 3-step "free quote" form that saves enquiries to PostgreSQL (validated, rate-limited, spam honeypot)
- Password-protected admin dashboard at `/admin`: view, search and filter enquiries, set status (new / contacted / won / lost), private notes, reply by email or WhatsApp, visit counter
- Optional instant alerts to Discord/Slack via `NOTIFY_WEBHOOK_URL`

## Edit the content

All text (services, clients, projects, awards, skills, FAQ, contact details) is in `src/lib/content.ts`. Replace `public/profile.webp` to change the photo.

## Run locally

```bash
cp .env.example .env.local   # then set ADMIN_PASSWORD and SESSION_SECRET
npm install
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/admin. Locally the database is an embedded Postgres in `.data/`.

## Deploy to Render

1. Push this folder to a GitHub repository.
2. In Render: **New → Blueprint**, pick the repository. `render.yaml` creates the web service and a PostgreSQL database.
3. When asked, enter your own `ADMIN_PASSWORD` (and optionally `NOTIFY_WEBHOOK_URL`).

Note: Render's free web service sleeps after 15 minutes idle (first visit then takes ~30–50 s), and the free database expires after 30 days. For a client-facing site, upgrade the web service to Starter and the database to Basic.
