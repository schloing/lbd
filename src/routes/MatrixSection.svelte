<script lang="ts">
	import { onMount } from 'svelte';

	const { children = undefined } = $props();

	const COUNT = 100;
	const SPEED_MIN = 1;
	const SPEED_MAX = 10;

	interface Ticker {
		x: number;
		y: number;
		vx: number;
		vy: number;
		value: number;
		dir: number;
	}

	let tickers: Ticker[] = $state([]);
	let container: HTMLDivElement;

	function rand(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	onMount(() => {
		const rect = container.getBoundingClientRect();

		tickers = Array.from({ length: COUNT }, () => ({
			x: rand(0, rect.width),
			y: rand(0, rect.height),
			vx: rand(SPEED_MIN, SPEED_MAX) * (Math.random() > 0.5 ? 1 : -1),
			vy: rand(SPEED_MIN, SPEED_MAX) * (Math.random() > 0.5 ? 1 : -1),
			value: Math.floor(rand(-1000, 1000)),
			dir: [1, -1][Math.floor(rand(-1, 1))]
		}));

		let last = performance.now();

		function animate(now: number) {
			const dt = (now - last) / 1000;
			last = now;

			if (container) {
				const w = container.clientWidth;
				const h = container.clientHeight;

				for (const t of tickers) {
					t.x += t.vx * dt;
					t.y += t.vy * dt;

					if (t.x <= 0 || t.x >= w - 40) {
						t.vx *= -1;
					}

					if (t.y <= 0 || t.y >= h - 20) {
						t.vy *= -1;
					}
				}
			}

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);

		let time = 0;

		setInterval(() => {
			for (const t of tickers) {
				const delta = Math.floor(rand(-10, 15));

				if (delta !== 0) {
					t.value += delta;
					if (time % 10 == 0) {
						t.dir = Math.sign(delta);
					}
				}
			}
			time++;
		}, 500);
	});
</script>

<div class="main" bind:this={container}>
	<div class="main-content">
		{#each tickers as t}
			<div
				class="ticker {t.dir > 0 ? 'up' : 'down'}"
				style="transform: translate3d({t.x}px, {t.y}px, 0);"
			>
				{t.value}
				<span class="arrow">{t.dir > 0 ? '▲' : '▼'}</span>
			</div>
		{/each}
	</div>
	<div class="main-content">
		{@render children?.()}
	</div>
</div>

<style>
	.main {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.main-content {
		width: 100%;
		height: 100%;
	}

	.ticker {
		position: absolute;
		font-size: 14px;
		font-family: monospace;
		opacity: 0.2;
		pointer-events: none;
		will-change: transform;
		filter: blur(0.4px);
		transition: color 0.15s ease;
	}

	.ticker.up {
		color: var(--main-color);
	}

	.ticker.down {
		color: var(--error-color);
	}

	.arrow {
		margin-left: 2px;
		font-size: 10px;
	}
</style>
