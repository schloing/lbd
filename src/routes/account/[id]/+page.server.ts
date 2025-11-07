import type { PageServerLoad } from './$types';
import { db } from '$/index';
import { users } from '$/lib/db/schema';
import { eq } from 'drizzle-orm';

async function fetchUser(id: string) {
	const queryUser = await db.select().from(users).where(eq(users.id, id));

	return queryUser.length > 0 ? queryUser[0] : null;
}

export const load: PageServerLoad = async ({ parent, params }) => {
	const { session } = await parent();

	return {
		user: await fetchUser(params.id),
		authorized: params.id == session?.user?.id
	};
};
