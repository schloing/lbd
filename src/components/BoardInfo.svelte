<script lang="ts">
	let { board, resolvedOwner } = $props();
</script>

<div class="info">
	<a href="/board/{board.id}">{board.name}</a>
	<a href="/" data-tooltip="@{resolvedOwner.username}">{resolvedOwner.display}</a>
	<p>{board.participants}</p>
	<p>{board.points}</p>
</div>

<style scoped>
	.info {
		width: fit-content;
		height: var(--info-height);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		gap: 1rem;
		border: var(--border-size) solid var(--color-text);
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
		background: black;
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
