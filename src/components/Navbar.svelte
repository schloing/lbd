<script lang="ts">
	import { NavbarBoardInfo } from '$/stores/navbar';
</script>

<nav>
	<a href="/">Leaderbored</a>
	<div class="rest">
		<a href="/account">account</a>
		<a href="/board">boards</a>
	</div>
	{#if $NavbarBoardInfo}
		<svelte:component this={$NavbarBoardInfo} />
	{/if}
</nav>

<style scoped>
	nav {
		--navbar-padding: 1rem;
		width: calc(100% - 2 * var(--navbar-padding));
		height: var(--navbar-height);
		line-height: var(--navbar-height);
		background: var(--color-background);
		padding: 0 var(--navbar-padding);
		margin: 0;
		position: sticky;
		top: 0;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		font-size: 1.4em;
		border-bottom: var(--border-size) solid var(--color-text);
	}

	.rest {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
