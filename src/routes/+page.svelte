<script lang="ts">
	import { FileSpreadsheet, NotebookIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let features = [
		{ text: 'realtime' },
		{ text: 'scalable' },
		{ text: 'configurable' },
		{ text: 'dynamic' },
		{ text: 'embeddable' },
		{ text: 'efficient' },
		{ text: 'intuitive' },
		{ text: 'cheap' }
	];

	let douwannas = [
		'rank a competition among your friends?',
		'realtime rankings with notifications?',
		'embed a leaderboard in your website?'
	];

	let fullText = '';
	let douwanna = '';
	let phraseIndex = 0;
	let charIndex = 0;
	let deleting = false;

	function tick() {
		fullText = douwannas[phraseIndex];

		if (!deleting) {
			douwanna = fullText.slice(0, ++charIndex);
			if (charIndex === fullText.length) {
				setTimeout(() => (deleting = true), 1400);
			}
		} else {
			douwanna = fullText.slice(0, --charIndex);
			if (charIndex === 0) {
				deleting = false;
				phraseIndex = (phraseIndex + 1) % douwannas.length;
			}
		}
	}

	onMount(() => {
		setInterval(tick, 50);
	});
</script>

<svelte:head>
	<title>leaderbored</title>
</svelte:head>

<section class="main">
	<div>
		<h1>Leaderbored</h1>

		<ul class="feats">
			<li>The world's easy and fun leaderboard</li>
			<li>
				You need to <span class="special">{douwanna}<span class="caret">▌</span></span> Leaderbored does
				that.
			</li>
		</ul>

		<div class="actions">
			<a href="/board" class="action">get started</a>
			<!-- <a href="/docs">docs</a> -->
		</div>
	</div>

	<div class="logo">
		<img src="/leaderbored.svg" alt="logo" width="300px" height="300px" />
	</div>
</section>

<section>
	<h2>how it works</h2>

	<div class="staircase">
		<div class="step" style="width:25%">
			<p class="gold">1</p>
			<p>make a board</p>
		</div>

		<div class="step" style="width:50%">
			<p class="silver">2</p>
			<p>add a person</p>
		</div>

		<div class="step" style="width:75%">
			<p class="bronze">3</p>
			<p>share the link</p>
		</div>

		<div class="step" style="width:100%">
			<p>4</p>
			<p>watch the rankings realtime</p>
		</div>
	</div>
</section>

<section>
	<h2>best of all worlds</h2>

	<div class="podium">
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

	<div class="marquee">
		<div class="marquee-inner">
			{#each features as feature, index (index)}
				<div class="feature">{feature.text}</div>
			{/each}
			{#each features as feature, index (index)}
				<div class="feature">{feature.text}</div>
			{/each}
		</div>
	</div>
</section>

<style scoped>
	.comp {
		width: 90%;
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
		background: var(--bg-color);
	}

	.pros::before {
		content: '+';
		margin: 0 0.2em;
	}

	.cons::before {
		content: '-';
		margin: 0 0.2em;
	}

	.main {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.caret {
		animation: blink 1s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.podium {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
		gap: 1em;
		height: 600px;
		margin: 2em 0;
	}

	.podium-box {
		width: 250px;
		display: grid;
		grid-template-rows: 3fr 7fr;
	}

	.alternative_logo {
		height: 100px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.alternative_logo > svg) {
		width: 150px;
		height: 70px;
	}

	.podium-wrapper {
		background: var(--sub-color);
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
		height: 80%;
	}

	.podium-box:nth-child(2) {
		height: 100%;
	}

	.podium-box:nth-child(3) {
		height: 60%;
	}

	.staircase {
		padding: 1em;
	}

	.step {
		background: var(--sub-color);
		margin: 0.2em auto;
		height: 60px;
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

	@media (max-width: 961px) {
		.main {
			justify-content: center;
		}

		.main > * {
			width: 100%;
		}

		.logo {
			display: none !important;
		}
	}

	.marquee {
		overflow: hidden;
		white-space: nowrap;
		width: 100%;
		position: relative;
		margin: 1em 0;
	}

	.marquee-inner {
		display: inline-block;
		animation: marquee 35s linear infinite;
	}

	.feature {
		display: inline-block;
		padding: 0.3em 0;
		margin: 0 1em;
		background: var(--sub-color);
		min-width: 200px;
		text-align: center;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%); /* Move left by half the content width */
		}
	}

	.main > div {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		text-align: left;
	}

	ul {
		list-style: none;
		padding-left: 0.1rem;
	}

	ul > li {
		padding: 0.1em 0;
	}

	.special {
		color: var(--main-color);
	}

	.actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1.5em;
	}

	.action {
		color: var(--bg-color);
		background: var(--main-color);
		padding: 0.6em;
		border-radius: 0.2em;
	}

	.action:hover {
		color: var(--main-color);
		background: var(--text-color);
	}
</style>
