<script lang="ts">
	import BoardGallery from '$/components/BoardGallery.svelte';

	const { data } = $props();
	const { user } = data;
	const boards = $derived(data.boards);
</script>

<BoardGallery {boards} {user} />