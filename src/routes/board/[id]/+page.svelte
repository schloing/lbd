<script lang="ts">
	import Rankings from '$/components/Rankings.svelte';
	import { page } from '$app/state';
	const id: string = page.params.id;
</script>

<Rankings />
