<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { type PageProps } from './$types';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { invalidateAll } from '$app/navigation';
	import { userStore } from '$/stores/user';
	import { users } from '$/lib/db/schema';

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
	<div class="user">
		<img
			src={user.imageURL ?? 'https://i.pravatar.cc/300'}
			alt="user avatar"
			class="pfp"
			width="100px"
			height="100px"
		/>

		<p>{user.name}</p>
		<p class="stealth">@{user.id}</p>

		{#if authorized}
			<p class="stealth">email (hidden) {authUser?.email}</p>
		{/if}
		{#if authorized}
			<div class="buttons">
				<button type="submit" onclick={handleSignOut}>sign out</button>
				<button type="submit" class="danger" onclick={handleSignOut}>delete</button>
			</div>
		{/if}
	</div>

	<!-- <BoardGallery boards={users} /> -->
{/if}

<style scoped>
	.pfp {
		border-radius: 50%;
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.user > * {
		margin: 0.2em 0;
	}

	.buttons {
		display: grid;
	}

	.danger {
		background: darkred;
	}
</style>
