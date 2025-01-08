<script lang="ts">
	import Rankings from '$/components/Rankings.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	import { type BoardInstruction, BoardOperation } from '$/lib/board';
	import { onMount } from 'svelte';
	import { boardStore } from '$/stores/board';

	const id: string = page.params.id;
	let { data }: { data: PageServerData } = $props();
	let ready = $state<boolean>(false);

	$boardStore = data.board;
	$boardStore.resolvedOwner = data.resolvedOwner;

	onMount(async () => {
		try {
			const websocket = new WebSocket(
				import.meta.env.MODE == 'development'
					? 'ws://localhost:8989'
					: import.meta.env.VITE_WORKER_URL
			);

			websocket.addEventListener('message', (event) => {
				const data = JSON.parse(event.data);
				console.log(data);
			});

			websocket.onopen = () => websocket.send(JSON.stringify({ message: 'hello world' }));
			websocket.onclose = () => websocket.close;
		} catch (e) {
			console.error(e);
		}
	});
</script>

<div class="children">
	<Rankings rankings={data.rankings} />
</div>

<style scoped>
	.children {
		overflow-y: scroll;
		height: 100%;
		width: 100%;
	}
</style>
