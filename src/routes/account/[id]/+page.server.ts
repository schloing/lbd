import type { PageServerLoad } from './$types';
import { db } from '$/index';
import { users } from '$/lib/db/auth-schema';
import { and, eq } from 'drizzle-orm';
import { boards } from '$/lib/db/schema';

async function fetchUser(id: string) {
	const [queryUser] = await db.select().from(users).where(eq(users.id, id));
	return queryUser;
}

export const load: PageServerLoad = async ({ parent, params }) => {
	const { user } = await parent();

	const queryUser = await fetchUser(params.id);
	const [publicUserBoards, privateUserBoards] = await Promise.all([
		db.select().from(boards).where(
			and(
				eq(boards.ownerId, params.id),
				eq(boards.private, false)
			)
		),
		db.select().from(boards).where(
			and(
				eq(boards.ownerId, params.id),
				eq(boards.private, true)
			)
		),
	]);

	const authorized = params.id == user?.id;

	return {
		user: queryUser,
		boards: [...publicUserBoards, ...(authorized ? privateUserBoards : [])],
		authorized,
	};
};
