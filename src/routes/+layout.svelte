<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import type { LayoutServerData } from './$types';
	import type { Snippet } from 'svelte';
	import { userStore } from '$/stores/user';
	import Footer from '$/components/Footer.svelte';
	import '$/global.css';

	let { data, children }: { data: LayoutServerData; children: Snippet } = $props();
	const { session } = data;

	if (session?.user)
		$userStore = {
			id: session.user.id as string,
			username: session.user.name ?? 'anonymous'
		};
	else $userStore = null;
</script>

<Navbar />
<div class="layout">
	<main>
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
		background: var(--sub-alt-color);
		margin: 0 auto;
	}
</style>
