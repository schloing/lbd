import { db } from '$/index';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { users } from '$/lib/db/auth-schema';
import { DrizzleQueryError, eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, `/account/login`);
	}
};


export const actions = {
	updateUsername: async ({ locals, request }) => {
		if (!locals.user) {
			return { sucess: false, message: "no user" };
		}

		const data = await request.formData();
		const username = data.get('username') as string;

		if (!username || username.length < 3) {
			return { success: false, message: "invalid username" };
		}

		try {
			await db.update(users)
				.set({ username: username as string })
				.where(eq(users.id, locals.user.id));
		}
		catch (e) {
			if (e instanceof DatabaseError || e instanceof DrizzleQueryError) {
				// username is probably not unique?
				return { success: false, message: "username not unique" };
			}

			return { success: false, message: "unknown error occurred. try again later." };
		}

		return { success: true };
	}
} satisfies Actions;