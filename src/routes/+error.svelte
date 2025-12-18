<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.error?.message}</title>
</svelte:head>

<section>
	<h1 class="error">{page.status}</h1>
	<p class="suggestion">
		{#if page.status == 404}
			this page doesn't exist.
		{:else if page.status == 500}
			something's wrong in the server. come back in a few minutes.
		{:else}
			try come back in a few minutes
		{/if}
	</p>
	<p>check out leaderbored <a href="/status">status</a></p>
	<p>
		problem still happening? <a href="https://github.com/schloing/lbd/issues/">report the bug</a>
	</p>
	<p>
		know how to fix it? <a href="https://github.com/TheCalculus/lbd/">fix the bug yourself here</a>
	</p>
</section>

<style>
	h1.error {
		font-size: 10rem;
		font-weight: 100;
		line-height: 1em;
	}

	p.suggestion {
		font-size: 2rem;
	}

	p {
		margin: 0.2em;
	}
</style>
