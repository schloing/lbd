<script lang="ts">
	const { board } = $props();
</script>

{#if board == null}
	<div class="board">
		<p class="plus">+</p>
	</div>
{:else}
	<div class="board">
		<p><a href="/board/{board.id}" class="primary">"{board.name}"</a></p>
		<p class="darkstealth"><b>{board.participants}</b> participants</p>
		<p class="darkstealth"><b>{board.points}</b> points</p>
	</div>
{/if}

<style scoped>
	.board {
		border: 0.1em solid var(--sub-color);
		border-radius: 7px;
		margin: auto 0;
		padding: 1em;
		width: 250px;
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.plus {
		font-size: 4rem;
		color: var(--sub-color);
	}
</style>
