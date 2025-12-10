<script lang="ts">
	import { Modals } from 'svelte-modals';
	import Navbar from '$/components/Navbar.svelte';
	import Footer from '$/components/Footer.svelte';
	import { fade } from 'svelte/transition';
	import '$/global.css';
	let { data, children } = $props();
	const { user } = $derived(data);
</script>

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
<Footer />

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
