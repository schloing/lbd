import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/db/schema.ts',
	out: './drizzle/migrations/dev',
	dbCredentials: {
		url: process.env.AUTH_DRIZZLE_URL as string
	}
});
