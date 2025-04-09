<script lang="ts">
	import { SignIn } from "@auth/sveltekit/components";
</script>

<div>
	<h1>login/register</h1>
	<SignIn provider="google" signInPage="account/login" />
	<SignIn provider="discord" signInPage="account/login" />
</div>