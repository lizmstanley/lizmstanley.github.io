# lizmstanley.github.io

My personal site and blog, built with [Astro](https://astro.build) and served by GitHub Pages at https://lizmstanley.github.io.

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

## Moving to a custom domain

1. Add a `public/CNAME` file containing the domain.
2. Change `site` in `astro.config.mjs` to the new address.
3. Point the domain's DNS at GitHub Pages, then set the domain under the repo's **Settings > Pages**.

Project sites like `/cbc-circle-manager/` move to the new domain too, and GitHub redirects the old `github.io` addresses.
