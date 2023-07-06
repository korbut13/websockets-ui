// import { WebSocketServer } from 'ws';

// export const webSocketServer = new WebSocketServer({ port: 3000 });

// webSocketServer.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     console.log(`Получено сообщение от клиента: ${message}`);

//     webSocketServer.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message)
//       }
//     })

//   })
// })
