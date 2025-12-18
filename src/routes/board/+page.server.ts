import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$/index';
import { boards } from '$/lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { user } = await parent();

	if (!user) {
		return redirect(302, `/account/login`);
	}

	const dbBoards = await db.select().from(boards).where(eq(boards.ownerId, user.id));

	return { boards: dbBoards };
};

enum BoardAccessControl {
	Public = 'public',
	Private = 'private',
};

interface FormError {
	name: string;
	error: string;
};

export const actions: Actions = {
	createBoard: async ({ locals, request }) => {
		if (!locals.user) {
			return fail(401);
		}

		const formData = await request.formData();

		const [boardName, maxParticipants, access, allowAnonymous] = [
			formData.get('boardName') as string,
			parseInt(formData.get('maxParticipants') as string),
			formData.get('access') as BoardAccessControl,
			formData.get('allowAnonymous') === 'on',
		];

		let errors: FormError[] = [];

		if (boardName.length < 3) {
			errors.push({
				name: 'boardName',
				error: `name length too short (${boardName.length}, min 3)`,
			});
		}

		if (boardName.length > 25) {
			errors.push({
				name: 'boardName',
				error: `name length too long (${boardName.length} / 25)`
			});
		}

		if (maxParticipants <= 0 || Number.isNaN(maxParticipants)) {
			errors.push({
				name: 'maxParticipants',
				error: `max participants must be more than zero, mate (${maxParticipants})`
			});
		}

		if (errors.length > 0) {
			return { success: false, message: JSON.stringify(errors) };
		}

		try {
			await db.insert(boards).values({
				id: crypto.randomUUID(),
				name: boardName as string,
				ownerId: locals.user.id as string,
				private: (access === "private") as boolean,
			});
		}
		catch (e) {
			return { success: false };
		}

		return { success: true };
	}
};
