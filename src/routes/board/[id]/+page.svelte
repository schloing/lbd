<script lang="ts">
	import Rankings from '$/components/Rankings.svelte';
	import Modal from 'svelte-simple-modal';
	import type { PageServerData } from './$types';
	import { boardState } from '$/stores/board.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { source } from 'sveltekit-sse';
	import ModalButton from '$/components/ModalButton.svelte';
	import AddUserModal from '$/routes/board/[id]/AddUserModal.svelte';

	let { data }: { data: PageServerData } = $props();
	const { board, authorized } = data;
	boardState.board = board;
	let liveRankings = $derived(data.rankings);

	const boardUpdatesSse = source(page.url.href);
	const boardUpdates = boardUpdatesSse.select(board.id);

	beforeNavigate((navigation) => {
		// despawn board display on navbar
		// when u click on any link that goes outside current route
		if (navigation.to?.route.id !== page.route.id) {
			boardUpdatesSse.close();
			boardState.board = null;
		}
	});

	$effect(() => {
		$boardUpdates;
		// just ask the server for to fetch data again
		// this won't require the user to refresh
		// FIXME: might be slow
		invalidateAll();
	});

	$effect(() => {
		liveRankings;
		console.log('rankings juyst changed!');
	});
</script>

<Modal classWindow="dark-box">
	<ModalButton modal={AddUserModal} modalProps={{ authorized }}>add user</ModalButton>
</Modal>

<div class="children">
	<Rankings rankings={liveRankings} />
</div>

<style scoped>
	.children {
		overflow-y: scroll;
		height: 100%;
		width: 100%;
	}
</style>
