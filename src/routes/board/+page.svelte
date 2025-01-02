<script lang="ts">
	import { userStore } from '$/stores/user';
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	const user = $userStore;
	let { form, data }: { form: ActionData; data: PageServerData } = $props();
	const boards = data.boards;
	console.log(boards[0]);
</script>

<section class="center-children">
	<!-- 
		<form method="post" action="?/createBoard" use:enhance>
		<label>
			name
			<input name="boardName" />
		</label>
		<label>
			private?
			<input name="isPrivate" type="checkbox" />
		</label>
		<button>create</button>
		<p style="color: red; display: none">{form?.message ?? ''}</p>
	</form>
	-->
	<div class="boardList">
		{#if !boards || boards.length <= 0}
			<div class="boardListItem">
				<p>create a board</p>
				<p>for something to show</p>
				<p>in these</p>
				<p class="stealth">boxes</p>
				<p class="stealth">you fucking</p>
				<p class="stealth">window licker</p>
			</div>
		{:else}
			{#each boards as board}
				<div class="boardListItem">
					<p><a href="/board/{board.id}">{board.name}</a></p>
					<p>{board.participants}</p>
					<p>{board.points}</p>
					<p class="stealth">{board.id}</p>
					<p class="stealth">{board.createdAt}</p>
					<p class="stealth">{board.updatedAt}</p>
					<div class="menu">
						<div class="plus"></div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style scoped>
	.boardList {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		gap: 1em;
		margin-top: 2.5em;
	}

	.boardListItem {
		width: 15em;
		display: grid;
		display: grid;
		grid-template-columns: 1.6fr 0.7fr 0.7fr;
		grid-template-rows: 0.2fr 2.6fr 0.2fr;
		grid-auto-columns: 1fr;
		grid-auto-flow: row;
		grid-template-areas:
			'menu menu menu'
			'. . .'
			'. . .';
		padding: 0 1em;
		border: var(--border-size) solid var(--color-text);
	}

	.menu {
		grid-area: menu;
		padding-top: 0.5em;
	}

	.plus {
		background: red;
		width: 1em;
		height: 1em;
		top: 0;
		left: 0;
	}
</style>
