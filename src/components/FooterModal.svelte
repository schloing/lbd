<script lang="ts">
	import {
		BrushCleaning,
		Bug,
		Copy,
		Copyright,
		FileDigit,
		Mail,
		MessageSquare,
		Trash
	} from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	const { isOpen, close } = $props();
</script>

{#if isOpen}
	<div class="modal" role="dialog" transition:fade|global={{ duration: 250 }}>
		<a href="https://github.com/schloing/lbd"><FileDigit /> source code</a>
		<a href="https://github.com/schloing/lbd/issues"><Bug /> report a bug</a>
		<a
		href="https://github.com/monkeytypegame/monkeytype/blob/master/frontend/src/ts/constants/themes.ts#L27"
		>themes credit (monkeytype)</a
		>
		<a href="mailto:user.datagram.protocol@proton.me"><Mail /> user.datagram.protocol@proton.me</a>
		<a href="https://discord.gg/N4UPhgWEnD"><MessageSquare /> https://discord.gg/N4UPhgWEnD</a>
		<p><a href="/account"><BrushCleaning /> clean board caches</a> (decreases load speed)</p>
		<a href="/account"><Trash /> perform complete deletion</a>
		<p class="notice">only information you provide when making an account or board, or adding a player to a board is stored</p>
		<p><Copyright /> Leaderbored 2025-present</p>
	</div>
{/if}

<style scoped>
	:root {
		--navbar-padding: 55px;
	}

	div > p,
	div > a {
		width: 100%;
		text-align: left;
		margin: 0;
		padding: 0.3em 0.5em;
		font-size: 1em;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.notice {
		color: var(--bg-color);
		background: var(--caret-color);
		margin: 0.4em 0;
	}

	.modal {
		text-align: left;
	}
</style>
