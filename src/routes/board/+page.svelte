<script lang="ts">
	import { userStore } from '$/stores/user';
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { form, data }: { form: ActionData; data: PageServerData } = $props();
	const boards = data.boards;
</script>

<form method="post" action="?/createBoard" class="vertical-form" use:enhance>
	<h1>create board</h1>
	<div>
		<label for="boardName">board name</label>
		<input type="text" name="boardName" placeholder="name" />
	</div>
	<label>
		private? <span class="stealth">(only accounts can participate)</span>
		<input type="checkbox" name="isPrivate" />
	</label>
	<button>create</button>
	<p style="color: red">{form?.message ?? ''}</p>
</form>