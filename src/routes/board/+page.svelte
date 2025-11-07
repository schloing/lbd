<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';

	let { form, data }: { form: ActionData; data: PageServerData } = $props();

	const boards = $derived(data.boards);

	// todo: +page.server.ts has this as well
	interface FormError {
		name: string;
		error: string;
	}

	let errors: FormError[] | undefined = $state();
</script>

{#if boards.length <= 0}
	<form
		method="POST"
		action="?/createBoard"
		use:enhance={({ cancel }) => {
			return async ({ result, update }) => {
				if (result.type === 'failure') {
					const data = result.data;

					if (!data) {
						alert('unknown error...');
						return;
					}

					errors = JSON.parse(data.message as string);

					await update({ reset: false });
				} else {
					invalidateAll();
				}
			};
		}}
	>
		<h1>create board</h1>

		{#if errors}
			<span class="error">
				{errors.filter((value) => value.name == 'boardName')[0].error}
			</span>
		{/if}
		<div>
			<label for="boardName">board name</label>
			<input type="text" name="boardName" placeholder="top gooners..." />
		</div>

		{#if errors}
			<span class="error">
				{errors.filter((value) => value.name == 'maxParticipants')[0].error}
			</span>
		{/if}
		<div>
			<label for="maxParticipants">max participants</label>
			<input type="number" name="maxParticipants" placeholder="10..." />
		</div>
		<div>
			<label for="access">access</label>
			<select name="access">
				<option value="public">public</option>
				<option value="private">private</option>
			</select>
		</div>

		<div>
			<label for="allowAnonymous">allow anonymous users</label>
			<input type="checkbox" name="allowAnonymous" />
		</div>

		<button type="submit">create</button>
	</form>
{:else}
	<BoardGallery {boards} />
{/if}

<style scoped>
	.error {
		color: red;
		font-size: 1rem;
	}
</style>
