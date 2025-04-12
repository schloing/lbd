<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';

	let { form, data }: { form: ActionData; data: PageServerData } = $props();
	const boards = $derived(data.boards);
</script>

<form
	method="POST"
	action="?/createBoard"
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
	<h1>create board</h1>
	<div>
		<label for="boardName">board name</label>
		<input type="text" name="boardName" placeholder="name" />
	</div>
	<label>
		private? <span class="stealth">(invite-only)</span>
		<input type="checkbox" name="isPrivate" />
	</label>
	<button>create</button>
</form>

<BoardGallery {boards} />
