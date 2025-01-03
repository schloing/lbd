<script lang="ts">
	import BoardInfo from '$/components/BoardInfo.svelte';
	import Rankings from '$/components/Rankings.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	const id: string = page.params.id;
	let { data }: { data: PageServerData } = $props();
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
