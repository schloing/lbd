<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<section>
	<h1>Login/Register</h1>
	<form method="post" action="?/login" use:enhance>
		<label>
			Username
			<input name="username" />
		</label>
		<label>
			Password
			<input type="password" name="password" />
		</label>
		<button>login</button>
		<button formaction="?/register">register</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</section>