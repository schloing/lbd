<script lang="ts">
	import type { RankUser } from '$/lib/client/rankuser';
	import { MinusIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-svelte';
	let { rankings, authorized }: { rankings: RankUser[]; authorized: boolean } = $props();
	// svelte-ignore non_reactive_update
	let currentInternalRanking = 0;
	let showTrash = $state(false);
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
					<td
						class="ranking"
						onmouseenter={() => (showTrash = true)}
						onmouseleave={() => (showTrash = false)}
					>
						<span class="rank-number">{++currentInternalRanking}</span>
						<!-- FIXME: this button shouldn't show if not authorized
					 	 leaving for now because it wont work if not authorized (enforced server side) -->
						<button class="danger">
							<Trash2Icon />
						</button>
					</td>

					<td>
						{rankUser.name}
						{#if rankUser.accountAssociated}
							<a href="/account/{rankUser.uuid}" class="stealth">@{rankUser.username}</a>
						{:else}
							<span class="stealth">(no account)</span>
						{/if}
					</td>

					<td>{rankUser.score}</td>

					{#if authorized}
						<td class="actions">
							<div>
								<!-- TODO: +/- 10 might not be meaningful, or too meaningful
								 	 calculate a meaningful change of points -->
								<!-- eg. 10 points is a lot on a leaderboard tracking wins in bedwarz 
								 	 but not a lot for kills in skywarz -->
								<button class="action">
									<PlusIcon />
									<span>10</span>
								</button>

								<button class="action">
									<MinusIcon />
									<span>10</span>
								</button>
							</div>
						</td>
					{/if}
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style scoped>
	.ranking {
		position: relative;
		width: 50px;
		text-align: center;
	}

	.ranking .rank-number {
		display: block;
		transition: opacity 0.2s ease;
	}

	.ranking .danger {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -65%);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
		background: none;
		border: 1px solid var(--danger-color);
		border-radius: 0.5rem;
		padding: 0.5em;
		cursor: pointer;
		color: var(--text-color);
	}

	.ranking:hover .danger {
		opacity: 1;
		pointer-events: auto;
	}

	.ranking:hover .rank-number {
		opacity: 0;
	}
	table {
		width: 100%;
		border: none;
		border-collapse: separate;
		border-spacing: 0 0.2em;
		margin: 0;
	}

	.actions > div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 0.4em;
		margin: 0 0.2em;
	}

	.editable {
		cursor: pointer;
	}

	.rank:hover,
	.active-rank {
		background: var(--sub-color);
	}

	.rank:hover .stealth,
	.active-rank .stealth {
		color: var(--sub-alt-color);
	}

	.rank:hover .action,
	.active-rank .action {
		background: var(--sub-alt-color);
	}

	.action {
		background: none;
		border-radius: 0.5rem;
		border: 1px solid var(--sub-color);
		max-height: 50px;
		transition:
			background 150ms,
			border-color 150ms,
			color 150ms;
		display: flex;
		align-items: center;
		gap: 0.2em;
		font-size: 1.2rem;
	}

	.action:hover {
		background: var(--text-color) !important;
		color: var(--bg-color);
	}

	.rank {
		background: var(--bg-color);
		height: 3em;
		transition: background 150ms;
	}

	.rank .stealth {
		transition: 150ms color;
	}
</style>
