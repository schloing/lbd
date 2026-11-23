import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSocketRedis } from '../src/lib/server/websocket.js';

const server = createServer();

const io = new SocketIOServer(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

setupSocketRedis({ io });

export default server;
