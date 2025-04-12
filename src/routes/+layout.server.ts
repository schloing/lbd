import type { LayoutServerLoad } from './$types';
import { userStore } from '$/stores/user';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth()
	};
};
