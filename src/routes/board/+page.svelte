<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { form, data }: { form: ActionData; data: PageServerData } = $props();
	const boards = $derived(data.boards);
</script>

<form method="POST" action="?/createBoard" class="vertical-form" use:enhance>
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

<div>
	{#each boards as board}
		<div class="board">
			<p><a href="/board/{board.id}" class="primary">{board.name}</a></p>
			<p class="darkstealth">participants {board.participants}</p>
			<p class="darkstealth">points {board.points}</p>
			<p class="stealth">id {board.id}</p>
			<p class="stealth">created {board.createdAt}</p>
			<p class="stealth">updated {board.updatedAt}</p>
		</div>
	{/each}
</div>
