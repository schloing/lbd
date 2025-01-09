<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import type { LayoutServerData } from './$types';
	import type { Snippet } from 'svelte';
	import { get } from 'svelte/store'
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
		/* default shadow */
		--bg-color: #000;
		--main-color: #eee;
		--caret-color: #eee;
		--sub-color: #444;
		--sub-alt-color: #171717;
		--text-color: #eee;
		--error-color: #fff;
		--error-extra-color: #d8d8d8;
		--colorful-error-color: #fff;
		--colorful-error-extra-color: #d8d8d8;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		font-weight: normal;
	}

	:global(body) {
		color: var(--text-color);
		background: var(--bg-color);
		margin: 0;
		padding: 0;
		transition:
			color 0.5s,
			background-color 0.5s;
		line-height: 1.2;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 20px;
		text-rendering: optimizeLegibility;
		transition: background 250ms;
	}

	:global(h1) {
		font-size: 50px;
		margin: 0;
	}

	:global(p) {
		font-size: 22px;
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

	:global(.primary) {
		color: var(--text-color);
	}

	:global(a, .link-like) {
		color: var(--sub-color);
		text-decoration: none;
	}

	:global(.link-like) {
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
		font-size: 22px;
		padding: 0;
	}

	:global(a:hover, .link-like:hover) {
		color: var(--text-color);
	}

	:global(p:has(a)) {
		margin-bottom: 0.2em;
	}

	:global(a .active) {
		color: var(--main-color);
	}

	:global([data-tooltip]) {
		position: relative;
		cursor: help;
		text-decoration: underline;
		z-index: 1000;
	}

	:global([data-tooltip]::before) {
		/* todo set position to cursor */
		max-height: 15px;
		line-height: 15px;
		content: attr(data-tooltip);
		position: absolute;
		display: block;
		background: var(--text-color);
		color: var(--bg-color);
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
		color: var(--sub-color);
	}

	:global(.darkstealth) {
		font-size: 16px;
		color: var(--text-color);
	}

	:global(input, button:not(.link-like)) {
		outline: none;
		padding: 1em;
	}

	:global(input[type='text'], input[type='password']) {
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
		/* border: var(--border-size) solid var(--text-color); */
		justify-content: space-evenly;
	}

	:global(button:not(.link-like)) {
		margin: 1em 0;
		color: var(--text-color);
		background: var(--sub-alt-color);
		outline: none;
		border: none;
	}

	:global(button:not(.link-like):hover) {
		color: var(--sub-alt-color);
		background: var(--text-color);
	}
</style>
