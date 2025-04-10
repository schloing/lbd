<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	const path: string = page.url.searchParams.get('path') ?? '/';
	const message: string = page.url.searchParams.get('message') ?? 'generic redirect';
	let time = 3;
	onMount(() => {
		setInterval(() => {
			time -= 1;
			if (time <= 0) {
				goto(path);
			}
		}, 1000);
	});
</script>

<div>
	<h2>you are being redirected to {path} in {time}</h2>
	<br />
	<p>reason: {message}</p>
</div>
