<script lang="ts">
	import AddUserModal from './AddUserModal.svelte';
	import { modals, type ModalComponent } from 'svelte-modals';
	import { MessageSquareIcon, SettingsIcon, Trash2Icon, UserPlusIcon } from 'lucide-svelte';
	import BoardSettingModal from './BoardSettingModal.svelte';
	import { deleteBoard } from './user.remote';
	import { goto } from '$app/navigation';

	let {
		board,
		authorized,
		showChat = $bindable()
	}: {
		board: any;
		authorized: boolean;
		showChat: boolean;
	} = $props();

	function shortenString(str: string, len = 12) {
		return str?.length > len ? str.slice(0, len) + '...' : str;
	}
</script>

<div class="menu">
	<div class="board-info">
		<a href={`/board/${board.id}`} data-tooltip={`${board.name}`}>{shortenString(board.name)}</a>
		<p>{board.participants} <span class="stealth">participants</span></p>
		<p>{board.points} <span class="stealth">points</span></p>
	</div>

	<div class="board-actions">
		{#if authorized}
			<button
				class="board-action danger"
				onclick={async () => {
					const { success } = await deleteBoard(board.id);

					if (success) {
						goto('/board');
					}
				}}
			>
				<Trash2Icon />
			</button>
		{/if}

		<button
			class="board-action"
			onclick={() =>
				modals.open(BoardSettingModal as unknown as ModalComponent, { authorized, board })}
		>
			<SettingsIcon />
		</button>

		{#if authorized}
			<button
				class="board-action"
				onclick={() => modals.open(AddUserModal as unknown as ModalComponent, { authorized })}
			>
				<UserPlusIcon />
			</button>
		{/if}

		<button class="board-action" onclick={() => (showChat = !showChat)}>
			<MessageSquareIcon />
		</button>
	</div>
</div>

<style scoped>
	.menu {
		width: 100%;
		background: var(--sub-alt-color);
		margin-bottom: 0.3em;
		padding: 0.5em 0.6em;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.menu > * {
		display: inline;
	}

	.board-action {
		background: var(--bg-color);
		border: 1px solid var(--sub-color);
		float: right;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0.2em 0.25em;
	}

	.board-info {
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		gap: 2rem;
		border-top: none;
		border-left: none;
		border-radius: var(--border-radius);
	}

	.board-info > *:after {
		--slash-height: calc(var(--info-height) * 0.7);
		--slash-width: 0.15rem;
		--slash-angle: 10deg;

		content: '';
		background: var(--main-color);
		margin-left: 1em;
		position: absolute;
		transform: translate(-0.25em, -0.3em);
		height: var(--slash-height);
		width: var(--slash-width);
		rotate: var(--slash-angle);
	}

	.board-info > *:nth-last-child(1):after {
		content: none;
	}

	@media (max-width: 600px) {
		.board-info {
			gap: 1em;
		}

		.board-info > *:after {
			display: none;
		}

		.menu {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}

		.board-action {
			float: unset;
		}

		.board-info {
			width: unset;
		}
	}
</style>
