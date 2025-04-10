<svelte:head>
	<title>leaderbored</title>
</svelte:head>

<section>
	<h1>leaderbored</h1>
	<br />
	<p>awarded best leaderboard application</p>
	<br />
	<div class="actions">
		<a href="/account">create account</a>
		<a href="/board">create board</a>
		<a href="/board/boards">bored of boreds</a>
	</div>
</section>

<style scoped>
	section {
		text-align: center;
	}

	.actions a:not(:first-child)::before {
		content: '|';
		margin: 0 0.5em;
		color: #999;
		pointer-events: none;
	}
</style>
