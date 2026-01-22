<script lang="ts">
	import ThemeModal from './ThemeModal.svelte';
	import { modals } from 'svelte-modals';
	import { themeStore } from '$/stores/theme';
	import { Info, Paintbrush } from 'lucide-svelte';
	const short = (str: string, len = 12) => (str?.length > len ? str.slice(0, len) + '...' : str);
	const { user } = $props();
</script>

<nav class="dark-box">
	<div class="first">
		<a href="/" class="primary">Leaderbored</a>
		<button
			onclick={() => {
				modals.open(ThemeModal);
			}}
			class="link-like"><Paintbrush /></button
		>
		<!-- TODO: move "no budget" Footer to open from here -->
		<button class="link-like"><Info /></button>
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

	@media (max-width: 660px) {
		.primary {
			display: none;
		}

		.rest {
			margin: 0 auto;
			line-height: 3rem;
		}
	}
</style>
