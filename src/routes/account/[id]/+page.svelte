<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { type PageProps } from './$types';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { formatDate } from '$/lib/dates';
	import { invalidateAll } from '$app/navigation';
	import { userStore } from '$/stores/user';

	let { data }: PageProps = $props();
	const authUser = data?.session?.user;
	const { authorized, user } = data;

	async function handleSignOut() {
		await signOut({ redirectTo: '/' });
		$userStore = null;
		await invalidateAll();
	}
</script>

{#if user}
	<div class="wrapper">
		<div class="user">
			<img src={user.image ?? 'https://i.pravatar.cc/300'} alt="user avatar" class="pfp" width="100px" height="100px" />
			<p>{user.name}</p>
			<p class="stealth">@{user.id}</p>
			{#if authorized}
				<p class="stealth">email (hidden) {authUser?.email}</p>
			{/if}
			<p class="stealth">created {formatDate(user.createdAt)}</p>
			<p class="stealth">updated {formatDate(user.updatedAt)}</p>
			{#if authorized}
				<div>
					<button type="submit" onclick={handleSignOut}>sign out</button>
				</div>
			{/if}
		</div>

		<BoardGallery boards={user.Board} />
	</div>
{/if}

<style scoped>
	.pfp {
		border-radius: 50%;
	}

	.wrapper {
		display: grid;
		grid-template-rows: 1fr 1fr;
		gap: 2em;
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	@media only screen and (max-height: 710px) {
		.wrapper {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
		}
	}
</style>
