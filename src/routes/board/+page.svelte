<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutServerData } from './[id]/$types';
	let { data }: { data: LayoutServerData } = $props();
</script>

<section class="center-children">
	<form method="post" action="?/createBoard" use:enhance>
		<label>
			name
			<input name="boardName" />
		</label>
		<label>
			private?
			<input name="isPrivate" type="checkbox" />
		</label>
		({data?.user?.username})
		<button>create</button>
	</form>
</section>
