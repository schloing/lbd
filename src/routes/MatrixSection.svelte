<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const { children = undefined } = $props();

	const COUNT = 100;
	const SPEED_MIN = 0.1;
	const SPEED_MAX = 20;

	interface Ticker {
		x: number;
		y: number;
		vx: number;
		vy: number;
		value: number;
		dir: number;
	}

	let tickers: Ticker[] = [];
	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let main_color: string, error_color: string;

	function rand(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	function initTickers() {
		tickers = Array.from({ length: COUNT }, () => ({
			x: rand(0, canvas.width),
			y: rand(0, canvas.height),
			vx: rand(SPEED_MIN, SPEED_MAX) * (Math.random() > 0.5 ? 1 : -1),
			vy: rand(SPEED_MIN, SPEED_MAX) * (Math.random() > 0.5 ? 1 : -1),
			value: Math.floor(rand(-1000, 1000)),
			dir: Math.random() > 0.5 ? 1 : -1
		}));
	}

	function resizeCanvas() {
		if (!canvas || !container) return;
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
		initTickers();
	}

	function drawArrow(x: number, y: number, dir: number) {
		ctx.fillText(dir > 0 ? '↗' : '↘', x, y);
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = '1em monospace';
		ctx.globalAlpha = 0.3;

		for (const t of tickers) {
			ctx.fillStyle = t.dir > 0 ? main_color : error_color;
			ctx.strokeStyle = ctx.fillStyle;

			ctx.fillText(String(t.value), t.x, t.y);
			drawArrow(t.x + ctx.measureText(String(t.value)).width + 6, t.y - 4, t.dir);
		}

		ctx.globalAlpha = 1;
	}

	onMount(() => {
		main_color = window.getComputedStyle(document.body).getPropertyValue('--main-color');
		error_color = window.getComputedStyle(document.body).getPropertyValue('--error-color');
		ctx = canvas.getContext('2d')!;
		window.addEventListener('resize', resizeCanvas);
		resizeCanvas();

		let last = performance.now();

		function animate(now: number) {
			if (document.visibilityState === 'visible') {
				const dt = (now - last) / 1000;
				last = now;

				for (const t of tickers) {
					t.x += t.vx * dt;
					t.y += t.vy * dt;

					if (t.x <= 0 || t.x >= canvas.width - 40) {
						t.vx *= -1;
					}

					if (t.y <= 14 || t.y >= canvas.height - 10) {
						t.vy *= -1;
					}
				}

				draw();
			}

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);

		let time = 0;

		const interval = setInterval(() => {
			for (const t of tickers) {
				const delta = Math.floor(rand(-10, 15));
				if (delta !== 0) {
					t.value += delta;
					if (time % 10 === 0) {
						t.dir = Math.sign(delta);
					}
				}
			}
			time++;
		}, 1000);

		onDestroy(() => {
			clearInterval(interval);
			window.removeEventListener('resize', resizeCanvas);
		});
	});
</script>

<div class="main">
	<div class="matrix-content" bind:this={container}>
		<canvas bind:this={canvas}></canvas>
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

	.matrix-content {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.main-content {
		position: absolute;
		inset: 0;
	}
</style>
