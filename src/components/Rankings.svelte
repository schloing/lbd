<script lang="ts">
	import Rank from './Rank.svelte';
</script>

<table>
	<tbody>
		<Rank isHeader={true} />
		{#each { length: 300 }, i}
			<Rank rank={i + 1} username={'0'} points={i + 1} />
		{/each}
	</tbody>
</table>

<style scoped>
	table {
		width: 100%;
	}
</style>
