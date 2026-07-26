# Solomzi — Portfolio + Blog

Built with [Astro](https://astro.build) — fast static site, Markdown-based blog.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Add a new blog post

1. Create a new file in `src/content/blog/`, e.g. `my-new-lab.md`
2. Add frontmatter at the top:

```md
---
title: "My New Lab"
date: 2026-02-01
tags: ["routing", "lab"]
summary: "One-sentence summary shown in the blog list."
readTime: "6 min"
---

Your post content in Markdown goes here.
```

3. Save. That's it — it shows up automatically on `/blog` and the homepage,
   sorted by date. The filename becomes the URL (`my-new-lab` → `/blog/my-new-lab/`).

Put any images in `public/images/` and reference them as `/images/filename.png`.

## Edit your info

- `src/pages/index.astro` — homepage headline, intro, skills grid
- `src/pages/about.astro` — bio, experience, certifications, contact links
- `src/layouts/Layout.astro` — nav links, footer, email/social links

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. In Netlify: **Add new site → Import from Git** → pick the repo
3. Build command: `npm run build`  ·  Publish directory: `dist`
4. Deploy. Every push to `main` auto-deploys after that.

## Set up the admin panel (write posts without touching code)

This site includes [Decap CMS](https://decapcms.org) at `/admin` — a login
screen and form-based editor, like WordPress's admin, but it commits posts
straight to your GitHub repo. This only works on **Netlify** (it uses
Netlify Identity + Git Gateway for login/auth), so deploy there first.

1. **Enable Identity** — in your Netlify site dashboard, go to
   **Site configuration → Identity** → click **Enable Identity**
2. **Enable Git Gateway** — same Identity settings page, scroll to
   **Services → Git Gateway** → click **Enable Git Gateway**
   (this is what lets the CMS commit files to GitHub on your behalf)
3. **Set registration to invite-only** — under Identity settings →
   **Registration**, set it to "Invite only" so random people can't sign up
4. **Invite yourself** — Identity tab → **Invite users** → enter your email.
   You'll get an email with a link — click it, set a password
5. **Go to `yoursite.com/admin`** — log in with that email/password

From there: **New Blog Posts** → fill in title, date, tags, summary, write
the body in the editor → **Publish**. It commits a new `.md` file to
`src/content/blog/` in your repo, Netlify rebuilds automatically (~30-60
sec), and the post is live. Image uploads in the editor go to
`public/images/` automatically too.

No local editing, no git commands, no code — just the login + form, like
WordPress.

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. In Vercel: **Add New → Project** → pick the repo
3. Vercel auto-detects Astro — build command `npm run build`, output `dist`
4. Deploy.

Note: the `/admin` CMS panel above only works on Netlify (it depends on
Netlify Identity). If you deploy to Vercel instead, you'd edit posts by
creating `.md` files locally and pushing to git.

## Custom domain

Both Netlify and Vercel let you attach a custom domain for free (you just
pay for the domain itself, e.g. via Namecheap or Cloudflare) — add it under
the site's **Domain settings** once deployed.
