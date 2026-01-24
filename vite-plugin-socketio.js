import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSocketRedis } from './src/lib/server/websocket';

export default function socketioPlugin() {
  let httpServer;
  return {
    name: 'vite-plugin-socketio',
    configureServer(server) {
      httpServer = server.httpServer || server.server;
      const io = new SocketIOServer(httpServer, {
        path: '/socket.io',
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        }
      });
      setupSocketRedis({ io });
    }
  };
}
