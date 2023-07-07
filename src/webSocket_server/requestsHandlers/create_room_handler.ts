import { wss } from "../../../index";

import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseRooms } from "../../dataBase/dataBaseRooms";
import { Player, Room } from "../../utils/types";

export const createRoomHandler = (connectionId: string) => {
  const user = { ...connections.get(connectionId) } as Player;

  const newRoom = {
    roomId: dataBaseRooms.length,
    roomUsers: [{ name: user!.name, index: user!.idPlayer }]
  };

  dataBaseRooms.push(newRoom as Room);

  const resp = {
    type: "update_room",
    data: JSON.stringify(dataBaseRooms),
    id: 0
  };
  wss.clients.forEach((client) => client.send(JSON.stringify(resp)));
}
