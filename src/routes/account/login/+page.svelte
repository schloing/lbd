<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<section>
	<form method="post" action="?/login" class="vertical-form" use:enhance>
		<h1>login/register</h1>
		<input name="username" placeholder="username" />
		<input type="password" name="password" placeholder="password" />
		<button>login</button>
		<button formaction="?/register">register</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</section>