<script lang="ts">
	import Rankings from '$/components/Rankings.svelte';
	import type { PageServerData } from './$types';
	import { boardState } from '$/stores/board.svelte';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { source } from 'sveltekit-sse';
	import AddUserModal from './AddUserModal.svelte';
	import { modals, type ModalComponent } from 'svelte-modals';
	import { MessageSquareIcon, SettingsIcon, Trash2Icon, UserPlusIcon } from 'lucide-svelte';

	const short = (str: string, len = 12) => (str?.length > len ? str.slice(0, len) + '...' : str);

	let { data }: { data: PageServerData } = $props();
	const { board, authorized } = data;
	boardState.board = board;
	let liveRankings = $derived(data.rankings);

	const boardUpdatesSse = source(page.url.href);
	const boardUpdates = boardUpdatesSse.select(board.id);

	$effect(() => {
		$boardUpdates;
		// just ask the server for to fetch data again
		// this won't require the user to refresh
		// FIXME: might be slow
		invalidateAll();
	});
</script>

<div class="menu">
	<div class="board-info">
		<a href={`/board/${board.id}`} data-tooltip={`${board.name}`}>{short(board.name)}</a>
		<p>{board.participants} <span class="stealth">participants</span></p>
		<p>{board.points} <span class="stealth">points</span></p>
	</div>

	<div class="board-actions">
		<button class="board-action danger">
			<Trash2Icon />
		</button>

		<button class="board-action">
			<SettingsIcon />
		</button>

		<button
			class="board-action"
			onclick={() => modals.open(AddUserModal as unknown as ModalComponent, { authorized })}
		>
			<UserPlusIcon />
		</button>

		<button class="board-action">
			<MessageSquareIcon />
		</button>
	</div>
</div>

<section class="children">
	<div class="leaderboard">
		<Rankings rankings={liveRankings} />
		<Rankings rankings={liveRankings} />
		<Rankings rankings={liveRankings} />
		<Rankings rankings={liveRankings} />
	</div>

	<div class="chat">
		<p>hello</p>
		<p>hello</p>
		<p>hello</p>
		<p>hello</p>
		<p>hello</p>
		<p>hello</p>
	</div>
</section>

<style scoped>
	.menu {
		width: 100%;
		height: 70px;
		background: var(--sub-alt-color);
		margin-bottom: 0.3em;
		padding: 0.5em 0.6em;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.menu > * {
		display: inline;
	}

	.board-action {
		background: var(--bg-color);
		border: 1px solid var(--sub-color);
		float: right;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0.2em 0.25em;
	}

	.children {
		overflow-y: scroll;
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 8fr 2fr;
		gap: 1em;
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
	}

	.board-info {
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		gap: 2rem;
		border-top: none;
		border-left: none;
		border-radius: var(--border-radius);
	}

	.board-info > *:after {
		--slash-height: calc(var(--info-height) * 0.7);
		--slash-width: 0.15rem;
		--slash-angle: 10deg;

		content: '';
		background: var(--main-color);
		margin-left: 1em;
		position: absolute;
		transform: translate(-0.25em, -0.3em);
		height: var(--slash-height);
		width: var(--slash-width);
		rotate: var(--slash-angle);
	}

	.board-info > *:nth-last-child(1):after {
		content: none;
	}
</style>
