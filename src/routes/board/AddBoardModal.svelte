<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';

	// todo: +page.server.ts has this as well
	interface FormError {
		name: string;
		error: string;
	}

	const { isOpen, close, user } = $props();

	let errors: FormError[] | undefined = $state();

	if (!user) {
		close();
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal" transition:fade|global={{ duration: 250 }}>
		<form
			method="POST"
			action="?/createBoard"
			use:enhance={({ cancel }) => {
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						const data = result.data;
						errors = JSON.parse(data?.message as string);
						await update({ reset: false });
					} else {
						close();
						invalidateAll();
					}
				};
			}}
		>
			<h2>create board</h2>

			{#if errors}
				<p class="error">{errors.filter((value) => value.name == 'boardName')[0].error}</p>
			{/if}

			<div>
				<label for="boardName">board name</label>
				<input type="text" name="boardName" placeholder="top gooners..." autocomplete="off" />
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
	</div>
{/if}

<style scoped>
	input[type='text'],
	input[type='number'] {
		display: inline-block;
	}

	form > button {
		width: 40%;
	}
</style>
