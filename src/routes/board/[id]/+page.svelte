<script lang="ts">
	import BoardInfo from '$/components/BoardInfo.svelte';
	import Rankings from '$/components/Rankings.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	import { type BoardInstruction, BoardOperation } from '$/lib/board';
	import { onMount } from 'svelte';

	const id: string = page.params.id;
	let { data }: { data: PageServerData } = $props();
	let ready = $state<boolean>(false);

	onMount(async () => {
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
	});
</script>

<section class="boardInfo">
	<BoardInfo board={data.board} resolvedOwner={data.resolvedOwner} />
	<div class="children">
		<Rankings rankings={data.rankings} />
	</div>
</section>

<style scoped>
	.boardInfo {
		display: grid;
		grid-template-rows: 1fr 9fr;
		height: 100%;
		width: 100%;
	}

	.children {
		overflow-y: scroll;
	}
</style>
