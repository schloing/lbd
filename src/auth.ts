import { SvelteKitAuth, type DefaultSession, type Profile, type User } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/sveltekit/providers/google';
import Discord from '@auth/sveltekit/providers/discord';
import { db } from '$/index';
import type { OAuthConfig, OAuthUserConfig, ProfileCallback, Provider } from '@auth/core/providers';
import type { TokenSet } from '@auth/core/types';

declare module '@auth/sveltekit' {
	interface Session {
		user: DefaultSession['user'];
	}
}

const OAuthProfileCallback: ProfileCallback<Profile> = (profile: Profile, tokens: TokenSet) => {
	return {
		...profile,
		role: profile.role ?? "new",
	} as User;
}

type OAuthProvider<T extends Profile> = (options: OAuthUserConfig<T>) => OAuthConfig<T>;

const providers: OAuthProvider<Profile>[] = [
	Google as OAuthProvider<Profile>,
	Discord as OAuthProvider<Profile>
];

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		Google, Discord
	],
	callbacks: {
		async session({ session, user }) {
			return {
				user: session.user,
				expires: session.expires
			};
		}
	}
});
