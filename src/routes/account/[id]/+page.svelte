<script lang="ts">
	import { SignOut } from '@auth/sveltekit/components';
	import { type PageProps } from './$types';
	import { invalidateAll } from '$app/navigation';
	import BoardGallery from '$/components/BoardGallery.svelte';
	import { formatDate } from '$/lib/dates';

	let { data }: PageProps = $props();
	const authUser = data?.session?.user;
	const { authorized, user } = data;
</script>

{#if user}
	<div class="wrapper">
		<div class="user">
			<img
				src="https://api.cors.lol/?url={user.image ?? 'https://i.pravatar.cc/300'}"
				alt="user avatar"
				class="pfp"
			/>
			<p>{user.name}</p>
			<p class="stealth">@{user.id}</p>
			{#if authorized}
				<p class="stealth">email (hidden) {authUser?.email}</p>
			{/if}
			<p class="stealth">created {formatDate(user.createdAt)}</p>
			<p class="stealth">updated {formatDate(user.updatedAt)}</p>
			{#if authorized}
				<div>
					<!-- FIXME: redirectTo not working -->
					<SignOut signOutPage="account/logout" redirectTo="/">
						<span slot="submitButton">logout</span>
					</SignOut>
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

	.hella-red {
		color: white;
		background: red;
	}

	.hella-red:hover {
		background: darkred;
	}
</style>
