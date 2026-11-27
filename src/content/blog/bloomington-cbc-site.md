---
title: "From hand-drawn areas to a QR code per area: rebuilding bloomingtoncbc.org"
pubDate: 2026-11-26
description: How the Bloomington CBC website moved off Google Sites, how 24 hand-drawn areas got onto a real map, and how much coverage each area needs.
---

I'm the compiler for the [Bloomington, MN Christmas Bird Count](https://www.bloomingtoncbc.org/), and the website is where counters go for everything: the count sheet, the maps, how to submit results, and past years' results. This is the story of how it got from a Google Site to something counters can use on count day. It's a companion to my earlier post on [building the CBC tools with Claude Code](/blog/circle-scout-with-claude-code/).

## Off Google Sites

The site started on Google Sites. It was simple to get something up, but it was clunky and limited. Pages were mostly embeds: a Google Doc here, a Sheet there, a My Maps iframe for the circle. I wanted everything in one place, so I moved it to GitHub Pages and rebuilt it with [Astro](https://astro.build). Most pages are plain Markdown now, and the site deploys on every push.

## The areas, drawn by hand

Our circle is divided into 24 areas. Several years ago I drew every one of them by hand in Google My Maps, tracing from the old paper and PDF maps that had been handed down to me.

They now live in my circle manager app, which exports the map as KML. A small script on the site turns that KML into the area outlines, and the Maps page draws them with MapLibre on an [OpenFreeMap](https://openfreemap.org) street map. Click an area and its details show beside the map, and a link like `#area-7` opens it directly. Each area, plus the whole circle, also gets a one-page PDF for anyone who wants a printed map.

## How many counters does each area need?

This is the question I get from area leaders, and the one I ask myself every year when matching people to areas. I had the area outlines and the eBird hotspots inside each one, so I gave that to Gemini and asked it for staffing and mode recommendations: how many people, how many parties, and whether each area is better walked or driven.

The first answer was very low. It was the bare minimum. For example, it suggested only 2 people for area 17, which covers Old Cedar Ave. Bridge, the Bluffs Trail, Black Dog East Outlet, Mound Springs, and the bluff roads. I told it that was the bare minimum and challenged it to come up with a minimum and an ideal that were realistic. After some back and forth, area 17 came out at 3 people in 2 parties at minimum, and 4-6 people in 3 parties ideally.

Across the circle, that works out to 39-43 field counters in 28 parties at minimum, and 76-96 counters in 36-43 parties ideally. For reference, last year we had 63 field observers. That's comfortably above the minimum, and well short of ideal.

The recommendations also sort the areas into three kinds:

- Walking areas, compact and built around trail networks (areas 1, 5, 10, 11, 13).
- Driving areas with stops to walk, larger suburban or industrial areas with scattered parks and lakes (6, 14, 15, 19, 21, 22, 23, 24).
- Mixed areas, where the refuge, creek, and park corridors need walkers and the upland parks and neighborhoods need a driver (2, 3, 4, 7, 8, 9, 12, 16, 17, 18, 20).

Area 19 is a good example of why mode matters. It includes the MSP Airport cargo roads, so even the minimum is 2 people in one vehicle: a driver and a spotter.

## On the page, for counters

All of that is on the [Maps](https://www.bloomingtoncbc.org/count-info/maps/) page now. Each area shows its size, its hotspots, the minimum and ideal number of counters, the recommended mode, and notes on where to go. The page also explains how to install [CBC Scout](/birdspotter/cbc/scout/), the phone app that shows a counter their area and where they are in it.

Each area also has a QR code, on the page and on its printed map. A counter scans it with CBC Scout and their area loads. Since those codes are posted publicly, they leave out area leaders' phone numbers, and CBC Scout now opens to the map without an eBird key, so scanning a code is all it takes to see your area.

Count day is December 19.
