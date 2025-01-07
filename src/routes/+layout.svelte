<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import type { LayoutServerData } from './$types';
	import type { Snippet } from 'svelte';
	import { userStore } from '$/stores/user';
	import Footer from '$/components/Footer.svelte';

	let { data, children }: { data: LayoutServerData; children: Snippet } = $props();
	$userStore = data.user;
</script>

<Navbar />
<main>
	<section class="center-children">
		{@render children()}
	</section>
</main>
<Footer />

<style>
	:root {
		--color-text: #000000;
		--color-fine-text: #727272;
		--color-background: #d3d3d3;
		--color-link: #254d97;
		--color-active-link: #2c2c2c;
		--color-tr-odd-background: #8d8d8d;
		--color-tr-odd-background-hover: #797979;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		font-weight: normal;
	}

	:global(body) {
		color: var(--color-text);
		background: var(--color-background);
		margin: 0;
		padding: 0;
		transition:
			color 0.5s,
			background-color 0.5s;
		line-height: 1.2;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 20px;
		text-rendering: optimizeLegibility;
	}

	:global(h1) {
		font-size: 50px;
		margin: 0;
	}

	:global(p) {
		font-size: 24px;
	}

	:global(body > h1, h2, h3, p) {
		margin: 0;
	}

	:root {
		--navbar-height: 5rem;
		--border-size: 0.1rem;
		--border-radius: 0rem;
		--info-height: 3.5rem;
	}

	main {
		margin-top: var(--navbar-height);
		height: calc(100vh - 2 * var(--navbar-height));
		padding: 0;
		z-index: 1;
	}

	section {
		width: 100%;
		padding: 1em 1em;
	}

	:global(.center-children) {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(main > *) {
		/* make slot content take up all space */
		height: 100%;
	}

	:global(a) {
		text-decoration: underline;
		text-underline-offset: 0.2em;
		color: var(--color-text);
	}

	:global(p:has(a)) {
		margin-bottom: 0.2em;
	}

	:global(a:hover) {
		color: var(--color-active-link);
	}

	:global(a .active) {
		color: var(--color-active-link);
	}

	:global([data-tooltip]) {
		position: relative;
		cursor: help;
		text-decoration: underline;
		z-index: 1000;
	}

	:global([data-tooltip]::before) {
		/* todo set position to cursor */
		content: attr(data-tooltip);
		position: absolute;
		display: block;
		background: var(--color-text);
		color: var(--color-background);
		font-size: 0.5em;
		padding: 0.25em;
		margin: 0 auto;
		text-align: center;
		z-index: 1;
		opacity: 0;
		pointer-events: none;
		transform: translateY(20px);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	:global([data-tooltip]:hover::before) {
		opacity: 1;
	}

	:global(.stealth) {
		font-size: 16px;
		color: var(--color-fine-text);
	}

	:global(.darkstealth) {
		font-size: 16px;
		color: var(--color-text);
	}

	:global(input, button) {
		outline: none;
		padding: 1em;
	}

	:global(input[type='text']) {
		width: 90%;
		margin: 0 auto;
		padding: 0.5em;
	}

	:global(.vertical-form) {
		height: 270px;
		width: 350px;
		padding: 1em;
		display: flex;
		flex-direction: column;
		border: var(--border-size) solid var(--color-text);
		justify-content: space-evenly;
	}
</style>
