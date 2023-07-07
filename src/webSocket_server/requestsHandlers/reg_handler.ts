import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseUsers } from "../../dataBase/dataBaseUsers";
import { Request } from "../../utils/types";
import { WebSocket } from "ws";

export const regHandler = (ws: WebSocket, req: Request, connectionId: string) => {

  const dataPlayer: { name: string, password: string } = JSON.parse(req.data);

  const player = {
    name: dataPlayer.name,
    password: dataPlayer.password,
    idPlayer: connectionId,
    ws: ws,
  }
  connections.set(connectionId, player);

  dataBaseUsers.players.push(player); //????

  const resp = {
    type: "reg",
    data: JSON.stringify({
      name: player.name,
      index: player.idPlayer,
      error: false,
      errorText: "",
    }),
    id: 0,
  }
  ws.send(JSON.stringify(resp));
}
