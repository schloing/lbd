<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />
<main>
	{@render children()}
</main>

<style>
	:root {
		--color-text: #000000;
		--color-background: #d3d3d3;
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
		min-height: 100vh;
		color: var(--color-text);
		background: var(--color-background);
		margin: 0;
		padding: 0;
		transition:
			color 0.5s,
			background-color 0.5s;
		line-height: 1.6;
		font-family:
			Inter,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			sans-serif;
		font-size: 1.5em;
		text-rendering: optimizeLegibility;
	}

	:root {
		--navbar-height: 5rem;
		--border-size: 0.1rem;
		--border-radius: 0rem;
		--info-height: 3.5rem;
	}

	main {
		z-index: 1;
	}

	:global(a) {
		text-decoration: none;
		color: var(--color-text);
	}

	:global(a .active) {
		color: var(--color-active-link);
	}
</style>
