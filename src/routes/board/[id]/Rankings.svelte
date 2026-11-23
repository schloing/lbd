<script lang="ts">
	import { SortedMap } from '$/lib/client/SortedMap';
	import { type RankUser, type ScoreUser } from '$/lib/client/RankUser';
	import { BoardOperation, type Instruction } from '$/lib/client/board';
	import { onMount } from 'svelte';
	import Rank from './Rank.svelte';

	let {
		rankings,
		board,
		authorized,
		viewingUser,
		onMessage
	}: {
		rankings: ScoreUser[];
		board: any;
		authorized: boolean;
		viewingUser?: any;
		onMessage: (msg: Instruction) => void;
	} = $props();

	function rankUserEquals(a: RankUser, b: RankUser) {
		if (a.uuid && b.uuid) return a.uuid === b.uuid && a.board === b.board;
		return a.name === b.name && a.board === b.board;
	}

	let version = $state(0);
	let map = new SortedMap<RankUser, number>((a, b) => b.value - a.value, rankUserEquals); // TODO: the sortedmap should be cached when large enough
	let eventSource: EventSource | null = null;
	let connected = false;
	let messages: Instruction[] = [];
	let messageEmitTimeout_ms = 1500;
	let messageEmitTimeout: ReturnType<typeof setTimeout> | null = null;

	async function emitMessages() {
		if (!connected || messages.length === 0) {
			return;
		}

		const pendingMessages = messages;
		messages = [];

		for (const message of pendingMessages) {
			await fetch(`/realtime/${board.id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(message)
			});
		}
	}

	messageEmitTimeout = setTimeout(emitMessages, messageEmitTimeout_ms);

	function queueMessageForEmission(ins: Instruction) {
		messages.push(ins);
		if (messageEmitTimeout) {
			clearTimeout(messageEmitTimeout);
		}
		messageEmitTimeout = setTimeout(emitMessages, messageEmitTimeout_ms);
	}

	// FIXME: implement optimistic update rollback if server fails

	function onIncrement(user: ScoreUser, amt: number) {
		map.set(user.user, amt);
		version++;
		user.score = amt;

		queueMessageForEmission({
			operation: BoardOperation.UpdatePlayer,
			user
		} as Instruction);
	}

	function onRemove(user: ScoreUser) {
		map.delete(user.user);
		version++;

		queueMessageForEmission({
			operation: BoardOperation.RemovePlayer,
			user
		} as Instruction);
	}

	onMount(() => {
		for (const r of rankings as ScoreUser[]) {
			map.set(r.user, r.score);
		}

		version++;

		eventSource = new EventSource(`/realtime/${board.id}`, {
			withCredentials: true
		});

		eventSource.onopen = () => {
			connected = true;
			emitMessages();
		};

		eventSource.onmessage = (event) => {
			let message: { type?: string; event?: string; data?: Instruction } | null = null;

			try {
				message = JSON.parse(event.data);
			} catch {
				return;
			}

			if (
				message?.type === 'connected' ||
				message?.type === 'ping' ||
				message?.type === 'reconnect'
			) {
				return;
			}

			const m = message?.event === 'board.update' ? message.data : null;
			if (!m) {
				return;
			}

			onMessage(m);
			const { user, score } = m.user;
			if (viewingUser?.id == user.uuid) {
				return;
			}

			switch (m.operation) {
				case BoardOperation.AddPlayer:
					map.set(user, score);
					version++;
					break;
				case BoardOperation.UpdatePlayer:
					if (map.get(user)) {
						map.set(user, score);
						version++;
					}
					break;
				case BoardOperation.RemovePlayer:
					map.delete(user);
					version++;
					break;
			}
		};

		return () => {
			if (messageEmitTimeout) {
				clearTimeout(messageEmitTimeout);
			}
			eventSource?.close();
		};
	});
</script>

<div>
	<!-- TODO: add alternative -->
	{#if rankings.length > 0}
		{#key version}
			{#each map.map as [rankUser, position], idx}
				<Rank
					scoreUser={{ user: rankUser, score: position.value }}
					{idx}
					{authorized}
					{onIncrement}
					{onRemove}
				/>
			{/each}
		{/key}
	{/if}
</div>

<style scoped>
	div {
		height: 70vh;
		width: 100%;
		padding: 0.5em 0;
		display: flex;
		flex-direction: column;
	}
</style>
