<script lang="ts">
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
</script>

<h2>benefits</h2>

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

<style scoped>
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
</style>
