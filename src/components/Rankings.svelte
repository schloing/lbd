<script lang="ts">
	import Rank from './Rank.svelte';
	let { rankings }: { rankings: { username: string; score: string }[] } = $props();
	let currentInternalRanking = 0;
</script>

<table>
	<tbody>
		<Rank isHeader={true} />
		{#if rankings.length > 0}
			{#each rankings as ranking}
				<Rank
					rank={++currentInternalRanking}
					username={ranking.username}
					points={parseInt(ranking.score)}
				/>
			{/each}
		{:else}
			<Rank isError={true} />
		{/if}
	</tbody>
</table>

<style scoped>
	table {
		width: 100%;
	}
</style>
