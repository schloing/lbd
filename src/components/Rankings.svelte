<script lang="ts">
	import type { RankUser } from '$/lib/client/rankuser';
	import Td from './Td.svelte';
	let { rankings }: { rankings: RankUser[] } = $props();
	// svelte-ignore non_reactive_update
	let currentInternalRanking = 0;
</script>

<table>
	<colgroup>
		<col span="1" style="width: 15%;" />
		<col span="1" style="width: 70%;" />
		<col span="1" style="width: 15%;" />
	</colgroup>

	<tbody>
		<!-- TODO: add alternative -->
		{#if rankings.length > 0}
			{#each rankings as rankUser}
				<tr class="rank">
					<Td>{++currentInternalRanking}</Td>
					<Td>
						{rankUser.name}
						{#if rankUser.accountAssociated}
							<a href="/account/{rankUser.uuid}">@{rankUser.username}</a>
						{:else}
							<span class="stealth">(no account)</span>
						{/if}
					</Td>
					<Td>{rankUser.score}</Td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style scoped>
	table {
		width: 100%;
		border: none;
		border-collapse: separate;
		border-spacing: 0 0.2em;
		margin: 0;
	}

	.rank {
		background: var(--bg-color);
		height: 3em;
		transition: background 150ms;
	}

	.rank:hover {
		background: var(--sub-color);
	}

	.rank .stealth {
		transition: 150ms color;
	}

	.rank:hover .stealth {
		color: var(--sub-alt-color);
	}
</style>
