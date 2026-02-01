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

<div class="background">
	<div class="background-cover"></div>
	<Matrix />
</div>

<div class="content">
	<section class="main">
		<div class="matrix-inner">
			<div class="title">
				<img src="/leaderbored.svg" class="logo" alt="logo" />
				<h1>Leaderbored</h1>
			</div>

			<TypingThang />

			<div class="actions">
				<a href="/board" class="main-action">get started</a>
				<a href="#staircase" class="action">how it works</a>
				<a href="#podium" class="action">comparisons</a>
			</div>
		</div>
	</section>

	<section class="hide">
		<Marquee />
	</section>

	<section id="staircase">
		<Staircase />
	</section>

	<section id="podium">
		<Podium />
	</section>
</div>

<style scoped>
	.background-cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: color-mix(in srgb, var(--sub-alt-color) 40%, transparent);
		backdrop-filter: blur(1px);
		z-index: 1000;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.content {
		position: relative;
		scroll-behavior: smooth;
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

	/* hide awkward looking thangs, they not ready for da sunlight */
	.hide {
		display: none;
	}

	.main {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		height: calc(100vh - var(--navbar-height));
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

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%); /* Move left by half the content width */
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
		padding: 0.6em;
		border-radius: 0.2em;
	}

	.main-action {
		color: var(--bg-color);
		background: var(--main-color);
	}

	.main-action:hover {
		color: var(--main-color);
		background: var(--text-color);
	}

	section {
		width: 100%;
		padding-left: 10%;
		padding-right: 10%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--sub-alt-color) 50%, transparent);
	}
</style>
