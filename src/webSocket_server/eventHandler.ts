import WebSocket from "ws";
import { randomBytes } from "crypto";

import { regHandler } from "./requestsHandlers/reg_handler";
import { createRoomHandler } from "./requestsHandlers/create_room_handler";
import { addUserToRoomHandler } from "./requestsHandlers/add_user_to_room_handler";
import { addShipsHandler } from "./requestsHandlers/add_ships_handler";

import { Request } from "../utils/types";

export const eventHandler = (ws: WebSocket) => {
  const connectionId = randomBytes(16).toString('hex');

  ws.on('message', (message: string) => {
    try {
      const req: Request = JSON.parse(message);
      const typeOfReq = req.type;

      //console.log(2222, req)

      switch (typeOfReq) {
        case 'reg':
          regHandler(ws, req, connectionId);
          break;
        case 'create_room':
          createRoomHandler(connectionId)
          break;
        case 'add_user_to_room':
          addUserToRoomHandler(req, connectionId)
          break;
        case 'add_ships':
          addShipsHandler(req, connectionId);
          break
      }

    } catch (err) {
      console.log(555, err)
    }
  })
}
