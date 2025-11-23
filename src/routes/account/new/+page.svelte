<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';

	const { data } = $props();
	const { user } = $derived(data);

	let submitting = $state(false);
	let error = $state('');
</script>

<section>
	<h2>hello <a class="special" href={`/account/${user.id}`}>@{user.username}</a></h2>
	<p>let's change your username</p>
	<form
		method="POST"
		use:enhance={() => {
			submitting = true;
			return async ({ result, update }) => {
				if (result.type !== 'redirect' && result.type !== 'error') {
					const data = result.data;
					error = data?.message as string;
					if (error === undefined) {
						await goto('/account/');
					}
				} else {
					console.log(result.status);
					close();
				}

				await update({ reset: false });
			};
		}}
	>
		{#if error !== ''}
			<p class="error">{error}</p>
		{/if}
		<!-- Dunno why mate but moving the username input from outside the div causes hella hydration errorz -->
		<!-- Having it in a div alone gives a hydration_mismatch, but console don't show anything weird. cuh -->
		<div>
			<input type="text" placeholder={user.username} name="username" />
		</div>
		<div>
			<button class="danger" onclick={() => goto('/')} disabled={submitting}>no need</button>
			<button type="submit" formaction="?/updateUsername" disabled={submitting}>next</button>
		</div>
	</form>
</section>

<style>
	form {
		text-align: center;
	}

	button {
		width: 6rem;
	}

	.special {
		color: var(--main-color);
		transition: underline 250ms;
	}

	.special:hover {
		text-decoration: underline;
	}
</style>
