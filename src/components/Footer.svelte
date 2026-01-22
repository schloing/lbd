<script lang="ts">
	import { onMount } from 'svelte';

	let toggleButton: HTMLDivElement;
	let footer: HTMLDivElement;

	onMount(() => {
		toggleButton.addEventListener('click', () => {
			footer.style.display = footer.style.display == 'none' ? 'block' : 'none';
		});
	});
</script>

<div class="main" style="display: none;" bind:this={footer}>
	<footer>
		<p><a href="https://github.com/schloing/lbd">source code (mit)</a></p>
		<p><a href="https://github.com/schloing/lbd/issues">found a bug? report it</a></p>
		<p><a href="/status">status</a></p>
		<p>
			<a
				href="https://github.com/monkeytypegame/monkeytype/blob/master/frontend/src/ts/constants/themes.ts#L27"
				>themes credit (monkeytype)</a
			>
		</p>
		<p><a href="mailto:user.datagram.protocol@proton.me">user.datagram.protocol@proton.me</a></p>
		<p><a href="https://discord.gg/N4UPhgWEnD">https://discord.gg/N4UPhgWEnD</a></p>
		<p><a href="/account">clean board caches</a> (decreases load speed)</p>
		<p><a href="/account">perform complete deletion</a></p>
		<p>only information you provide when making an account or board is stored</p>
		<p>&copy; Leaderbored 2025-present</p>
	</footer>
</div>
<div class="toggle" bind:this={toggleButton}>no budget</div>

<style scoped>
	:root {
		--navbar-padding: 55px;
	}

	.main {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		padding: var(--navbar-padding);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}

	footer {
		position: fixed;
		bottom: var(--navbar-padding);
		height: fit-content;
	}

	.toggle {
		width: 50px;
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		background: var(--text-color);
		color: var(--bg-color);
		z-index: 1000;
		cursor: pointer;
		transition: background 200ms;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Old versions of Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none;
	}

	.toggle:hover {
		background: var(--sub-alt-color);
	}
</style>
