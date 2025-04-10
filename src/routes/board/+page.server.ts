import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { prisma } from '$/prisma';
import { invalidate } from '$app/navigation';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { session } = await parent();

	if (!session?.user) {
		return redirect(302, `/account/login`);
	}

	const boards = await prisma.board.findMany({
		where: { ownerId: session?.user.id },
		select: { id: true, ownerId: true, name: true, participants: true, points: true, createdAt: true, updatedAt: true }
	});

	return { boards: boards };
};

export const actions: Actions = {
	createBoard: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user) {
			return fail(401);
		}

		const formData = await request.formData();
		const [boardName, isPrivate] = [formData.get("boardName") as string, formData.get("isPrivate") as string];

		const board = await prisma.board.create({
			data: {
				name: boardName,
				ownerId: session.user.id,
				private: isPrivate == "on",
			}
		});

		return invalidate("board");
	}
};
