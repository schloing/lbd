<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';

	const { close } = getContext<Context>('simple-modal');
	const { authorized } = $props();

	if (authorized === false) {
		// just testing, this not the best way mate
		close();
	}

	let linkedToAccount = $state(false);
	let error = $state("");
</script>

<form
	method="POST"
	action="?/addUser"
	use:enhance={({ cancel }) => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				const data = result.data;
				error = data?.message as string ?? "";
				await update({ reset: false });
			} else {
				close();
				invalidateAll();
			}
		};
	}}
>
	<h2>add user</h2>
	<p class="error">{error}</p>

	<div>
		<label for="name">name</label>
		<input type="text" name="name" placeholder="jimbo" autocomplete="off" />
	</div>

	<div>
		<label for="score">starting score</label>
		<input type="number" name="score" placeholder="14" value={0} />
	</div>

	<div>
		<label for="accountAssociated">linked to lbd account?</label>
		<input name="accountAssociated" type="checkbox" bind:checked={linkedToAccount} />
	</div>

	<div>
		{#if linkedToAccount}
			<span>@</span>
			<input type="text" name="username" placeholder="XXJIMBOXX" />
		{/if}
	</div>
	
	<button type="submit">create</button>
</form>

<style scoped>
	input[type='text'],
	input[type='number'] {
		display: inline-block;
	}

	form > button {
		width: 40%;
	}
</style>
