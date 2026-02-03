<script lang="ts">
	import ThemeModal from './ThemeModal.svelte';
	import { modals } from 'svelte-modals';
	import { Info, Paintbrush, Palette, Scroll, UserRound } from 'lucide-svelte';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import Footer from './FooterModal.svelte';
	const { user } = $props();
</script>

<ProgressBar color="#7F57F1" zIndex={1000} />

<nav class="mobile">
	<div class="first">
		<a href="/" class="primary">Leaderbored</a>
	</div>

	<div class="rest">
		<a href="/status" data-sveltekit-preload-data><Scroll /></a>

		<button
			onclick={() => {
				modals.open(ThemeModal);
			}}
			class="link-like"><Paintbrush /></button
		>

		<button onclick={() => modals.open(Footer)} class="link-like"><Info /></button>

		<a href="/account" class={user ? 'green' : 'red'} data-sveltekit-preload-data><UserRound /></a>
	</div>
</nav>

<nav class="desktop">
	<div class="first desktop-left">
		<img src="/leaderbored.svg" class="logo" alt="logo" />
		<a href="/" class="primary">Leaderbored</a>
	</div>

	<div class="rest">
		<button onclick={() => modals.open(Footer)} class="link-like"><Info /></button>

		<a href="/status" data-sveltekit-preload-data><Scroll /></a>

		<button onclick={() => modals.open(ThemeModal)} class="link-like"><Palette /></button>

		<a
			href="/account{user ? `/${user.id}` : ''}"
			class={user ? 'green' : 'red'}
			data-sveltekit-preload-data
		>
			<UserRound />
			{#if user}{user.username}{/if}
		</a>
	</div>
</nav>

<style scoped>
	nav {
		--navbar-padding: 1rem;
		width: 100%;
		line-height: var(--navbar-height);
		padding: 0 var(--navbar-padding);
		position: fixed;
		top: 0;
		z-index: 999;
		display: flex;
		justify-content: space-between;
	}

	.primary {
		font-size: 2rem;
	}

	a {
		font-size: 1.1em;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.green {
		color: var(--main-color);
	}

	.red {
		color: var(--error-color);
	}

	.first,
	.rest {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		overflow: hidden;
		white-space: nowrap;
		flex-wrap: wrap;
	}

	.desktop-left {
		display: flex;
		flex-direction: row;
		gap: 0.2em;
		align-items: center;
	}

	.logo {
		width: 40px;
		height: 40px;
	}

	button {
		font-size: 1.25em;
	}

	.desktop {
		display: flex;
	}

	.mobile {
		display: none;
	}

	@media (max-width: 660px) {
		.mobile {
			display: flex;
			justify-content: space-between;
		}

		.desktop {
			display: none;
		}

		.primary {
			font-size: 1.5em;
		}
	}
</style>
