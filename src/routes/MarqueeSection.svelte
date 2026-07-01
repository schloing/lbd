<script lang="ts">
	let features = [
		{ text: 'realtime' },
		{ text: 'configurable' },
		{ text: 'embeddable' },
		{ text: 'efficient' },
		{ text: 'cheap' }
	];
</script>

<div class="marquee">
	<div class="marquee-inner">
		{#each features as feature, index (index)}
			<div class="feature">{feature.text}</div>
		{/each}
	</div>
</div>

<style scoped>
	.marquee {
		margin: 1em 0;
		overflow: hidden;
		width: 100%;
	}

	.marquee-inner {
		display: grid;
		max-width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.5em 0em;
	}

	.feature {
		display: inline-block;
		padding: 0.3em 0;
		margin: 0 1em;
		background: var(--sub-color);
		min-width: 200px;
		text-align: center;
	}
</style>
