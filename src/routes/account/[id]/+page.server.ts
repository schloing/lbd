import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { redirector } from "$/lib/server/redirector";
import { prisma } from "$/prisma";

async function fetchUserBoards(id: string) {
    const queryUser = await prisma.user.findUnique({
        where: { id: id },
        select: { Board: true },
    });

    return queryUser;
}

export const load: PageServerLoad = async ({ parent }) => {
    const { session } = await parent();
    if (!session?.user) return;

    return {
        boards: await fetchUserBoards(session.user.id)
    };
};