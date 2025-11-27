<script lang="ts">
	import ModalButton from '$/components/ModalButton.svelte';
	import AddBoardModal from '$/routes/board/AddBoardModal.svelte';
	import Modal from 'svelte-simple-modal';

	const { user, board } = $props();
</script>

{#if board == null}
	<div class="board">
		<Modal classWindow="dark-box">
			<div class="modal-button-wrapper">
				<ModalButton modal={AddBoardModal} modalProps={{ user }}><p class="plus">+</p></ModalButton>
			</div>
		</Modal>
	</div>
{:else}
	<div class="board">
		<p><a href="/board/{board.id}" class="primary">{board.name}</a></p>
		<p class="darkstealth"><b>{board.participants}</b> participants</p>
		<p class="darkstealth"><b>{board.points}</b> points</p>
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
	}
</style>
