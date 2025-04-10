import { signIn, signOut } from '$/auth';
import type { Actions } from './$types';
export const actions: Actions = { default: signIn };
import { noAccountRequired } from '$/lib/server/restricted';
export const load = noAccountRequired;
