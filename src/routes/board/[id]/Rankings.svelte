<script lang="ts">
	import { SortedMap } from '$/lib/client/SortedMap';
	import { type RankUser, type ScoreUser } from '$/lib/client/RankUser';
	import { BoardOperation, type Instruction } from '$/lib/client/board';
	import { onMount } from 'svelte';
	import { io, type Socket } from 'socket.io-client';
	import Rank from './Rank.svelte';

	let {
		rankings,
		board,
		authorized,
		onMessage
	}: {
		rankings: ScoreUser[];
		board: any;
		authorized: boolean;
		onMessage: (msg: Instruction) => void;
	} = $props();

	function rankUserEquals(a: RankUser, b: RankUser) {
		if (a.uuid && b.uuid) return a.uuid === b.uuid && a.board === b.board;
		return a.name === b.name && a.board === b.board;
	}

	let version = $state(0);
	let map = $state(new SortedMap<RankUser, number>((a, b) => b.value - a.value, rankUserEquals)); // TODO: the sortedmap should be cached when large enough
	let socket: Socket | null = null;

	// FIXME: implement optimistic update rollback if server fails

	function onIncrement(user: ScoreUser, amt: number) {
		if (!socket?.connected) {
			return;
		}

		map.set(user.user, amt);
		version++;
		user.score = amt;

		socket.emit('message', {
			operation: BoardOperation.UpdatePlayer,
			user
		} as Instruction);
	}

	function onRemove(user: ScoreUser) {
		if (!socket?.connected) {
			return;
		}

		map.delete(user.user);
		version++;

		socket.emit('message', {
			operation: BoardOperation.RemovePlayer,
			user
		} as Instruction);
	}

	onMount(() => {
		for (const r of rankings as ScoreUser[]) {
			map.set(r.user, r.score);
		}

		version++;

		socket = io({
			path: '/socket.io',
			query: { id: board.id }
		});

		socket.on('message', (msg) => {
			let m: Instruction | null = null;

			if (typeof msg === 'string') {
				try {
					m = JSON.parse(msg);
				} catch {
					return;
				}
			}

			if (msg && msg.type === 'message' && msg.data) {
				m = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
			}

			if (!m) {
				return;
			}

			onMessage(m);
			const { user, score } = m.user;

			switch (m.operation) {
				case BoardOperation.AddPlayer:
				case BoardOperation.UpdatePlayer:
					if (map.get(user) == score) {
						map.set(user, score);
						version++;
					}
					break;
				case BoardOperation.RemovePlayer:
					if (map.get(user)) {
						map.delete(user);
						version++;
					}
					break;
			}
		});

		return () => {
			socket?.disconnect();
		};
	});
</script>

<div>
	<!-- TODO: add alternative -->
	{#if rankings.length > 0}
		{#key version}
			{#each map as [rankUser, score], idx}
				<Rank scoreUser={{ user: rankUser, score }} {idx} {authorized} {onIncrement} {onRemove} />
			{/each}
		{/key}
	{/if}
</div>

<style scoped>
	div {
		height: fit-content;
		padding: 0.5em 0;
	}
</style>
