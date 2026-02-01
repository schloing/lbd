<script lang="ts">
	import { onMount } from 'svelte';

    const prefix = "You need";
    const suffix = "";

	let douwannas = [
		'to rank a competition among your friends?',
		'realtime rankings with notifications?',
		'an embeddable leaderboard for your website?',
	];

	let fullText = '';
	let douwanna = '';
	let phraseIndex = 0;
	let charIndex = 0;
	let deleting = false;

	function tick() {
		fullText = douwannas[phraseIndex];

		if (!deleting) {
			douwanna = fullText.slice(0, ++charIndex);
			if (charIndex === fullText.length) {
				setTimeout(() => (deleting = true), 1400);
			}
		} else {
			douwanna = fullText.slice(0, --charIndex);
			if (charIndex === 0) {
				deleting = false;
				phraseIndex = (phraseIndex + 1) % douwannas.length;
			}
		}
	}

	onMount(() => {
		setInterval(tick, 50);
	});
</script>

<div class="special-wrapper">
	<span>{prefix} <span class="special">{douwanna}<span class="caret">▌</span></span>{suffix}</span>
</div>

<style scoped>
	.caret {
		animation: blink 1s steps(1) infinite;
	}

	.special-wrapper {
		height: 50px;
		display: inline-flex;
		align-items: center;
	}

	.special {
		color: var(--main-color);
	}
</style>
