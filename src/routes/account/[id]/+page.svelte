<script lang="ts">
	import { type PageProps } from './$types';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { authClient } from '$/lib/client/auth';

	let { data }: PageProps = $props();
	const { authorized, user } = data;

	async function handleSignOut() {
		await authClient.signOut();
		await invalidateAll();
		goto('/');
	}

	async function handleDelete() {
		await authClient.deleteUser();
		await invalidateAll();
		goto('/');
	}
</script>

{#if user}
	<section class="user">
		<img
			src={'https://corsproxy.io/?url=' + (user.image ?? 'https://i.pravatar.cc/300')}
			alt="user avatar"
			class="pfp"
			width="100px"
			height="100px"
		/>

		<p>@{user.username}</p>
		{#if authorized}
			<p class="stealth">{user.name}</p>
			<p class="stealth">{user?.email}</p>
		{/if}
		<p class="stealth">{user.id}</p>
		{#if authorized}
			<div>
				<button type="submit" onclick={handleSignOut}>sign out</button>
				<button type="submit" class="danger" onclick={handleDelete}>delete</button>
			</div>
		{/if}
	</section>

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

	.danger {
		background: darkred;
	}
</style>
