<script lang="ts">
	import { prisma } from "$/prisma";
	import { enhance } from "$app/forms";
	import { redirect } from "@sveltejs/kit";
	import { format, formatDistanceToNow } from "date-fns";
	let { data } = $props();
	const user = data?.session?.user;
	const boards = data?.boards;
	console.log(boards);
	if (!user) redirect(302, "/account/login");

	function formatDate(date: Date): string {
		return `${format(date, 'yyyy-MM-dd')} (${formatDistanceToNow(date, { addSuffix: true })})`;
	}
</script>

<div class="wrapper">
	<div class="user">
		<img src="https://api.cors.lol/?url={user.image ?? "https://i.pravatar.cc/300"}" alt="user avatar" class="pfp" />
		<p>{user.name}</p>
		<p class="stealth">@{user.id}</p>
		<p class="stealth">email {user.email}</p>
		<p class="stealth">created {formatDate(user.createdAt)}</p>
		<p class="stealth">updated {formatDate(user.updatedAt)}</p>
		<form method="post" use:enhance>
			<button formaction="?/logout">logout</button>
			<button formaction="?/rename">rename</button>
			<button class="hella-red" formaction="?/delete">delete</button>
		</form>
	</div>

	<div class="boards">
		{#each user.Board as board}
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

	.wrapper {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr 1fr;
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
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5em;
		overflow-y: scroll;
		width: min-content;
		margin: 0 auto;
	}

	@media only screen and (max-width: 767px) {
		.boards {
			grid-template-columns: 1fr;
		}
	}

	@media only screen and (max-height: 710px) {
		.boards {
			grid-template-columns: repeat(1, 1fr);
		}

		.wrapper {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
		}
	}

	@media only screen and (min-width: 1150px) {
		.boards {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.board {
		background: var(--sub-alt-color);
		border-radius: 7px;
		margin: auto 0;
		padding: 1em;
		width: 300px;
	}

	.hella-red {
		color: white;
		background: red;
	}

	.hella-red:hover {
		background: darkred;
	}
</style>
