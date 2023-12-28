import { httpServer } from "./src/http_server";
import { WebSocketServer } from 'ws';
import { eventHandler } from "./src/webSocket_server/eventHandler";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

export const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', eventHandler)
console.log(`Start WebSocket server on the 3000 port!`)
