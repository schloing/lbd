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
			id: session.user.id,
			username: session.user.name ?? session.user.username ?? 'anonymous'
		};
	else
		$userStore = null;
</script>

<Navbar />
<div class="layout">
	<main>
		{@render children()}
	</main>
</div>
<Footer />

<style scoped>
	:root {
		--top-offset: calc(var(--navbar-height) + 25px);
	}

	.layout {
		display: flex;
		flex-direction: column;
		padding-top: var(--top-offset);
		/* min-height: calc(100dvh - var(--top-offset)); */
		height: 100dvh;
		width: 100%;
		position: relative;
	}

	main {
		z-index: 1;
		height: 100%;
		width: 70%;
		max-height: 100%;
		overflow-y: scroll;
		margin: 0 auto;
	}
</style>
