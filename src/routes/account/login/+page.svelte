<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';

	export const providers = [
		['google', '/google-logo-icon.svg'],
		['discord', '/discord-logo-icon.svg']
	];
</script>

<div class="layout">
	<h1>welcome back</h1>
	{#each providers as [provider, icon]}
		<div class="signInAction">
			<SignIn {provider} signInPage="account/login" redirectTo="?">
				<div slot="submitButton" class="signInButton">
					<img src={icon} alt={provider} width="30px" height="30px" class="icon" /> sign in with {provider}
				</div>
			</SignIn>
		</div>
	{/each}
</div>

<style>
	.signInAction {
		text-align: center;
	}

	.icon {
		width: 30px;
		padding-right: 8px;
		vertical-align: middle;
		display: inline-block;
	}
</style>
