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
				class="board-action dangerous"
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
		width: min(80%, 1000px);
		margin: 0 auto 0.3em;
		border-radius: 0.5em;
		background: var(--sub-alt-color);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 48px;
	}

	.board-info {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 0 0.75rem;
		flex-wrap: wrap;
	}

	.board-info > * {
		position: relative;
		white-space: nowrap;
	}

	.board-info > *::after {
		--slash-height: calc(var(--info-height) * 0.7);
		--slash-width: 0.3rem;
		--slash-angle: 10deg;

		content: '';
		background: var(--main-color);
		position: absolute;
		right: -0.9em;
		top: 50%;
		transform: translateY(-50%);
		height: var(--slash-height);
		width: var(--slash-width);
		border-radius: 1em;
		opacity: 0.2;
	}

	.board-info > *:last-child::after {
		content: none;
	}

	.board-actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.board-action {
		background: none;
		color: var(--sub-color);
		width: 40px;
		height: 40px;
		padding: 0;
		display: grid;
		place-items: center;
		border-radius: 0.4rem;
	}

	.board-action:hover {
		color: var(--text-color);
		background: rgba(255, 255, 255, 0.05);
	}

	.dangerous {
		color: var(--error-color);
	}

	@media (max-width: 600px) {
		.menu {
			width: 90%;
			flex-direction: column;
			align-items: stretch;
			gap: 0.5rem;
			padding: 1em 0;
		}

		.board-info {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 0.6em;
		}

		.board-info > *::after {
			display: none;
		}

		.board-actions {
			justify-content: center;
		}
	}
</style>
