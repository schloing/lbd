import type { PageServerLoad } from './$types';
import { db } from '$/index';
import { users } from '$/lib/db/auth-schema';
import { and, eq } from 'drizzle-orm';
import { boards } from '$/lib/db/schema';
import { error } from '@sveltejs/kit';

async function fetchUser(id: string) {
	const [queryUser] = await db.select().from(users).where(eq(users.id, id));
	return queryUser;
}

export const load: PageServerLoad = async ({ parent, params }) => {
	const queryUser = await fetchUser(params.id);

	if (!queryUser) {
		return error(404);
	}

	const { user } = await parent();
	const authorized = params.id == user?.id;

	const publicUserBoards = async () => {
		return await db.select().from(boards).where(
			and(
				eq(boards.ownerId, params.id),
				eq(boards.private, false)
			)
		);
	};

	const privateUserBoards = async () => {
		if (authorized) {
			return await db.select().from(boards).where(
				and(
					eq(boards.ownerId, params.id),
					eq(boards.private, true)
				)
			);
		}
	};

	return {
		queryUser,
		publicBoards: publicUserBoards(),
		privateBoards: privateUserBoards(),
		authorized,
	};
};
