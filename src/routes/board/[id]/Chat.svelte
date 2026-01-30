<script lang="ts">
	import type { Instruction } from '$/lib/client/board';

	const { messages = $bindable() }: { messages: Instruction[] } = $props();
</script>

<div>
	{#each messages as message}
		<p>
			<span class="operation">{message.operation}</span>
            <span>
                {#if !message.user.user.accountAssociated}
                    <span class="user">{message.user.user.name}</span>
                {:else}
                    <a href="/account/{message.user.user.uuid}" class="user">{message.user.user.username}</a>
                {/if}
            </span>
            <span class="points">({message.user.score})</span>
		</p>
	{/each}
</div>

<style scoped>
    .operation {
        color: var(--text-color);
    }

    .user {
        color: var(--main-color) !important;
    }

    .points {
        color: var(--sub-color);
    }
</style>