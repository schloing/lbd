<script lang="ts">
	import BoardCard from './BoardCard.svelte';
	const { boards, user = null, showNull = true } = $props();
</script>

<div class="boards">
	{#if showNull}
		<BoardCard board={null} {user} />
	{/if}

	{#each boards as board}
		<BoardCard {board} {user} />
	{/each}
</div>

<style scoped>
	:global(:root) {
		--board-card-length: 250px;
	}

	.boards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(var(--board-card-length), max-content));
		gap: 2rem;
		margin: 0 auto;
		width: 100%;
		max-width: 1400px;
		justify-items: start;
	}

	@media (max-width: 600px) {
		:global(:root) {
			--board-card-length: 150px;
		}

		.boards {
			gap: 1rem;
		}
	}
</style>
