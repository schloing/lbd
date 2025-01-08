<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<form method="post" action="?/login" class="vertical-form" use:enhance>
	<h1>login/register</h1>
	<div>
		<label for="display">display name</label>
		<input type="text" name="display" placeholder="display name" />
	</div>
	<div>
		<label for="username">username</label>
		<input type="text" name="username" placeholder="username" />
	</div>
	<div>
		<label for="password">password</label>
		<input type="password" name="password" placeholder="password" />
	</div>
	<button>login</button>
	<button formaction="?/register">register</button>
	<p style="color: red">{form?.message ?? ''}</p>
</form>