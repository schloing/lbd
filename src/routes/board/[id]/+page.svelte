<script lang="ts">
	import Rankings from './Rankings.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	import BoardMenu from './BoardMenu.svelte';
	import type { Instruction } from '$/lib/client/board';
	import Chat from './Chat.svelte';

	const { data }: { data: PageServerData } = $props();
	const { board, authorized, rankings } = $derived(data);

	// new state for chat visibility
	let showChat = $state(false);
	let messages: Instruction[] = $state([]); // TODO: cache last 10 chat messages for each board

	function onMessage(msg: Instruction) {
		messages.push(msg);
	}
</script>

<svelte:head>
	{#if board}
		<title>{board.name}</title>
		<meta property="og:title" content={'Leaderbored - ' + board.name} />
		<meta property="og:description" content={'Rankings for ' + board.name} />
		<meta property="og:type" content="website" />
		<meta property="og:url" content={page.url.toString()} />
		<meta property="og:image" content="https://leaderbored.online/leaderbored.png" />
	{/if}
</svelte:head>

<BoardMenu {board} {authorized} bind:showChat={showChat} />

<section class="children">
	<div class="leaderboard" class:full-width={!showChat}>
		<Rankings {board} {rankings} {authorized} {onMessage} />
	</div>

	<div class="chat" class:collapsed={!showChat}>
		<Chat bind:messages={messages} />
	</div>
</section>

<style scoped>
	.children {
		overflow-y: scroll;
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 8fr 2fr;
		gap: 1em;
		transition: grid-template-columns 0.3s ease;
	}

	.children .leaderboard.full-width {
		grid-column: span 2;
	}

	.leaderboard {
		max-height: 400px;
		overflow: auto;
	}

	.chat {
		text-align: left;
		background: var(--bg-color);
		padding: 0.5em;
		max-height: 400px;
		overflow: auto;
		transition:
			max-height 0.3s ease,
			padding 0.3s ease;
	}

	.chat.collapsed {
		max-height: 0;
		padding: 0;
		overflow: hidden;
	}

	@media (max-width: 600px) {
		.children {
			grid-template-columns: 1fr; /* Stack everything */
		}
	}
</style>
