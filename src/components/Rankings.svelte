<script lang="ts">
	import Rank from './Rank.svelte';
	let { rankings } = $props();
</script>

<table>
	<tbody>
		<Rank isHeader={true} />
		{#if rankings.length > 0}
			{#each { length: rankings.length }, i}
				<Rank rank={i + 1} username={'0'} points={i + 1} />
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
