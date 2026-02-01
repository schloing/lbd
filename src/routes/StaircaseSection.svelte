<div class="main">
	<h2>how it works</h2>

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
		background: var(--bg-color);
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

	.gold {
		color: white !important;
		background: linear-gradient(315deg, red, gold) !important;
	}

	.silver {
		color: white !important;
		background: linear-gradient(315deg, rgb(65, 65, 65), rgb(189, 189, 189)) !important;
	}

	.bronze {
		color: white !important;
		background: linear-gradient(315deg, brown, rgb(255, 104, 104)) !important;
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
