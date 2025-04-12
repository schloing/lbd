import { prisma } from "$/prisma";

export async function getBoardById(id: string) {
    const board = await prisma.board.findUnique({
        where: { id: id },
        select: {
            id: true,
            name: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    image: true,
                }
            },
            participants: true,
            points: true,
            createdAt: true,
            updatedAt: true,
            private: true,
        }
    });

    return board;
}