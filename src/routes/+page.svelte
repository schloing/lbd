<script lang="ts">
	import Rank from '$/components/Rank.svelte';
</script>

<section class="boardContainer">
	<table class="rankings">
		<tbody>
			<Rank />
		</tbody>
	</table>
</section>

<style>
	.boardContainer {
		width: 100%;
		height: 100%;
	}

	.rankings {
		margin: 0;
		height: 60vh;
	}
</style>
