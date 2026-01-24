import { Server as SocketIOServer, Socket } from 'socket.io';
import { sub as baseSub } from './redis';

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

        const redisSub = baseSub.duplicate();
        await redisSub.subscribe(channel);

        const handler = (chan: string, message: string) => {
            if (chan !== channel) return;
            socket.emit('message', { type: 'message', data: message });
        };
        redisSub.on('message', handler);

        const cleanup = () => {
            redisSub.off('message', handler);
            redisSub.unsubscribe(channel).catch(console.error);
            redisSub.quit().catch(console.error);
        };

        socket.on('disconnect', cleanup);
        socket.on('error', cleanup);
    });
}