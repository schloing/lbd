<script lang="ts">
	import Rankings from '$/components/Rankings.svelte';
	import type { PageServerData } from './$types';
	import { boardStore } from '$/stores/board';
	import { beforeNavigate } from '$app/navigation';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { source } from 'sveltekit-sse';

	let { data }: { data: PageServerData } = $props();
	const { board, authorized } = data;
	$boardStore = board;
	let liveRankings = $derived(data.rankings);

	const boardUpdatesSse = source(page.url.href);
	const boardUpdates = boardUpdatesSse.select(board.id);

	beforeNavigate((navigation) => {
		// despawn board display on navbar
		// when u click on any link that goes outside current route
		if (navigation.to?.route.id !== page.route.id) {
			boardUpdatesSse.close();
			$boardStore = null;
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

{#if authorized}
	<form
		method="POST"
		action="?/addUser"
		class="vertical-form"
		use:enhance={({ cancel }) => {
			return async ({ result, update }) => {
				if (result.type === 'failure') {
					const data = result.data;
					alert(data?.message);
					await update({ reset: false });
				} else {
					invalidateAll();
				}
			};
		}}
	>
		<h1>add user</h1>
		<div>
			<label for="username">username</label>
			<input type="text" name="username" placeholder="name" />
		</div>
		<div>
			<label for="score">score</label>
			<input type="number" name="score" placeholder="score" />
		</div>
		<button>create</button>
	</form>
{/if}

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
