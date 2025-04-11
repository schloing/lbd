<script lang="ts">
	import { formatDate } from '$/lib/dates';
	const { board } = $props();
</script>

<div class="board">
	<p><a href="/board/{board.id}" class="primary">{board.name}</a></p>
	<p class="darkstealth">participants {board.participants}</p>
	<p class="darkstealth">points {board.points}</p>
	<p class="stealth">id {board.id}</p>
	<p class="stealth">created {formatDate(board.createdAt)}</p>
	<p class="stealth">updated {formatDate(board.updatedAt)}</p>
</div>

<style scoped>
	.board {
		background: var(--sub-alt-color);
		border-radius: 7px;
		margin: auto 0;
		padding: 1em;
		width: 300px;
	}
</style>
