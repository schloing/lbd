<script lang="ts">
	let { isHeader = false, isError = false, rank = 0, username = 'null', points = 0 } = $props();
</script>

<tr class="rank">
	{#if !isHeader && !isError}
		<td>{rank}</td>
		<td><a href="/account/{username}">@{username}</a></td>
		<td>{points}</td>
	{:else if isError}
		<td>nothing to show</td>
		<td>add a user</td>
		<td>{import.meta.env.MODE == "development" ? "dumbass" : "please"}</td>
	{:else}
		<td>rank</td>
		<td>username</td>
		<td>points</td>
	{/if}
</tr>

<style scoped>
	.rank:nth-child(even) {
		background: var(--sub-alt-color);
	}

	.rank {
		--rank-height: 3.5rem;

		line-height: 3.5rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 0 1rem;
		gap: 1rem;
		height: var(--rank-height);
		/* border: var(--border-size) solid var(--text-color); */
		border-top: none;
		border-left: none;
		border-radius: var(--border-radius);
		transition: background 150ms;
		text-align: center;
	}
</style>
