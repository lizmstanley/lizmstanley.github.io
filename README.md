# lizmstanley.github.io

My personal site and blog, built with [Astro](https://astro.build) and served by GitHub Pages at https://lizstanley.com.

Other project repos with GitHub Pages turned on are served under this domain at their own path, for example `/cbc-circle-manager/`. They deploy from their own repos. Don't add a page here at a path a project repo already uses.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Posts

Posts are Markdown or MDX files in `src/content/blog/`. The file name is the URL: `src/content/blog/my-post.md` is served at `/blog/my-post/`.

```yaml
---
title: My post
description: One line for the blog list and the page description.
pubDate: 2026-11-24
draft: true
---
```

A post with `draft: true` shows up under `npm run dev` only. Remove the line, or set it to `false`, to publish it.

## Deploy

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`.

## Custom domain

The domain is set under the repo's **Settings > Pages**, not with a `CNAME` file, because the site deploys through Actions. `site` in `astro.config.mjs` must match it. DNS for `lizstanley.com` is at Verve Hosting: four A records for GitHub Pages on the bare domain, and `www` as a CNAME to `lizmstanley.github.io`. Mail uses `mail.lizstanley.com`, which stays on Verve.

Project sites like `/cbc-circle-manager/` are served on this domain too, and GitHub redirects the old `github.io` addresses.
