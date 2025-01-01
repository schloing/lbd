<script lang="ts">
	import { userStore } from '$/stores/user';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	const user = $userStore;
	let { form }: { form: ActionData } = $props();
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
		<p style="color: red">{form?.message ?? ''}</p>
		<button>create</button>
	</form>
</section>
