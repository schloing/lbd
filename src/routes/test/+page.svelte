<script lang="ts">
	import { SortedMap } from '$/lib/SortedMap';
	import { onMount } from 'svelte';
	import { type Instruction, BoardOperation, BoardMessageType } from '$/lib/board';

	// "great board" by @jackthefapper
	const boardId = '0d977bcb-0d5c-4025-9de5-82f25a052ce2';
	// old api uuid for @jackthefapper
	const id = '4tf7bijnsboblz4ao74r74ti';

	interface KVP {
		key: string;
		value: number;
	}

	let sorted: SortedMap<string, number> = new SortedMap<string, number>((a: KVP, b: KVP) => {
		// SortedArray checks comparator to check unique instead of comparing the object directly

		// duplicate key
		if (a.key == b.key) return 0;

		// duplicate value
		if (a.value == b.value) return a.key.localeCompare(b.key);

		// nothing
		return a.value - b.value;
	});

	let websocket: WebSocket;
	let mapchange: number = 0;

	function handleInstruction(instruction: Instruction) {
		switch (instruction.operation) {
			case BoardOperation.AddPlayer:
				sorted.set(instruction.uponUser as string, instruction.initial);
				break;

			case BoardOperation.RemovePlayer:
				break;

			case BoardOperation.UpdateScore:
				break;

			case BoardOperation.ResetBoard:
				break;
		}

		mapchange++;
	}

	function handleMessage(event: MessageEvent) {
		const message = JSON.parse(event.data) as Instruction;

		switch (message.type) {
			case BoardMessageType.BoardInstruction:
				handleInstruction(message);
				break;
		}
	}

	function shit() {
		if (!websocket) return;
		websocket.send(
			JSON.stringify({
				type: 'BoardInstruction',
				operation: BoardOperation.AddPlayer,
				board: boardId,
				user: self.crypto.randomUUID(),
				uponUser: self.crypto.randomUUID(),
				initial: Math.floor(Math.random() * 1000)
			} as unknown as Instruction)
		);
	}

	onMount(() => {
		websocket = new WebSocket(
			import.meta.env.MODE == 'development'
				? 'ws://localhost:8989'
				: import.meta.env.VITE_WORKER_URL
		);

		websocket.addEventListener('message', (event) => {
			handleMessage(event);
		});

		websocket.onopen = () => {
			websocket.send(
				JSON.stringify({
					type: 'ConnectionInit',
					operation: null,
					board: boardId,
					user: id,
					uponUser: null,
					initial: null
				} as unknown as Instruction)
			);
		};

		websocket.onclose = (ev) => {
			console.log(ev);
			websocket.close();
		};

		// const amt = 10000;
		// for (let i = 1; i < amt; i++) sorted.set(self.crypto.randomUUID(), i);
		// mapchange = 1;
	});
</script>

<button onclick={shit}>add / update user {id}</button>

<ul>
	{#if sorted}
		{#key mapchange}
			{#each sorted as entry, i}
				<li>{i + 1}: {entry[0]}: {entry[1]}</li>
			{/each}
		{/key}
	{/if}
</ul>
