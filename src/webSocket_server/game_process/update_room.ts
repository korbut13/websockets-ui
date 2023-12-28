import { wss } from "../../..";
import { dataBaseRooms } from "../../dataBase/dataBaseRooms";

export const updateRoom = () => {
  const resp = {
    type: "update_room",
    data: JSON.stringify(dataBaseRooms),
    id: 0
  };

  wss.clients.forEach((client) => client.send(JSON.stringify(resp)));
}
