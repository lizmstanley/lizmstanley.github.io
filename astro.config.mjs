// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
	site: 'https://lizstanley.com',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Figtree',
			cssVariable: '--font-body',
			weights: [400, 500, 700],
			styles: ['normal', 'italic'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Fraunces',
			cssVariable: '--font-fraunces',
			weights: [400, 600, 700],
			styles: ['normal', 'italic'],
			fallbacks: ['Georgia', 'serif'],
		},
	],
});
