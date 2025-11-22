<script lang="ts">
	import { authClient } from '$/lib/client/auth';

	export const providers = [
		['google', '/google-logo-icon.svg'],
		['discord', '/discord-logo-icon.svg']
	];

	async function OAuthSignIn(provider: string) {
		await authClient.signIn.social({
			provider,
			callbackURL: '/account/',
			newUserCallbackURL: '/account/new',
			disableRedirect: false
		});
	}
</script>

<section>
	<h1>welcome</h1>
	{#each providers as [provider, icon]}
		<div class="provider">
			<img src={icon} alt={provider} width="30px" height="30px" class="icon" />
			<input type="hidden" name="provider" value={provider} />
			<button class="signInButton" onclick={async () => OAuthSignIn(provider)}
				>sign in with {provider}</button
			>
		</div>
	{/each}
</section>

<style>
	.provider {
		text-align: center;
	}

	.signInButton {
		background: var(--sub-color);
		padding: 1em;
		margin: 0.5em;
		border-radius: 0.2em;
	}

	.signInButton:hover {
		background: red;
		/* TODO */
	}

	.icon {
		width: 30px;
		padding-right: 8px;
		vertical-align: middle;
		display: inline-block;
	}
</style>
