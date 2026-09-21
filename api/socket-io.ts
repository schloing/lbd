import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSocketRedis } from '../src/lib/server/websocket';

const PORT = process.env.PORT || 3000;

const server = createServer();

const io = new SocketIOServer(server, {
    path: '/socket.io',
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

setupSocketRedis({ io });

export default server;