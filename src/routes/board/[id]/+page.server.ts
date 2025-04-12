import { prisma } from '$/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { addUser, getUsersWithinRanks } from '$/lib/server/redis';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { getBoardById } from '$/lib/server/db';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { session } = await parent();
	const board = await getBoardById(params.id);

	if (!board) return redirect(404, "/board");

	const rankings = await getUsersWithinRanks(board.id, 0, 50) ?? [];
	const cleanedRankings = [];

	if (rankings.length > 0 || rankings.length % 2 == 0) {
		for (let i = 0; i < rankings.length; i += 2)
			cleanedRankings.push({ username: rankings[i], score: rankings[i + 1]});
	}

	return {
		authorized: session?.user.id == board.owner.id,
		board,
		rankings: cleanedRankings
	};
};

export const actions: Actions = {
	addUser: async ({ locals, request, params }) => {
		const session = await locals.auth();

		if (!session?.user) {
			return fail(401, { message: "not logged in." });
		}

		const board = await getBoardById(params.id);

		if (!board) {
			return fail(404, { message: "board not found." });
		}

		if (session.user.id !== board?.owner.id) {
			return fail(403, { message: "you don't have permission to do this." });
		}

		const formData = await request.formData();
		const [username, score] = [formData.get("username") as string, parseInt(formData.get("score") as string)];

		if (username.length < 0 || username.length > 25) {
			return fail(400, { message: "username is too long or too short." });
		}

		let success = addUser(username, board.id, score);

		if (!success) {
			return fail(512, { message: "failed to add user. try again later." });
		}

		return {
			success: true,
			message: "user added"
		};
	}
};