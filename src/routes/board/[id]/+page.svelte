<script lang="ts">
	import Rankings from "$/components/Rankings.svelte";
	import type { PageServerData } from "./$types";
	import { page } from "$app/state";
	import { type BoardInstruction, BoardOperation } from "$/lib/board";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import { boardStore } from "$/stores/board";
	import { SortedMap } from "$/lib/SortedMap";
	import type { UUID } from "node:crypto";

	const id: string = page.params.id;
	let { data }: { data: PageServerData } = $props();
	let ready = $state<boolean>(true);
	let failed = $state<boolean>(false);

	$boardStore = data.board;

	if ($boardStore) $boardStore.resolvedOwner = data.resolvedOwner;

	onMount(async () => {
		interface KVP {
			key: UUID;
			value: number;
		}

		const map = new SortedMap<UUID, number>((a: KVP, b: KVP) => a.value - b.value);
		let websocket: WebSocket;

		try {
			websocket = new WebSocket(
				import.meta.env.MODE == "development"
					? "ws://localhost:8989"
					: import.meta.env.VITE_WORKER_URL
			);
		} catch (e) {
			failed = true;
			console.error(e);
			return;
		}

		websocket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			console.log(data);
		});

		websocket.onopen = () => (ready = true);

		websocket.onerror = (e) => (failed = true);

		websocket.onclose = () => {
			ready = false;
			websocket.close;
		};
	});
</script>

<div class="children">
	<p>
		<span class:ws-fail={failed} class:ws-success={!failed}>
			{#if failed}
				webSocket connection failed. check
				<a href="/status" aria-label="Check connection status">status</a>.
			{:else}
				websocket success
			{/if}
		</span>
	</p>
	<Rankings rankings={data.rankings} />
</div>

<style scoped>
	.children {
		overflow-y: scroll;
		height: 100%;
		width: 100%;
	}

	.ws-fail {
		color: red;
		display: inline !important;
	}

	.ws-success {
		color: green;
	}
</style>
