import { WebSocket } from "ws";
import { Request, Shpip } from "../../utils/types";

export const addShipsHandler = (ws: WebSocket, req: Request) => {
  const reqData: { ships: Shpip[], indexPlayer: number } = JSON.parse(req.data);

  const ships = reqData.ships;
  const currentPlayerIndex = reqData.indexPlayer;



  const resp = {
    type: "start_game",
    data: JSON.stringify({
      ships: ships,
      currentPlayerIndex: currentPlayerIndex
    }),
    id: 0,
  };

  ws.send(JSON.stringify(resp));
}
