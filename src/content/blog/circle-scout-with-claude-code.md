---
title: "Building tools for my bird count, with an AI that doesn't get to make the decisions"
pubDate: 2026-11-24
description: How I plan, scope, and review the CBC Circle Manager and Circle Scout apps while Claude Code writes most of the code.
---

I've been the compiler for the [Bloomington, MN Christmas Bird Count](https://www.bloomingtoncbc.org/) since 2020. Our circle has been counted every year since 1966, and the 61st count is on December 19. It's a complex circle, divided into 24 areas over the south Twin Cities suburbs. Last year we had 63 field observers and 4 feeder counters, and they turned in 50 species and 7,380 birds, in 21-52 mph northwest winds.

All of that data comes back to me. Counters take a photo of their count sheet and email it in, and I get it into two different websites, Audubon and the Minnesota Ornithologists' Union (MOU). Before count day I'm matching 50+ people to areas that need coverage, and pairing new counters with experienced ones.

## How it got here

My first round of tooling was [cbc_utils](https://github.com/lizmstanley/cbc_utils), started in December 2024. It's a collection of scripts around a Google setup: Sheets for the roster, Forms for signups, My Maps for the area outlines, and Apps Script to glue some of it together. The scripts pull recent eBird sightings inside the circle into KML for Google My Maps, use Puppeteer to enter results into the Audubon and MOU sites from a single CSV (neither site has an API), and use AI to pull the totals off photographed count sheets.

It helped, but it's a bunch of scripts scattered about, and the roster still lived in spreadsheets. Six years of them, which was getting unwieldy. So I decided to move to a database, and then immediately realized that a UI on top of it would make it work so much better.

There was a second reason. At my full-time job, this last year has been a huge transition to AI. I've been using it heavily, out of necessity (and because it's been mandated.) I decided to take that experience and build this project from scratch with AI.

So this November I started [CBC Circle Manager](https://lizmstanley.github.io/cbc-circle-manager/). It's a browser-only app for compilers: roster, area assignments, reminders, results tracking, and a map with the areas and eBird data. There's no server. The roster lives in a real Postgres database running inside the browser ([PGlite](https://pglite.dev)), saved to IndexedDB.

That choice came from two constraints: volunteer names and emails must stay on the compiler's computer, and there's no budget for hosting. The data is relational with real rules (one current season per circle, an area belongs to one circle), so I wanted a real SQL engine rather than JSON in local storage. The rules live in the database as constraints and views, so "open area" or "needs a reminder" has one definition, tested once against real Postgres. PGlite also means the schema could move to a server unchanged, if it ever needs to.

## Circle Scout

The second app is for the counters themselves. Circle Scout installs to a phone's home screen as a web app. A counter scans a QR code from me, and their area shows up on the map. It follows them as they walk, says whether they're in their area, and (still to come) suggests hotspots and species from recent eBird sightings.

The plan had a short list of principles before any code:

- No app stores and no fees. It's served from the same GitHub Pages site.
- No server and no database. The area travels in the link itself, after the `#`, so it never reaches a server.
- Each user brings their own eBird API key.
- iPhone and Android from the first release.
- Prove it on real phones before building features.

That last one paid off. The first thing built was a throwaway test page, and I ran a checklist on my Pixel 8 Pro: install, location, eBird, QR codes from the in-app scanner and from the camera app, persistent storage. A couple of the results were worth knowing up front: persistent storage is granted only once the page is installed (a plain Chrome tab is denied), and a QR code scanned by the Pixel camera opens straight into the installed app. And our largest area outline fit in a QR code with no simplification at all.

## How I work with Claude Code

I've been a software engineer for over 25 years, and I've long recognized that the job is problem solving and analysis. Typing was never the hard part. My definition of vibe coding is using AI blindly: accepting its output without any control or challenge. I use AI as an accelerator for my experience, under my control, to write production quality applications. It doesn't replace the engineering in software engineering. It's a force multiplier.

Claude Code writes most of the code in this repo. The way I use it looks a lot like how I'd run a team.

I own the plan. Each project starts as a written plan: the outcome, the principles, what's out of scope, the milestones, and a "Not verified" list of assumptions that still need proof. Then it's broken into issues, each with a goal, the outcome a user would see, context that names the actual functions and files, a design idea, rejected alternatives, and constraints. A build order says which issues wait on which, and which can run in parallel.

From there, each issue gets its own session. I launch a background session per issue, in its own git worktree, running a pipeline of skills I've built up over time: write a spec checked against the code, implement, verify, then several review passes before a PR opens. The PR description says what changed, why, what was rejected, how it was tested, and what was not verified. I review and merge.

Checking terms and licenses is part of the work too. The map originally pulled tiles from `tile.openstreetmap.org`, whose usage policy targets light use, and Circle Scout would put that map on a lot of phones at once. So it moved to OpenFreeMap. The satellite view went away entirely, because Esri's World Imagery requires Esri software or a paid ArcGIS subscription.

The first commit was November 22, and 14 PRs had merged by November 24, including the Circle Scout app shell, area QR codes, and live location.

## Where I still do the job

The code comes fast. The judgment about what to build is still mine, and the field is where it shows up.

While the location work was queued up, it occurred to me that counters will be running the eBird app at the same time, switching back and forth. Will Circle Scout still work? It turns out a web page gets no location at all while it's off screen, the browser drops the screen wake lock when the page is hidden, and iOS can close a home screen app in the background so it starts cold on return. None of the issues said what should happen when someone comes back. So the location and effort tracking issues were updated before they started: restart tracking on return, save the running session on every change, compute hours from saved start and stop times, and count each gap in the route as a straight line, flagged in the totals.

The first suggestion for the miles was to just use the eBird app's own track. But not everyone will be using eBird. That went into the rejected list.

Same with testing. The plan had a 30-minute outdoor walk as a check before the location feature was built. But the test page that walk was for had already been removed, so there was nothing to walk with. Now the walk happens on the live site after the feature merges, and before effort tracking starts, which is the feature that actually depends on it.

## What's next

Recent sightings and hotspots by distance, rare birds nearby, directions, and effort tracking for party hours and miles. All of it needs to work on December 19.
