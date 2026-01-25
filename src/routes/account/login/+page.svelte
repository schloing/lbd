<script lang="ts">
	import { authClient } from '$/lib/client/auth';

	export const providers = [
		['Google', '/google-logo-icon.svg'],
		['Discord', '/discord-logo-icon.svg']
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
			<input type="hidden" name="provider" value={provider} />
			<button class="signInButton" onclick={async () => OAuthSignIn(provider.toLowerCase())}>
				<img src={icon} alt={provider} width="30px" height="30px" class="icon" />
				Sign in with {provider}
			</button>
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
		border: 1px solid rgba(0, 0, 0, 0);
		width: min(25em, 90%);
	}

	.signInButton:hover {
		background: var(--bg-color);
		color: var(--text-color);
		border: 1px solid var(--sub-color);
		/* TODO */
	}

	.icon {
		width: 30px;
		padding-right: 8px;
		vertical-align: middle;
		display: inline-block;
	}
</style>
