<script lang="ts">
	import { userStore } from '$/stores/user';
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { form, data }: { form: ActionData; data: PageServerData } = $props();
	const boards = data.boards;
</script>

<form method="post" action="?/createBoard" use:enhance>
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

<style scoped>
	form {
		height: 200px;
		width: 350px;
		padding: 1em;
		display: flex;
		flex-direction: column;
		border: var(--border-size) solid var(--color-text);
		justify-content: space-evenly;
	}
</style>
