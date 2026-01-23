import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { sub, addUser, getUsersWithinRanks } from '$/lib/server/redis';
import { fail } from '@sveltejs/kit';
import { db } from '$/index';
import { boards } from '$/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RankUser } from '$/lib/client/rankuser';
import { users } from '$/lib/db/auth-schema';
import { getBoardById } from '$/lib/server/board';

export const load: PageServerLoad = async ({ params, parent, locals }) => {
	const board = await getBoardById(params.id);

	if (!board) {
		return error(404);
	}

	const rankings: any = (await getUsersWithinRanks(board.id, 0, 50)) ?? [];
	let cleanedRankings: (RankUser & { score: number })[] = [];

	if (rankings.length > 0 && rankings.length % 2 == 0) {
		for (let i = 0; i < rankings.length; i += 2) {
			let user: RankUser & { score: number };

			try {
				user = {
					...JSON.parse(rankings[i]),
					score: Number(rankings[i + 1])
				};
			}
			catch (e) {
				user = {
					name: rankings[i],
					board: params.id,
					accountAssociated: false,
					score: Number(rankings[i + 1]),
				};
			}

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

		const rankUser: RankUser = {
			name: formData.get('name') as string,
			username: formData.get('username') as string,
			uuid: "",
			board: params.id,
			accountAssociated: formData.get('accountAssociated') === "on",
		};

		const score = parseInt(formData.get('score') as string);

		if (rankUser.accountAssociated) {
			const [user] = await db.select({ id: users.id }).from(users).where(eq(users.username, rankUser.username as string));

			if (!user) {
				return fail(400, { message: 'username not found' });
			}

			rankUser.uuid = user.id;
		}

		if (rankUser.name.length <= 0 || rankUser.name.length > 25) {
			return fail(400, { message: 'name is too long or too short' });
		}

		let success = addUser(rankUser, score, board.id);

		if (!success) {
			return fail(512, { message: 'user name not unique' });
		}

		return {
			success: true,
			message: 'user added'
		};
	},
	updateBoard: async ({ locals, request, params }) => {
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
		const name = formData.get('name') as string;
		const isPrivate = (formData.get('access') as string) === "private";

		await db.update(boards).set({ name, private: isPrivate });

		return {
			success: true,
			message: 'board updated'
		};
	}
};
