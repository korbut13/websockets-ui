import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { connections } from "../../dataBase/dataBaseConnections";
import { turn } from "./turn";

export const sendResponseAfterAttack = (status: string, xPosition: number, yPosition: number, indexPlayer: number, gameId: number, nextPlayer: number) => {

  const dataAttack = {
    position: {
      x: xPosition,
      y: yPosition,
    },
    currentPlayer: indexPlayer,
    status: status,
  };
  const resp = {
    type: 'attack',
    data: JSON.stringify(dataAttack),
    id: 0,
  };


  const firstPlayer = dataBaseGames.get(gameId)!.get(0)!.indexPlayer;
  const secondPlayer = dataBaseGames.get(gameId)!.get(1)!.indexPlayer;

  if (connections.has(firstPlayer)) {
    connections.get(firstPlayer)?.ws.send(JSON.stringify(resp))
  };

  if (connections.has(secondPlayer)) {
    connections.get(secondPlayer)?.ws.send(JSON.stringify(resp))
  }

  turn(nextPlayer, firstPlayer, secondPlayer);

}
