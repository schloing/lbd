<script lang="ts">
	import Rank from '$/components/Rank.svelte';
</script>

<div class="board">
	<table class="rankings">
		<tbody>
			<tr class="rank">
				<th>rank</th>
				<th>username</th>
				<th>points</th>
			</tr>
			<Rank rank={0} username={"jacobi"} points={0} />
		</tbody>
	</table>
</div>

<style scoped>
	.board {
		display: grid;
		grid-template-columns: 2.5fr 7.5fr;
		width: 100%;
		height: 100%;
	}

	.rankings {
		margin: 0;
		height: 60vh;
	}

	.rank:nth-child(even) {
		background: var(--color-tr-odd-background);
	}

	.rank {
		--rank-height: 3.5rem;

		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding: 0 1rem;
		gap: 1rem;
		height: var(--rank-height);
		border: var(--border-size) solid var(--color-text);
		border-top: none;
		border-left: none;
		border-radius: var(--border-radius);
		transition: background 150ms;
	}

	.rank:hover {
		background: var(--color-tr-odd-background-hover);
		cursor: pointer;
	}
</style>
