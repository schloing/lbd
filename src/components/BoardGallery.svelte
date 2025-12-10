<script lang="ts">
	import BoardCard from './BoardCard.svelte';
	const { boards, user } = $props();
</script>

<div class="boards">
	<BoardCard board={null} {user} />

	{#each boards as board}
		<BoardCard {board} {user} />
	{/each}
</div>

<style scoped>
	.boards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		justify-items: center;
		gap: 1em;
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
