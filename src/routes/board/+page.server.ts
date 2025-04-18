import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$/prisma';

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
		let errors: string[] = [];

		// FIXME: more validations?

		if (boardName.length < 3)
			errors.push(`name length too short (${boardName.length}, min 3)`);
		
		if (boardName.length > 25)
			errors.push(`name length too long (${boardName.length} / 25)`);

		if (errors.length > 0)
			return fail(401, { success: false, message: errors.join("\n") });
		
		const board = await prisma.board.create({
			data: {
				name: boardName,
				ownerId: session.user.id,
				private: isPrivate == "on",
			}
		});

		return { success: true };
	}
};
