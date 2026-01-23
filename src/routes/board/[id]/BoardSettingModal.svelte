<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const { isOpen, close, authorized, board } = $props();

	if (authorized === false) {
		// just testing, this not the best way mate
		close();
	}

	let error = $state('');
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<form
			method="POST"
			action="?/updateBoard"
			use:enhance={({ cancel }) => {
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						const data = result.data;
						error = (data?.message as string) ?? '';
						await update({ reset: false });
					} else {
						close();
						invalidateAll();
					}
				};
			}}
		>
			<h2>board settings</h2>
			<p class="error">{error}</p>

			<div>
				<label for="name">name</label>
				<input type="text" name="name" placeholder="jimbo" autocomplete="off" value={board.name} />
			</div>

			<div>
				<label for="access">access</label>

				<select name="access">
					<option value="public">public</option>
					<option value="private">private</option>
				</select>
			</div>

			<div>
				<p>{board.participants} participants</p>
				<p>{board.points} points in rotation</p>
			</div>

			<button type="submit">update</button>
		</form>
	</div>
{/if}

<style scoped>
	input[type='text'] {
		display: inline-block;
	}

	form > button {
		width: 40%;
	}
</style>
