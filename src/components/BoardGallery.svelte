<script lang="ts">
	import BoardCard from './BoardCard.svelte';
	const { boards } = $props();
</script>

<div class="boards">
	<BoardCard board={null} />

	{#each boards as board}
		<BoardCard {board} />
	{/each}
</div>

<style scoped>
	.boards {
		text-align: center;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5em;
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
	}

	@media only screen and (min-width: 1150px) {
		.boards {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
