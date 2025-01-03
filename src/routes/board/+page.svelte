<script lang="ts">
	import { userStore } from '$/stores/user';
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	const user = $userStore;
	let { form, data }: { form: ActionData; data: PageServerData } = $props();
	const boards = data.boards;
</script>

<div class="boardList">
	<form method="post" action="?/createBoard" use:enhance>
		<label>
			board name
			<input name="boardName" placeholder="name"/>
		</label>
		<label>
			private?
			<input name="isPrivate" type="checkbox" />
		</label>
		<button>create</button>
		<p style="color: red; display: none">{form?.message ?? ''}</p>
	</form>
	{#each boards as board}
		<div class="boardListItem">
			<p><a href="/board/{board.id}">{board.name}</a></p>
			<p>{board.participants}</p>
			<p>{board.points}</p>
			<p class="stealth">id {board.id}</p>
			<p class="stealth">created {board.createdAt}</p>
			<p class="stealth">updated {board.updatedAt}</p>
		</div>
	{/each}
</div>

<style scoped>
	form {
		width: 20em;
		min-height: 4em;
		padding: 0.5em 1em;
		border: var(--border-size) solid var(--color-text);
		display: flex;
		flex-direction: column;
	}

	.boardListItem > * {
		margin: 0;
		line-height: 1;
	}

	.boardList {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		gap: 1em;
	}

	.boardListItem {
		width: 20em;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-auto-columns: 1fr;
		grid-template-areas:
			'. . .'
			'. . .';
		align-items: center;
		padding: 0 1em;
		min-height: 4em;
		border: var(--border-size) solid var(--color-text);
	}

	.stealth {
		color: var(--color-fine-text);
		font-size: 0.45em;
	}

	.menu {
		background: #d3d3d3;
	}
</style>
