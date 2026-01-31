<script lang="ts">
	import type { RankUser, ScoreUser } from '$/lib/client/RankUser';
	import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-svelte';

	const {
		scoreUser,
		idx,
		authorized,
		onIncrement,
		onRemove
	}: {
		scoreUser: ScoreUser;
		idx: number;
		authorized: boolean;
		onIncrement?: (user: ScoreUser, amt: number) => void;
		onRemove?: (user: ScoreUser) => void;
	} = $props();

	const user = $derived(scoreUser.user);
	const points = $derived(scoreUser.score);

	async function incrementScore(user: ScoreUser, amt: number) {
		return onIncrement?.(user, user.score + amt); // onIncrement event _updates_ score to amt, it doesn't increment the current score
	}

	async function removePlayer(user: ScoreUser) {
		return onRemove?.(user);
	}
</script>

<div class="rank">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="ranking {idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : ''}">
		<span class="rank-number">{idx + 1}</span>
	</div>

	<div class="nameplate">
		<span>
			{user.name}
			{#if user.accountAssociated}
				<a href="/account/{user.uuid}">@{user.username}</a>
			{/if}
		</span>
	</div>

	<div class="points">{points}</div>

	{#if authorized}
		<div class="actions">
			<div>
				<!-- TODO: +/- 10 might not be meaningful, or too meaningful
								 	 calculate a meaningful change of points -->
				<!-- eg. 10 points is a lot on a leaderboard tracking wins in bedwarz 
								 	 but not a lot for kills in skywarz -->
				<button
					class="action"
					onclick={async () => await incrementScore({ user, score: points }, 10)}
				>
					<PlusIcon />
					<span>10</span>
				</button>

				<button
					class="action"
					onclick={async () => await incrementScore({ user, score: points }, -10)}
				>
					<MinusIcon />
					<span>10</span>
				</button>

				<button class="danger" onclick={async () => await removePlayer({ user, score: points })}>
					<Trash2Icon />
				</button>
			</div>
		</div>
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
		width: fit-content;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ranking > .rank-number {
		color: var(--sub-color);
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

	.actions {
		height: 100%;
	}

	.actions > div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 0.4em;
		margin: 0 0.2em;
	}

	.action,
	.danger {
		background: none;
		border: 1px solid var(--sub-color);
		transition:
			background 150ms,
			border-color 150ms,
			color 150ms;
		display: flex;
		align-items: center;
		gap: 0.2em;
		font-size: 1.2rem;
		height: 60%;
	}

	.action:hover {
		background: var(--text-color) !important;
		color: var(--bg-color);
	}

	.rank {
		height: 3em;
		transition: background 150ms;
		display: grid;
		grid-template-columns: 5fr 75fr 10fr 10fr;
		gap: 1em;
		align-items: center;
		padding: 0 1em;
		border-radius: 0.2em;
	}

	.rank:nth-child(odd) {
		background: var(--sub-alt-color);
	}

	.rank:nth-child(even) {
		background: var(--bg-color);
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
</style>
