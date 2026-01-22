<script lang="ts">
	import AddBoardModal from '$/routes/board/AddBoardModal.svelte';
	import { modals, type ModalComponent } from 'svelte-modals';

	const { user = null, board } = $props();
</script>

{#if board == null && user}
	<div class="board">
		<div class="modal-button-wrapper">
			<button
				onclick={() => modals.open(AddBoardModal as unknown as ModalComponent, { user })}
				class="plus">+</button
			>
		</div>
	</div>
{:else}
	<div class="board">
		<p><a href="/board/{board.id}" class="primary">{board.name}</a></p>
		<p class="stealth"><b>{board.private ? 'private' : 'public'}</b></p>
		<p class="stealth"><b>{board.participants}</b> participants</p>
		<p class="stealth"><b>{board.points}</b> points</p>
	</div>
{/if}

<style scoped>
	:global(.modal-button-wrapper > button),
	:global(.modal-button-wrapper > button):hover,
	:global(.modal-button-wrapper *) {
		background: none;
	}

	:global(.modal-button-wrapper > button):hover > p {
		color: var(--text-color);
	}

	.primary {
		color: var(--main-color);
	}

	.board {
		border: 0.1em solid var(--sub-color);
		border-radius: 7px;
		margin: auto 0;
		padding: 1em;
		width: 250px;
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.plus {
		font-size: 4rem;
		color: var(--sub-color);
		background: none;
	}

	.plus:hover {
		color: var(--bg-color);
	}
</style>
