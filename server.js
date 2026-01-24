import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSocketRedis } from './src/lib/server/websocket';
import { handler } from './build/handler.js';

const PORT = process.env.PORT || 5173;

const httpServer = createServer(handler);
const io = new SocketIOServer(httpServer, {
  path: '/socket.io',
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

setupSocketRedis({ io });

httpServer.listen(PORT, () => {
  console.log(`server with socket.io listening on http://localhost:${PORT}`);
});
