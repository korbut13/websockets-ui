import { connections } from "../../dataBase/dataBaseConnections";
import { Player, Request } from "../../utils/types";
import { WebSocket } from "ws";

export const regHandler = (ws: WebSocket, req: Request, connectionId: string) => {

  const dataPlayer: { name: string, password: string } = JSON.parse(req.data);

  const player = {
    name: dataPlayer.name,
    password: dataPlayer.password,
    idPlayer: connectionId,
    ws: ws,
    wins: 0,
  } as Player;

  connections.set(connectionId, player);

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
