import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/sveltekit/providers/google';
import Discord from '@auth/sveltekit/providers/discord';
import { db } from '$/index';

declare module '@auth/sveltekit' {
	interface Session {
		user: DefaultSession['user'];
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [Google, Discord],
	callbacks: {
		async session({ session, user }) {
			const schemaUser = user;

			return {
				user: {
					id: schemaUser.id,
					name: schemaUser.name,
					email: schemaUser.email,
					image: schemaUser.image,
				},
				expires: session.expires
			};
		}
	}
});
