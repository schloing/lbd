<script lang="ts">
	import type { Context } from 'svelte-simple-modal';
	import { getContext, type Component, type Snippet } from 'svelte';

	const {
		modal,
		modalProps,
		onclick = () => {},
		children
	}: {
		modal: Component<any>;
		modalProps?: Record<string, any>;
		onclick?: () => any;
		children?: Snippet;
	} = $props();

	const { open } = getContext<Context>('simple-modal');

	const showModal = () => {
		onclick();
		open(modal, modalProps);
	};
</script>

<button onclick={showModal}>
	{#if children}
		{@render children()}
	{/if}
</button>
