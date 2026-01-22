<script lang="ts">
	import { Modals } from 'svelte-modals';
	import Navbar from '$/components/Navbar.svelte';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { fade } from 'svelte/transition';
	import '$/global.css';
	import { browser } from '$app/environment';
	import { themeStore } from '$/stores/theme.js';
	let { data, children } = $props();
	const { user } = $derived(data);

	if (browser) {
		$effect(() => {
			document.documentElement.className = `theme-${$themeStore}`;
		});
	}

</script>

<svelte:head>
	<title>leaderbored</title>
	{#if browser}
		<link rel="stylesheet" href={`/themes/${$themeStore}.css`} />
	{/if}

	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

	<meta name="description" content="the tuffest realtime leaderboard app." />
	<meta
		name="keywords"
		content="leaderboard, real-time leaderboard, gaming, competitions, classroom, scoreboard"
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<meta property="og:title" content="Leaderbored" />
	<meta property="og:description" content="the tuffest realtime leaderboard app." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://leaderbored.online/" />
	<meta property="og:image" content="https://leaderbored.online/leaderbored.png" />
</svelte:head>

<ProgressBar color="#7F57F1" />

<div class="modal-wrapper">
	<Modals>
		{#snippet backdrop({ close })}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="backdrop" onclick={() => close()} transition:fade|global={{ duration: 250 }} />
		{/snippet}
	</Modals>
</div>

<Navbar {user} />
<div class="layout">
	<main>
		{@render children()}
	</main>
</div>

<style scoped>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.4);
	}

	.layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;
	}

	main {
		width: 100%;
		height: 100%;
		border-radius: 0.25em;
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
