<script lang="ts">
	import Rankings from '$/components/Rankings.svelte';
	import type { PageServerData } from './$types';
	import { boardState } from '$/stores/board.svelte';
	import AddUserModal from './AddUserModal.svelte';
	import { modals, type ModalComponent } from 'svelte-modals';
	import { MessageSquareIcon, SettingsIcon, Trash2Icon, UserPlusIcon } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { SortedMap } from '$/lib/client/SortedMap';
	import type { RankUser } from '$/lib/client/rankuser';
	import { BoardOperation, type Instruction } from '$/lib/client/board';

	const short = (str: string, len = 12) => (str?.length > len ? str.slice(0, len) + '...' : str);

	let { data }: { data: PageServerData } = $props();
	const { board, authorized, rankings } = $derived(data);

	$effect(() => {
		boardState.board = board;
	});

	let map = $state(
		new SortedMap<RankUser, number>((a, b) => {
			return b.value - a.value;
		})
	);

	rankings.forEach((ranking) => {
		if (map) {
			map.set(ranking, ranking.score);
		}
	});

	let version = $state(0);
	let messages: Instruction[] = $state([]);

	onMount(() => {
		const es = new EventSource(`${page.url}/sse`);

		es.onmessage = (e) => {
			messages = [...messages, JSON.parse(e.data)];

			const m = JSON.parse(e.data) as Instruction;

			if (m) {
				switch (m.operation) {
					case BoardOperation.AddPlayer:
					// fall through
					case BoardOperation.UpdatePlayer:
						update(m.user, m.user.score);
						break;
				}
			}
		};

		onDestroy(() => {
			es.close();
		});
	});

	function update(user: RankUser, score: number) {
		map.set(user, score);
		version++; // whatdafuk
	}
</script>

<svelte:head>
	{#if board}
		<title>{board.name}</title>
	{/if}
</svelte:head>

<div class="menu">
	<div class="board-info">
		<a href={`/board/${board.id}`} data-tooltip={`${board.name}`}>{short(board.name)}</a>
		<p>{board.participants} <span class="stealth">participants</span></p>
		<p>{board.points} <span class="stealth">points</span></p>
	</div>

	<div class="board-actions">
		{#if authorized}
			<button class="board-action danger">
				<Trash2Icon />
			</button>
		{/if}

		<button class="board-action">
			<SettingsIcon />
		</button>

		{#if authorized}
			<button
				class="board-action"
				onclick={() => modals.open(AddUserModal as unknown as ModalComponent, { authorized })}
			>
				<UserPlusIcon />
			</button>
		{/if}

		<button class="board-action">
			<MessageSquareIcon />
		</button>
	</div>
</div>

<section class="children">
	<div class="leaderboard">
		{#key version}
			<Rankings rankings={map} {authorized} />
		{/key}
	</div>

	<div class="chat">
		{#each messages as message}
			<p>{message.operation} {message.user.uuid}</p>
		{/each}
	</div>
</section>

<style scoped>
	.menu {
		width: 100%;
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

	@media (max-width: 600px) {
		.children {
			grid-template-columns: 1fr; /* Stack everything */
		}
	}
</style>
