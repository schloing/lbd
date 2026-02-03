<script lang="ts">
	import Matrix from './MatrixSection.svelte';
	import TypingThang from './TypingThang.svelte';
	import Podium from './PodiumSection.svelte';
	import Staircase from './StaircaseSection.svelte';
	import Marquee from './MarqueeSection.svelte';
</script>

<svelte:head>
	<title>leaderbored</title>
</svelte:head>

<div class="matrix">
	<Matrix>
		<div class="background-overlay"></div>
	</Matrix>
</div>

<section class="main">
	<div class="matrix-inner">
		<div class="title">
			<img src="/leaderbored.svg" class="logo" alt="logo" />
			<h1>Leaderbored</h1>
		</div>

		<TypingThang />

		<div class="actions">
			<a href="/account" class="main-action">get started</a>
			<a href="#staircase" class="action">how it works</a>
			<!-- <a href="/docs" class="action">docs</a> -->
		</div>
	</div>
</section>

<div class="demo">
	<h2 style="color: var(--text-color)">Leaderbored is</h2>
	<Marquee />
	<p class="subheading">...the best of all worlds</p>
	<div class="podium">
		<Podium />
	</div>
</div>

<div class="separator">
	<div class="custom-shape-divider-bottom-1770022697">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
				opacity=".25"
				class="shape-fill"
			></path>
			<path
				d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
				opacity=".5"
				class="shape-fill"
			></path>
			<path
				d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
				class="shape-fill"
			></path>
		</svg>
	</div>
</div>

<section id="staircase">
	<h2>how it works</h2>
	<p class="subheading">create a live ranking in under a minute</p>
	<Staircase />
</section>

<style scoped>
	.matrix {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.background-overlay {
		width: 100%;
		height: 100%;
	}

	h1 {
		font-size: 4em;
		color: var(--main-color);
	}

	.matrix-inner {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.demo {
		width: 80%;
		aspect-ratio: 16 / 9;
		/* min-height: 600px; */
		border-radius: 1em;
		margin: 0 auto;
		padding: 1em;
		background: var(--bg-color);
		border: 0.1em solid var(--main-color);
	}

	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 1em;
		background: none;
		padding-top: 7em;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@media (max-width: 650px) {
		.logo {
			width: 70px !important;
			height: 70px !important;
		}

		.title {
			flex-direction: column;
			padding-right: 0 !important;
		}

		h1 {
			font-size: 3em;
		}

		.actions {
			font-size: 0.8em;
		}

		section {
			padding-left: 2% !important;
			padding-right: 2% !important;
		}
	}

	.title {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-right: 55px;
	}

	.logo {
		transition: 300ms;
		will-change: opacity;
		height: 110px;
		width: 110px;
		opacity: 0.6;
	}

	.title * {
		user-select: none; /* Standard */
		-webkit-user-select: none; /* Safari/Chrome */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE/Edge */
	}

	.actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1.5em;
		margin: 1em 0;
	}

	.main-action,
	.action {
		padding: 0.8em 1em;
		border-radius: 0.2em;
	}

	.main-action {
		color: var(--bg-color);
		background: var(--main-color);
	}

	.action {
		/* padding: 0; */
		background: color-mix(in srgb, var(--bg-color) 50%, transparent);
	}

	.main-action:hover {
		color: var(--main-color);
		background: var(--text-color);
	}

	section {
		width: 100%;
		padding-left: 10%;
		padding-right: 10%;
		height: fit-content;
		background: none;
	}

	section:nth-child(1) {
		padding-top: 7em;
	}

	.podium {
		margin: 1em 0;
	}

	h2 {
		color: var(--main-color);
		margin: 0.2em 0;
	}

	.subheading {
		color: var(--sub-color);
		margin: 0 auto;
		padding: 0 0.5em;
		width: fit-content;
		background: var(--sub-alt-color);
	}

	.separator {
		height: fit-content;
		margin-top: 3em;
	}

	/* https://www.shapedivider.app/ */

	.custom-shape-divider-bottom-1770022697 {
		width: 100%;
		overflow: hidden;
		line-height: 0;
		transform: rotate(180deg);
	}

	.custom-shape-divider-bottom-1770022697 svg {
		position: relative;
		display: block;
		width: calc(161% + 1.3px);
		height: 100px;
	}

	.custom-shape-divider-bottom-1770022697 .shape-fill {
		fill: color-mix(in srgb, var(--main-color) 20%, transparent);
	}

	#staircase {
		background: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--main-color) 30%, transparent),
			var(--bg-color)
		);
		margin-top: 0;
		padding-top: 3em;
	}
</style>
