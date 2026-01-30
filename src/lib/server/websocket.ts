import { Server as SocketIOServer, Socket } from 'socket.io';
import { addUser, sub as baseSub, removeUser, updateUser } from './redis';
import { BoardOperation, ZodInstruction, type Instruction } from '../client/board';

export interface SocketRedisOptions {
    io: SocketIOServer;
    getChannel?: (socket: Socket) => string | undefined;
}

export function setupSocketRedis({ io, getChannel }: SocketRedisOptions) {
    io.on('connection', async (socket) => {
        const channel = getChannel?.(socket) ?? (socket.handshake.query.id as string);
        if (!channel) {
            socket.disconnect(true);
            return;
        }

        socket.emit('connected', { type: 'connected' });

        const redisSub = (await baseSub()).duplicate();
        await redisSub.subscribe(channel);

        const handler = (chan: string, message: string) => {
            if (chan !== channel) {
                return;
            }
            socket.emit('message', { type: 'message', data: message });
        };

        redisSub.on('message', handler);

        const cleanup = () => {
            redisSub.off('message', handler);
            redisSub.unsubscribe(channel).catch(console.error);
            redisSub.quit().catch(console.error);
        };

        socket.on('message', async (m: Instruction) => {
            const parse = ZodInstruction.safeParse(m);

            if (!parse.success) {
                return;
            }

            const { user, score } = m.user;

            // FIXME see if operation was successful
            switch (m.operation) {
                case BoardOperation.AddPlayer:
                    await addUser(user, score, user.board);
                    break;

                case BoardOperation.UpdatePlayer:
                    await updateUser(user, score, user.board);
                    break;

                case BoardOperation.RemovePlayer:
                    await removeUser(user, user.board);
                    break;
            }
        })

        socket.on('disconnect', cleanup);
        socket.on('error', cleanup);
    });
}