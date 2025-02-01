import type { PageServerLoad, Actions } from './$types';
import { type UUID } from "node:crypto";
import { addUser, doCreateClient, incrementUser, updateUser } from '$/lib/server/redis';

export const load: PageServerLoad = async ({ locals }) => {
    await doCreateClient();
}

export const actions = {
    addUser: async (event) => {
        const formData = await event.request.formData();
        const user = formData.get("user");
        const board = formData.get("board");
        const points = formData.get("points");
        await addUser(user as UUID, board as UUID, points as unknown as number);
    },
    updateUser: async (event) => {
        const formData = await event.request.formData();
        const user = formData.get("user");
        const board = formData.get("board");
        const points = formData.get("points");
        await updateUser(user as UUID, board as UUID, points as unknown as number);
    },
    incrementUser: async (event) => {
        const formData = await event.request.formData();
        const user = formData.get("user");
        const board = formData.get("board");
        const change = formData.get("points");
        await incrementUser(user as UUID, board as UUID, change as unknown as number);
    },
} satisfies Actions;