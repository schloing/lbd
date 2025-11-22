<script lang="ts">
	import Navbar from '$/components/Navbar.svelte';
	import Footer from '$/components/Footer.svelte';
	import '$/global.css';

	let { data, children } = $props();
	const { user } = $derived(data);
</script>

<Navbar {user} />
<div class="layout">
	<main class="dark-box">
		{@render children()}
	</main>
</div>
<Footer />

<style scoped>
	.layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;
	}

	main {
		height: 100%;
		width: 70%;
		border-radius: 0.25em;
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
