<script lang="ts">
	import BoardCard from './BoardCard.svelte';
	const { boards, user, showNull = true } = $props();
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
	.boards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		justify-items: center;
		margin: 0 auto;
		width: 100%;
		max-width: 1400px;
	}

	@media (max-width: 600px) {
		.boards {
			gap: 0.5rem;
		}
	}
</style>
