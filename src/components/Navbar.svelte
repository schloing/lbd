<script lang="ts">
	import ThemeModal from './ThemeModal.svelte';
	import { modals } from 'svelte-modals';
	import { House, Info, Paintbrush, UserRound } from 'lucide-svelte';
	import Footer from './Footer.svelte';
	import { goto } from '$app/navigation';
	const { user } = $props();
</script>

<nav class="mobile dark-box">
	<div class="first">
		<a href="/" class="primary">Leaderbored</a>
	</div>

	<div class="rest">
		<button
			onclick={() => {
				modals.open(ThemeModal);
			}}
			class="link-like"><Paintbrush /></button
		>

		<button onclick={() => modals.open(Footer)} class="link-like"><Info /></button>

		<button onclick={() => goto(`/account/${user.id}`)} class="link-like"><UserRound /></button>
	</div>
</nav>

<nav class="desktop dark-box">
	<div class="first">
		<a href="/" class="primary">Leaderbored</a>
		<button
			onclick={() => {
				modals.open(ThemeModal);
			}}
			class="link-like"><Paintbrush /></button
		>
		<button onclick={() => modals.open(Footer)} class="link-like"><Info /></button>
	</div>

	<div class="rest">
		{#if !user}
			<a href="/account">account</a>
		{:else}
			<a href="/account/{user.id}">{user.username}</a>
		{/if}
		<a href="/board">boards</a>
		<!-- <a href="/docs">docs</a> -->
	</div>
</nav>

<style scoped>
	nav {
		--navbar-padding: 1rem;
		width: 100%;
		line-height: var(--navbar-height);
		padding: 0 var(--navbar-padding);
		margin-bottom: 1rem;
		position: sticky;
		top: 0;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
	}

	.primary {
		font-size: 2rem;
	}

	a {
		font-size: 1.25em;
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
