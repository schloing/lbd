import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { sub, addUser, getUsersWithinRanks } from '$/lib/server/redis';
import { fail } from '@sveltejs/kit';
import { db } from '$/index';
import { boards } from '$/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RankUser } from '$/lib/client/rankuser';
import { users } from '$/lib/db/auth-schema';

async function getBoardById(boardId: string) {
	const board = await db.select().from(boards).where(eq(boards.id, boardId));
	return board.length > 0 ? board[0] : null;
}

export const load: PageServerLoad = async ({ params, parent, locals }) => {
	const board = await getBoardById(params.id);

	if (!board) {
		return error(404);
	}

	const rankings = (await getUsersWithinRanks(board.id, 0, 50)) ?? [];
	const cleanedRankings = [];

	if (rankings.length > 0 || rankings.length % 2 == 0) {
		for (let i = 0; i < rankings.length; i += 2) {
			let user: RankUser;

			try {
				user = JSON.parse(rankings[i]) as RankUser;
			}
			catch (e) {
				user = {
					name: rankings[i],
					score: 0,
					accountAssociated: false,
				};
			}

			user.score = parseInt(rankings[i + 1]);

			cleanedRankings.push(user);
		}
	}

	sub.subscribe(board.id, (err, count) => {
		if (err) {
			return error(512);
		}
	});

	return {
		authorized: locals.user?.id == board.ownerId,
		board,
		rankings: cleanedRankings
	};
};

export const actions: Actions = {
	addUser: async ({ locals, request, params }) => {
		if (!locals.user) {
			return fail(401, { message: 'not logged in.' });
		}

		const board = await getBoardById(params.id);

		if (!board) {
			return fail(404, { message: 'board not found.' });
		}

		if (locals.user.id !== board?.ownerId) {
			return fail(403, { message: "you don't have permission to do this." });
		}

		const formData = await request.formData();

		const [name, username, score, accountAssociated] = [
			formData.get('name') as string ?? "",
			formData.get('username') as string ?? "",
			parseInt(formData.get('score') as string ?? ""),
			formData.get('accountAssociated') === "checked"
		];

		const rankUser: RankUser = {
			name: formData.get('name') as string ?? "",
			username: formData.get('username') as string ?? "",
			uuid: "",
			score: parseInt(formData.get('score') as string ?? ""),
			accountAssociated: formData.get('accountAssociated') === "checked",
		};

		if (accountAssociated) {
			const [user] = await db.select({ id: users.id }).from(users).where(eq(users.username, username));

			if (!user) {
				return fail(400, { message: 'username not found' } );
			}

			rankUser.uuid = user.id;
		}

		if (name.length <= 0 || name.length > 25) {
			return fail(400, { message: 'name is too long or too short' });
		}

		let success = addUser(rankUser, board.id);

		if (!success) {
			return fail(512, { message: 'user name not unique' });
		}

		return {
			success: true,
			message: 'user added'
		};
	}
};
