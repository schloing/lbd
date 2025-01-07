<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
	const boards = data.boards;
</script>

<div class="wrapper">
	<div class="user">
		<img src="https://placehold.co/200" alt="profile" class="pfp" />
		<p>{data.user.display}</p>
		<p class="stealth">@{data.user.username}</p>
		<p class="stealth">id {data.user.id}</p>
		<p class="stealth">created {data.user.createdAt}</p>
		<p class="stealth">updated {data.user.updatedAt}</p>
		<form method="post" use:enhance>
			<button formaction="?/logout">logout</button>
			<button formaction="?/rename">rename</button>
			<button class="hella-red" formaction="?/delete">delete</button>
		</form>
	</div>

	<div class="boards">
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
</div>

<style scoped>
	.pfp {
		border-radius: 50%;
	}

	.board {
		background: var(--sub-alt-color);
		border-radius: 7px;
		margin: auto 0;
		padding: 1em;
	}

	.wrapper {
		height: 100%;
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		gap: 2em;
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.user,
	.boards {
		text-align: center;
	}

	.boards {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5em;
		overflow-y: scroll;
	}

	.hella-red {
		color: white;
		background: red;
	}

	.hella-red:hover {
		background: darkred;
	}
</style>
