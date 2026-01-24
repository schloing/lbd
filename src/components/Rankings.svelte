<script lang="ts">
	import { type RankUser, type ScoreUser } from '$/lib/client/RankUser';
	import { SortedMap } from '$/lib/client/SortedMap';
	import { removeUser, updateUserPoints } from '$/routes/board/[id]/user.remote';
	import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-svelte';
	let {
		rankings,
		authorized,
		board
	}: { rankings: SortedMap<RankUser, number>; authorized: boolean; board: string } = $props();

	async function incrementScore(user: RankUser, amt: number) {
		const score = rankings.get(user);
		if (!score) {
			return;
		}
		const new_score = score + amt;
		// optimistic update
		rankings.set(user, new_score);
		const { success } = await updateUserPoints({ user, score: new_score } as ScoreUser);
		if (!success) {
			// rollback optimistic update
			rankings.set(user, score);
		}
	}

	async function removePlayer(user: RankUser) {
		const { success } = await removeUser(user);
		if (!success) {
			// indicate
			return;
		}
	}
</script>

<div>
	<!-- TODO: add alternative -->
	{#if rankings.size > 0}
		{#each rankings as rankUser, idx}
			<div class="rank">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="ranking {idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : ''}"
				>
					<span class="rank-number">{idx + 1}</span>
				</div>

				<div class="nameplate">
					{rankUser[0].name}
					{#if rankUser[0].accountAssociated}
						<a href="/account/{rankUser[0].uuid}" class="stealth">@{rankUser[0].username}</a>
					{:else}
						<span class="stealth">(no account)</span>
					{/if}
				</div>

				<div class="points">{rankUser[1]}</div>

				{#if authorized}
					<div class="actions">
						<div>
							<!-- TODO: +/- 10 might not be meaningful, or too meaningful
								 	 calculate a meaningful change of points -->
							<!-- eg. 10 points is a lot on a leaderboard tracking wins in bedwarz 
								 	 but not a lot for kills in skywarz -->
							<button class="action" onclick={async () => await incrementScore(rankUser[0], 10)}>
								<PlusIcon />
								<span>10</span>
							</button>

							<button class="action" onclick={async () => await incrementScore(rankUser[0], -10)}>
								<MinusIcon />
								<span>10</span>
							</button>

							<button class="danger" onclick={async () => await removePlayer(rankUser[0])}>
								<Trash2Icon />
							</button>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style scoped>
	.nameplate {
		text-align: left;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.points {
		text-align: right;
	}

	.ranking {
		width: 50px;
		height: 50px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ranking > .rank-number {
		color: gray;
		background: lightgray;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 35px;
		border-radius: 50%;
		height: 35px;
		flex: 0 0 35px;
		box-sizing: border-box;
		transition: opacity 0.2s ease;
	}

	.gold > .rank-number {
		color: white;
		background: linear-gradient(315deg, red, gold);
	}

	.silver > .rank-number {
		color: white;
		background: linear-gradient(315deg, rgb(65, 65, 65), rgb(189, 189, 189));
	}

	.bronze > .rank-number {
		color: white;
		background: linear-gradient(315deg, brown, rgb(255, 104, 104));
	}

	.actions > div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 0.4em;
		margin: 0 0.2em;
	}

	.rank:hover {
		background: var(--sub-color);
	}

	.rank:hover .stealth {
		color: var(--sub-alt-color);
	}

	.rank:hover .action {
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
		display: grid;
		grid-template-columns: 15fr 70fr 15fr 10fr;
		gap: 1em;
		align-items: center;
		padding: 0 1em;
		margin: 0.2em 0;
	}

	@media (max-width: 950px) {
		.rank {
			display: flex;
			flex-direction: column; /* stack vertically */
			align-items: center; /* center everything */
			justify-content: flex-start;
			gap: 0.3em; /* space between stacked items */
			height: auto; /* let it grow naturally */
			padding: 0.5em 1em;
		}

		.ranking {
			width: 50px;
			height: 50px;
			margin-bottom: 0.2em; /* space below the rank circle */
		}

		.ranking > .rank-number {
			width: 50px;
			height: 50px;
			flex: 0 0 50px;
		}

		.nameplate,
		.points,
		.actions {
			width: 100%; /* full width */
			text-align: center; /* center text */
		}

		.actions > div {
			display: flex;
			justify-content: center; /* center the buttons */
			gap: 0.5em;
		}
	}

	.rank .stealth {
		transition: 150ms color;
	}
</style>
