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

<section class="main">
	<div>
		<h1>Leaderbored</h1>

		<ul>
			<li>The world needs an easy and fun leaderboard</li>
			<br>
			<li class="testimonial">"...its completely original..."</li>
			<li class="testimonial">"Very easy to use... just share a link"</li>
			<li class="testimonial">"...impressive marvel of technology"</li>
		</ul>

		<div class="actions">
			<a href="/board" class="action">get started</a>
			<a href="/docs">docs</a>
		</div>
	</div>

	<div class="logo">
		<img src="/leaderbored.svg" alt="logo" width="300px" height="300px" />
	</div>
</section>

<section>
	<h2>best of all worlds</h2>

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

	<ul>
		<li>do you want to rank a competition among your friends?</li>

		<!-- TODO: docs are not finalised, dont show anything linking there -->
		<!-- <li>
			do you want a <a href="/docs#speed" class="special">fast</a>, simple and
			<a href="/docs#price" class="special">cheap</a>
			leaderboard integration for
			<a href="/docs#applications" class="special">your application?</a>
		</li> -->
	</ul>
</section>

<style scoped>
	.main {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	@media (max-width: 961px) {
		.main {
			justify-content: center;
		}

		.main > * {
			width: 100%;
		}
		
		.logo {
			display: none !important;
		}
	}

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

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%); /* Move left by half the content width */
		}
	}

	.main > div {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		text-align: left;
	}

	ul {
		list-style: none;
		padding-left: 0.1rem;
	}

	.special {
		color: var(--main-color);
	}

	.special:hover {
		color: var(--sub-color);
	}

	.actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1.5em;
	}

	.action {
		color: var(--bg-color);
		background: var(--main-color);
		padding: 0.6em;
		border-radius: 0.2em;
	}

	.action:hover {
		color: var(--main-color);
		background: var(--text-color);
	}

	.testimonial {
		color: var(--sub-color);
		font-family: Georgia, 'Times New Roman', Times, serif;
		font-style: italic;
	}
</style>
