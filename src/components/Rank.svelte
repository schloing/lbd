<script lang="ts">
	import type { RankUser } from '$/lib/client/RankUser';
	import Td from './Td.svelte';
	let {
		rank = 0,
		rankUser
	}: {
		rank: number;
		rankUser: RankUser;
	} = $props();
</script>

<tr class="rank">
	{#if rankUser}
		<Td>{rank}</Td>
		<Td>
			{rankUser.name}
			{#if rankUser.accountAssociated}
				<a href="/account/{rankUser.uuid}">@{rankUser.username}</a>
			{:else}
				<span class="stealth">(no account)</span>
			{/if}
		</Td>
		<Td>{rankUser.score}</Td>
	{/if}
</tr>

<style scoped>
	.rank {
		background: var(--sub-alt-color);
		height: 3em;
		transition: background 150ms;
	}
</style>
