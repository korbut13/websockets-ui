import { WebSocket } from "ws";

import { dataBaseRooms } from "../../dataBase/dataBaseRooms";
import { connections } from "../../dataBase/dataBaseConnections";
import { Request, Room, Player } from "../../utils/types";


export const addUserToRoomHandler = (ws: WebSocket, req: Request, connectionId: string) => {
  const reqData: { indexRoom: number } = JSON.parse(req.data);
  const indexRoom: number = reqData.indexRoom;

  const currentRoom = dataBaseRooms.find((room) => room.roomId === indexRoom) as Room;

  const idUser = connections.get(connectionId);

  const isPlayerInCurrentRoom = currentRoom.roomUsers.find((el) => el.index === idUser!.idPlayer);

  if (isPlayerInCurrentRoom === undefined) {
    const newPlayer = { ...connections.get(connectionId) } as Player;
    currentRoom.roomUsers.push({ name: newPlayer.name, index: newPlayer.idPlayer });

    const dataGame = {
      idGame: indexRoom,
      idPlayer: 1
    }

    const resp = {
      type: "create_game",
      data: JSON.stringify(dataGame),
      id: 0,
    }
    ws.send(JSON.stringify(resp));
  } else {
    const dataGame = {
      idGame: indexRoom,
      idPlayer: 0
    }

    const resp = {
      type: "create_game",
      data: JSON.stringify(dataGame),
      id: 0,
    }
    ws.send(JSON.stringify(resp));
  }
}
