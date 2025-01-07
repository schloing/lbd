<nav>
	<a href="/" class="primary">Leaderbored</a>
	<div class="rest">
		<a href="/account">account</a>
		<a href="/board">boards</a>
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
		font-size: 1.4em;
	}

	.rest {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
