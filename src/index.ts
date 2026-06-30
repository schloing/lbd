import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(
    process.env.NODE_ENV === 'production'
        ? process.env.AUTH_DRIZZLE_URL_PROD || process.env.AUTH_DRIZZLE_URL!
        : process.env.AUTH_DRIZZLE_URL!
);