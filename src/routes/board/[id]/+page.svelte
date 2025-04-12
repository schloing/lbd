<script lang="ts">
	import Rankings from '$/components/Rankings.svelte';
	import type { PageServerData } from './$types';
	import { boardStore } from '$/stores/board';
	import { beforeNavigate } from '$app/navigation';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';

	let { data }: { data: PageServerData } = $props();
	const { board, authorized, rankings } = data;
	$boardStore = board;
	let liveRankings = $derived(rankings);

	beforeNavigate(() => {
		$boardStore = null;
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
