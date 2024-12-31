<script lang="ts">
	import BoardInfo from '$/components/BoardInfo.svelte';
	let { children } = $props();
</script>

<section class="boardInfo">
	<BoardInfo />
	<div class="children">
		{@render children()}
	</div>
</section>

<style scoped>
	.boardInfo {
		display: grid;
		grid-template-rows: 1fr 9fr;
	}

	.children {
		overflow-y: scroll;
	}
</style>
