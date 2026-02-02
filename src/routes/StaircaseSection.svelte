<div class="main">
	<div class="staircase">
		<div class="step">
			<p class="gold">1</p>
			<p>make a board</p>
		</div>

		<div class="step">
			<p class="silver">2</p>
			<p>add a person</p>
		</div>

		<div class="step">
			<p class="bronze">3</p>
			<p>share the link</p>
		</div>

		<div class="step">
			<p>4</p>
			<p>watch the rankings realtime</p>
		</div>
	</div>
</div>

<style scoped>
	.main {
		width: 100%;
	}

	.staircase {
		padding: 1em;
	}

	.step {
		background: var(--sub-color);
		margin: 0.2em auto;
		padding: 0.35em 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.step > p:first-child {
		color: var(--main-color);
		background: var(--bg-color);
		border-radius: 50%;
		width: 25px;
		height: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step:nth-child(1) {
		width: 25%;
	}

	.step:nth-child(2) {
		width: 50%;
	}

	.step:nth-child(3) {
		width: 75%;
	}

	.step:nth-child(4) {
		width: 100%;
	}

	@media (max-width: 961px) {
		.step:nth-child(1) {
			width: 40%;
		}

		.step:nth-child(2) {
			width: 60%;
		}

		.step:nth-child(3) {
			width: 80%;
		}

		.step:nth-child(4) {
			width: 100%;
		}
	}
</style>
