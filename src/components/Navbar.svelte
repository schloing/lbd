<script lang="ts">
	import { get } from 'svelte/store';
	import { boardStore } from '$/stores/board';
	const short = (str: string, len = 12) => (str?.length > len ? str.slice(0, len) + '...' : str);
	const board = $derived($boardStore);
</script>

<nav>
	<a href="/" class="primary">Leaderbored</a>
	<div class="info">
		{#if board}
			<div class="info">
				<a href={`/board/${board.id}`} data-tooltip={`${board.name}`}>{short(board.name)}</a>

				<a href={`/account/${board.owner.id}`} data-tooltip={`@${board.owner.id}`}>
					{short(board.owner.name ?? 'anonymous')}
				</a>

				<p>{board.participants}</p>
				<p>{board.points}</p>
			</div>
		{/if}
	</div>

	<div class="rest">
		<a href="/account">account</a>
		<a href="/board">boards</a>
		<a href="/docs">docs</a>
	</div>
</nav>

<style scoped>
	nav {
		--navbar-padding: 1rem;
		width: calc(100% - 2 * var(--navbar-padding));
		height: var(--navbar-height);
		line-height: var(--navbar-height);
		background: var(--sub-alt-color);
		padding: 0 var(--navbar-padding);
		margin: 0;
		position: fixed;
		top: 0;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
	}

	@media only screen and (max-width: 851px) {
		.info {
			display: none !important;
		}
	}

	a {
		font-size: 1.25em;
	}

	.rest {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.info {
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		gap: 1rem;
		border-top: none;
		border-left: none;
		border-radius: var(--border-radius);
	}

	.info > * {
		display: inline-flex;
		align-items: center;
		position: relative;
	}

	.info > a:hover {
		cursor: pointer;
	}

	.info > *:after {
		--slash-height: calc(var(--info-height) * 0.7);
		--slash-width: 0.15rem;
		--slash-angle: 10deg;

		content: '';
		background: var(--main-color);
		margin-left: 1em;
		display: inline-block;
		height: var(--slash-height);
		width: var(--slash-width);
		rotate: var(--slash-angle);
	}

	.info > *:nth-last-child(1):after {
		content: none;
	}
</style>
