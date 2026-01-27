<script lang="ts">
	import type { PageServerData } from './$types';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { authClient } from '$/lib/client/auth';
	import { page } from '$app/state';

	let { data }: { data: PageServerData } = $props();
	const { authorized, queryUser, publicBoards, privateBoards } = $derived(data);
	const invitedBoards: any[] = [];

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
		<title>{`@${queryUser.username}`}</title>
		<meta property="og:title" content={`Leaderbored - @${queryUser.username}`} />
		<meta property="og:description" content={`${queryUser.name} is on Leaderbored`} />
		<meta property="og:type" content="website" />
		<meta property="og:url" content={page.url.toString()} />
		<meta property="og:image" content="https://leaderbored.online/leaderbored.png" />
	{/if}
</svelte:head>

{#await queryUser then queryUser}
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
				<p class="stealth">{queryUser.email}</p>
			{/if}
			<p class="stealth">{queryUser.id}</p>
			{#if authorized}
				<div>
					<button type="submit" onclick={handleSignOut}>sign out</button>
					<button type="submit" class="danger" onclick={handleDelete}>delete</button>
				</div>
			{/if}

			<p class="header fine">{authorized ? 'your' : `${queryUser}'s`} boards</p>

			{#await publicBoards}
				<h2>loading...</h2>
			{:then boards}
				<BoardGallery {boards} user={queryUser} showNull={true} />
			{/await}

			{#if authorized}
				<!-- svelte-ignore block_empty -->
				{#await privateBoards then boards}
					<p class="header fine">private</p>
					<BoardGallery {boards} user={queryUser} showNull={false} />
				{/await}
			{/if}

			{#if invitedBoards.length > 0}
				<p class="header fine">invited boards</p>
				<BoardGallery boards={invitedBoards} showNull={false} />
			{/if}
		</section>
	{/if}
{/await}

<style scoped>
	.header {
		text-align: left;
		width: 100%;
		color: var(--sub-color);
	}

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
