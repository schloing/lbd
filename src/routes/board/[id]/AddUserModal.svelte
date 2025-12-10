<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getContext } from 'svelte';
	import { getUserByUsername } from './user.remote';
	import type { RankUser } from '$/lib/client/rankuser';

	const { isOpen, close, authorized } = $props();

	if (authorized === false) {
		// just testing, this not the best way mate
		close();
	}

	let linkedToAccount = $state(false);
	let error = $state('');
	let userSearchResults: RankUser[] = $state([]);
	// svelte-ignore non_reactive_update
	let usernameInputValue = '';

	async function searchUser() {
		userSearchResults = (await getUserByUsername(usernameInputValue)) as RankUser[];
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<form
			method="POST"
			action="?/addUser"
			use:enhance={({ cancel }) => {
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						const data = result.data;
						error = (data?.message as string) ?? '';
						await update({ reset: false });
					} else {
						close();
						invalidateAll();
					}
				};
			}}
		>
			<h2>add user</h2>
			<p class="error">{error}</p>

			<div>
				<label for="name">name</label>
				<input type="text" name="name" placeholder="jimbo" autocomplete="off" />
			</div>

			<div>
				<label for="score">starting score</label>
				<input type="number" name="score" placeholder="14" value={0} />
			</div>

			<div>
				<label for="accountAssociated">linked to lbd account?</label>
				<input name="accountAssociated" type="checkbox" bind:checked={linkedToAccount} />
			</div>

			<div>
				{#if linkedToAccount}
					<span>@</span>
					<input
						type="text"
						name="username"
						placeholder="XXJIMBOXX"
						bind:value={usernameInputValue}
						oninput={async () => await searchUser()}
						autocomplete="off"
					/>
					<div>
						{#each userSearchResults as userSearchResult}
							<a href="/account/{userSearchResult.uuid}">{userSearchResult.username}</a>
						{/each}
					</div>
				{/if}
			</div>

			<button type="submit">create</button>
		</form>
	</div>
{/if}

<style scoped>
	input[type='text'],
	input[type='number'] {
		display: inline-block;
	}

	form > button {
		width: 40%;
	}
</style>
