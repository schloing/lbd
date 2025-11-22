import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from '$lib/db/auth-schema';
import { db } from "../../index";
import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_DISCORD_ID, AUTH_DISCORD_SECRET } from '$env/static/private';
import { generateUsername } from "unique-username-generator";
import { anonymous } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
		usePlural: true,
	}),
	plugins: [
		anonymous({
			generateName: () => generateUsername()
		})
	],
	socialProviders: {
		google: {
			clientId: AUTH_GOOGLE_ID as string,
			clientSecret: AUTH_GOOGLE_SECRET as string,
		},
		discord: {
			clientId: AUTH_DISCORD_ID as string,
			clientSecret: AUTH_DISCORD_SECRET as string,
		},
	},
	user: {
		deleteUser: {
			enabled: true
		},
		additionalFields: {
			username: {
				type: "string",
				required: true,
				unique: true,
				defaultValue: generateUsername
			}
		},
	}
});