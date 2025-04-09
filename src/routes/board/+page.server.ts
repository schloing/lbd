import { fail, redirect } from "@sveltejs/kit";
import { redirector } from "$/lib/server/redirector";
import type { Actions, PageServerLoad } from "./$types";
import type { RequestEvent } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

export const load: PageServerLoad = async ({ locals, setHeaders }) => {
	if (!locals.user) {
		return redirector(302, `/account/login`, "login to your account first!");
	}

	const boards = await locals.DB.select()
		.from(table.boards)
		.where(eq(table.boards.owner, locals.user.id));

	return { boards: boards };
};

export const actions: Actions = {
	createBoard: async (event: RequestEvent) => {
		if (!event.locals.session) {
			return fail(401);
		}

		const formData = await event.request.formData();
		const boardName = formData.get("boardName");
		// const isPrivate = formData.get("isPrivate");

		const boardId = randomUUID();
		try {
			await event.locals.DB.insert(table.boards).values({
				id: boardId,
				name: boardName,
				owner: event.locals.user.id
			});
		} catch (e) {
			console.error(e);
			return fail(500, { message: "An error has occurred" });
		}

		return redirect(303, `/board/${boardId}`);
	}
};
