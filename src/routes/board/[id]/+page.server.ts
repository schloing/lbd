import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { sub, addUser, getUsersWithinRanks } from '$/lib/server/redis';
import { fail } from '@sveltejs/kit';
import { db } from '$/index';
import { boards } from '$/lib/db/schema';
import { eq } from 'drizzle-orm';

async function getBoardById(boardId: string) {
	const board = await db.select().from(boards).where(eq(boards.id, boardId));
	return board.length > 0 ? board[0] : null;
}

export const load: PageServerLoad = async ({ params, parent }) => {
	const { session } = await parent();
	const board = await getBoardById(params.id);

	if (!board) {
		return redirect(404, '/board');
	}

	const rankings = (await getUsersWithinRanks(board.id, 0, 50)) ?? [];
	const cleanedRankings = [];

	if (rankings.length > 0 || rankings.length % 2 == 0) {
		for (let i = 0; i < rankings.length; i += 2)
			cleanedRankings.push({ username: rankings[i], score: rankings[i + 1] });
	}

	sub.subscribe(board.id, (err, count) => {
		if (err) {
			return error(512);
		}
	});

	return {
		authorized: session?.user?.id == board.ownerId,
		board,
		rankings: cleanedRankings
	};
};

export const actions: Actions = {
	addUser: async ({ locals, request, params }) => {
		const session = await locals.auth();

		if (!session?.user) {
			return fail(401, { message: 'not logged in.' });
		}

		const board = await getBoardById(params.id);

		if (!board) {
			return fail(404, { message: 'board not found.' });
		}

		if (session.user.id !== board?.ownerId) {
			return fail(403, { message: "you don't have permission to do this." });
		}

		const formData = await request.formData();
		const [username, score] = [
			formData.get('username') as string,
			parseInt(formData.get('score') as string)
		];

		if (username.length < 0 || username.length > 25) {
			return fail(400, { message: 'username is too long or too short.' });
		}

		let success = addUser(username, board.id, score);

		if (!success) {
			return fail(512, { message: 'failed to add user. try again later.' });
		}

		return {
			success: true,
			message: 'user added'
		};
	}
};
