<script lang="ts">
	import { boardStore } from '$/stores/board';
	import { userStore } from '$/stores/user';
	const short = (str: string, len = 12) => (str?.length > len ? str.slice(0, len) + '...' : str);
	const board = $derived($boardStore);
	const user = $derived($userStore);
</script>

<nav>
	<a href="/" class="primary">Leaderbored</a>
	<div class="info">
		{#if board}
			<div class="info">
				<a href={`/board/${board.id}`} data-tooltip={`${board.name}`}>{short(board.name)}</a>

				<p>{board.participants}</p>
				<p>{board.points}</p>
			</div>
		{/if}
	</div>

	<div class="rest">
		{#if !user}
			<a href="/account">account</a>
		{:else}
			<a href="/account/{user.id}">{user.username}</a>
		{/if}
		<a href="/board">boards</a>
		<a href="/docs">docs</a>
	</div>
</nav>

<style scoped>
	nav {
		--navbar-padding: 1rem;
		width: 100%;
		height: var(--navbar-height);
		line-height: var(--navbar-height);
		background: var(--sub-alt-color);
		padding: 0 var(--navbar-padding);
		margin-bottom: 1rem;
		position: sticky;
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
