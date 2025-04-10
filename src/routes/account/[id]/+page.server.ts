import type { PageServerLoad } from './$types';
import { prisma } from '$/prisma';

async function fetchUser(id: string) {
	const queryUser = await prisma.user.findUnique({
		where: { id: id },
		select: {
			id: true,
			name: true,
			username: true,
			image: true,
			createdAt: true,
			updatedAt: true,
			Board: true
		}
	});

	return queryUser;
}

export const load: PageServerLoad = async ({ parent, params }) => {
	const { session } = await parent();

	return {
		user: await fetchUser(params.id),
		authorized: params.id == session?.user?.id
	};
};
