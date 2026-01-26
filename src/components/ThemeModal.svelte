<script lang="ts">
	import { themes } from '$/lib/client/themes';
	import { themeStore } from '$/stores/theme';
	import { fade } from 'svelte/transition';

	const { isOpen, close } = $props();

	let baselineTheme: string = $themeStore;

	function testTheme(file: string) {
		themeStore.set(file);
	}

	function applyTheme(file: string) {
		themeStore.set(file);
		baselineTheme = file;
		close();
	}

	function revertTheme() {
		themeStore.set(baselineTheme);
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal" transition:fade|global={{ duration: 250 }}>
		{#each themes as theme}
			<button
				onclick={() => applyTheme(theme.file)}
				onmouseover={() => testTheme(theme.file)}
				onmouseout={revertTheme}
				onfocus={() => testTheme(theme.file)}
				onblur={revertTheme}
				class="link-like">
				{theme.name}
			</button>
		{/each}
	</div>
{/if}

<style scoped>
	button {
		width: 100%;
		text-align: left;
		margin: 0;
		padding: 0.5em 0.5em;
		font-size: 1em;
	}

	button:hover {
		color: var(--bg-color);
		background: var(--text-color);
	}

	div {
		display: flex;
		flex-direction: column;
		max-height: 500px;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>