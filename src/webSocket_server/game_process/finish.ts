import { wss } from "../../..";
import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { updateWinners } from "./update_winners";
import { updateRoom } from "./update_room";

export const finishGame = (gameId: number, indexPlayer: number) => {

  const resp = {
    type: "finish",
    data: JSON.stringify({
      winPlayer: indexPlayer,
    }),
    id: 0
  }
  wss.clients.forEach((client) => client.send(JSON.stringify(resp)));

  const firstPlayer = dataBaseGames.get(gameId)!.get(0)!.indexPlayer;
  const secondPlayer = dataBaseGames.get(gameId)!.get(1)!.indexPlayer;

  if (connections.has(firstPlayer)) {
    connections.get(firstPlayer)?.ws.send(JSON.stringify(resp));
  };

  if (connections.has(secondPlayer)) {
    connections.get(secondPlayer)?.ws.send(JSON.stringify(resp))
  };

  updateWinners(gameId, indexPlayer);
  updateRoom();

}
