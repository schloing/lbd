<script lang="ts">
	import { fade } from 'svelte/transition';
	const { isOpen, close } = $props();
</script>

{#if isOpen}
	<div class="modal" role="dialog" transition:fade|global={{ duration: 250 }}>
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
	</div>
{/if}

<style scoped>
	:root {
		--navbar-padding: 55px;
	}

	.modal {
		text-align: left;
	}
</style>
