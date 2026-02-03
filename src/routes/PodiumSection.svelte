<script lang="ts">
	import { FileSpreadsheet, NotebookIcon } from 'lucide-svelte';
</script>

<div class="podium main">
	<div class="podium-box">
		<div class="alternative_logo">
			<NotebookIcon />
		</div>

		<div class="podium-wrapper">
			<p class="silver">2</p>
			<ul class="comp">
				<li class="pros">accessible, everyone has notepad</li>
				<li class="pros">collaboration possible</li>
				<li class="cons">inconvenient to change order of rankings, need to do math</li>
				<li class="cons">unmaintainable at scale</li>
			</ul>
		</div>
	</div>

	<div class="podium-box">
		<div class="alternative_logo">
			<img src="/leaderbored.svg" alt="logo" width="200px" height="200px" />
			<a href="/account" class="action">get started</a>
		</div>

		<div class="podium-wrapper">
			<p class="gold">1</p>
			<ul class="comp">
				<li class="pros">good ui</li>
				<li class="pros">accessible worldwide, live by default</li>
				<li class="pros">supports hella rankings</li>
				<li class="cons">needs internet connection</li>
			</ul>
		</div>
	</div>

	<div class="podium-box">
		<div class="alternative_logo">
			<FileSpreadsheet />
		</div>

		<div class="podium-wrapper">
			<p class="bronze">3</p>
			<ul class="comp">
				<li class="pros">makes good graphs</li>
				<li class="pros">automatic rank ordering</li>
				<li class="cons">slow for many rankings</li>
				<li class="cons">less aesthetic</li>
			</ul>
		</div>
	</div>
</div>

<style scoped>
	.main {
		width: 100%;
	}

	.comp {
		width: 90%;
		font-size: 0.8em;
		background: var(--bg-color);
		padding: 1em 0.5em;
		border-radius: var(--border-radius);
	}

	.pros,
	.cons {
		margin: 0.2em 0;
		width: 100%;
		text-align: left;
	}

	.pros {
		color: var(--main-color);
	}

	.cons {
		color: var(--colorful-error-color);
	}

	.pros::before {
		content: '+';
		margin: 0 0.2em;
	}

	.cons::before {
		content: '-';
		margin: 0 0.2em;
	}

	.podium {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
		gap: 1em;
		height: 600px;
	}

	.podium-box {
		width: 250px;
		display: grid;
		grid-template-rows: 3fr 7fr;
		background: var(--sub-color);
		border-radius: var(--border-radius);
	}

	.action {
		background: var(--main-color);
		color: var(--bg-color);
		padding: 0.8em 1em;
		border-radius: var(--border-radius);
	}

	.action:hover {
		color: var(--main-color);
		background: var(--text-color);
	}

	.alternative_logo {
		padding: 0.3em 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	:global(.alternative_logo > svg) {
		width: 150px;
		height: 70px;
	}

	.podium-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 1em;
	}

	.podium-wrapper > .gold,
	.podium-wrapper > .silver,
	.podium-wrapper > .bronze {
		width: 2em;
		height: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 2rem;
	}

	.podium-box:nth-child(1) {
		height: 70%;
		opacity: 0.6;
	}

	.podium-box:nth-child(2) {
		height: 100%;
		box-shadow: 2px 1px 176px 14px rgba(230, 230, 230, 0.08);
		-webkit-box-shadow: 2px 1px 176px 14px rgba(230, 230, 230, 0.08);
		-moz-box-shadow: 2px 1px 176px 14px rgba(230, 230, 230, 0.08);
		backdrop-filter: blur(10px);
	}

	.podium-box:nth-child(3) {
		height: 60%;
		opacity: 0.3;
	}

	@media (max-width: 961px) {
		.comp {
			font-size: 0.9em;
		}
	}

	@media (max-width: 650px) {
		:global(.alternative_logo > svg) {
			width: 50px;
			height: 50px;
		}

		.podium {
			font-size: 0.9rem;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: fit-content;
		}

		.podium-box {
			grid-template-columns: 1fr 9fr;
			grid-template-rows: unset;
			height: fit-content !important;
			width: fit-content;
			align-items: center;
			padding: 0.4em 0 0.4em 0.8em;
		}

		:global(.alternative_logo > svg) {
			width: 50px;
			height: 50px;
		}

		img {
			width: 100px;
		}

		.comp {
			font-size: 1.2em;
		}
	}

	ul {
		list-style: none;
		padding-left: 0.1rem;
	}

	ul > li {
		padding: 0.1em 0;
	}
</style>
