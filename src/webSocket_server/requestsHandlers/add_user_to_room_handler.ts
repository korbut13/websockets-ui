//import { WebSocket } from "ws";

import { dataBaseRooms } from "../../dataBase/dataBaseRooms";
import { connections } from "../../dataBase/dataBaseConnections";
import { isPlayerInCurrentRoom } from "../../utils/isPlayerInCurrentRoom";
import { Request, Room, Player } from "../../utils/types";


export const addUserToRoomHandler = (req: Request, connectionId: string) => {
  const reqData: { indexRoom: number } = JSON.parse(req.data);
  const indexRoom: number = reqData.indexRoom;

  const currentRoom = dataBaseRooms.find((room) => room.roomId === indexRoom) as Room;

  const idUser = connections.get(connectionId)!.idPlayer;

  let idPlayer: number;

  if (!isPlayerInCurrentRoom(currentRoom, idUser)) {
    const newPlayer = { ...connections.get(connectionId) } as Player;
    currentRoom.roomUsers.push({ name: newPlayer.name, index: newPlayer.idPlayer });
    idPlayer = 1;
  } else {
    idPlayer = 0;
  }
  const dataGame = {
    idGame: indexRoom,
    idPlayer: idPlayer
  };

  const resp = {
    type: "create_game",
    data: JSON.stringify(dataGame),
    id: 0,
  }
  currentRoom.roomUsers.forEach((player) => {
    if (connections.has(player.index)) {
      connections.get(player.index)!.ws.send(JSON.stringify(resp))
    }
  })
}
