<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	const { data } = $props();
	const { commits, actions, dbStatus, redisStatus } = data;

	const runs = actions.workflow_runs;
</script>

<section>
	<h2>recent publish attempts</h2>

	{#each runs as run}
		<p
			class:completed={run.status === 'completed'}
			class:success={run.conclusion === 'success'}
			class:failure={run.conclusion === 'failure'}
			class:cancelled={run.conclusion === 'cancelled'}
		>
			{#if run.run_started_at || run.created_at}
				<span class="stealth">
					{formatDistanceToNow(new Date(run.run_started_at ?? run.created_at), { addSuffix: true })}
				</span>
			{/if}

			<a class="title" href={run.html_url} target="_blank">{run.display_title}</a>
		</p>
	{/each}
</section>

<section>
	<h2>recent commits</h2>

	{#each commits as commit}
		<p>
			<span class="stealth">
				{formatDistanceToNow(new Date(commit.commit.committer.date), { addSuffix: true })}
			</span>

			<a class="title" href={commit.html_url} target="_blank">{commit.commit.message}</a>
		</p>
	{/each}
</section>

<section>
	<p class="completed" class:success={dbStatus} class:failure={!dbStatus}>
		database: <span class="title">{dbStatus ? 'working' : 'broken'}</span>
	</p>

	<p class="completed" class:success={redisStatus} class:failure={!redisStatus}>
		leaderboards: <span class="title">{redisStatus ? 'working' : 'broken'}</span>
	</p>
</section>

<style>
	section {
		text-align: left;
	}

	p {
		margin: 0.5em 0;
	}

	.title {
		background: darkred;
		padding: 0.2em;
	}

	p.completed.success > .title {
		background: darkgreen;
	}

	p.completed.failure > .title {
		background: darkred;
	}

	p.completed.cancelled > .title {
		background: grey;
	}

	p:not(.completed) > .title {
		background: grey;
	}

	a.title {
		color: var(--text-color);
		text-decoration: underline;
	}

	.stealth {
		margin-right: 0.5em;
		opacity: 0.6;
		font-size: 0.85em;
	}
</style>
