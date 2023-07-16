import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseRooms } from "../../dataBase/dataBaseRooms";
import { Player, Room } from "../../utils/types";
import { updateRoom } from "../game_process/update_room";

export const createRoomHandler = (connectionId: string) => {
  const user = { ...connections.get(connectionId) } as Player;

  const newRoom = {
    roomId: dataBaseRooms.length,
    roomUsers: [{ name: user!.name, index: user!.idPlayer, ships: [], }]
  };

  dataBaseRooms.push(newRoom as Room);
  updateRoom();
}
