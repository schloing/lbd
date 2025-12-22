<script lang="ts">
	import type { PageServerData } from './$types';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { authClient } from '$/lib/client/auth';

	let { data }: { data: PageServerData } = $props();
	const { authorized, queryUser, boards } = $derived(data);

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

<svelte:head>
	{#if queryUser}
		<title>@{queryUser.username}</title>
	{/if}
</svelte:head>

{#if queryUser}
	<section class="user">
		<img
			src={'https://corsproxy.io/?url=' + (queryUser.image ?? 'https://i.pravatar.cc/300')}
			alt="user avatar"
			class="pfp"
			width="100px"
			height="100px"
		/>

		<p>@{queryUser.username}</p>
		{#if authorized}
			<p class="stealth">{queryUser.name}</p>
			<p class="stealth">{queryUser?.email}</p>
		{/if}
		<p class="stealth">{queryUser.id}</p>
		{#if authorized}
			<div>
				<button type="submit" onclick={handleSignOut}>sign out</button>
				<button type="submit" class="danger" onclick={handleDelete}>delete</button>
			</div>
		{/if}

		<BoardGallery {boards} user={queryUser} showNull={authorized} />
	</section>
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
