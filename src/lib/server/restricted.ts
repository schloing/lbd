import { redirect } from '@sveltejs/kit';

export async function accountRequired({ locals, parent }) {
	const { session } = await parent();

	if (!session?.user) {
		return redirect(302, `/account/login`);
	}
}

export async function noAccountRequired({ locals, parent }) {
	const { session } = await parent();

	if (session?.user) {
		return redirect(302, `/account/${session?.user.id}`);
	}
}
