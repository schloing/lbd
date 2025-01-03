<footer>
    <p>&copy; leaderbored 2025-present</p>
    <div class="rest">
        <a href="https://github.com/TheCalculus/lbd">source code (mit)</a>
        <a href="https://github.com/TheCalculus/lbd">found a bug? fix it.</a>
    </div>
</footer>

<style scoped>
	footer {
		--navbar-padding: 1rem;
		width: calc(100% - 2 * var(--navbar-padding));
		height: var(--navbar-height);
		line-height: var(--navbar-height);
		background: var(--color-background);
		padding: 0 var(--navbar-padding);
		margin: 0;
		position: fixed;
		bottom: 0;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		font-size: 1.4em;
		border-top: var(--border-size) solid var(--color-text);
	}

	.rest {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
