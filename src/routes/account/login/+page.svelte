<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	export const providers = ['google', 'discord'];
</script>

<div>
	<img src="/leaderbored.svg" alt="logo" width="200" height="200" />
	{#each providers as provider}
		<div class="signInAction">
			<SignIn {provider} signInPage="account/login" redirectTo="?">
				<div slot="submitButton">sign in with {provider}</div>
			</SignIn>
		</div>
	{/each}
</div>

<style>
	div {
		align-self: center;
		height: fit-content;
	}

	.signInAction {
		text-align: center;
	}

	.signInAction :global(button) {
		border-radius: 5px;
	}
</style>
