import { wss } from "../../..";
import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseGames } from "../../dataBase/dataBaseGames";

export const finishGame = (gameId: number, indexPlayer: number) => {
  console.log('heello')
  const resp = {
    type: "finish",
    data: JSON.stringify({
      winPlayer: indexPlayer,
    }),
    id: 0
  }
  const nameWinnerIndex = dataBaseGames.get(gameId)?.get(indexPlayer)?.indexPlayer;
  const nameWinner = connections.get(nameWinnerIndex!)!.name;
  const wins = connections.get(nameWinnerIndex!)!.wins;
  connections.get(nameWinnerIndex!)!.wins = wins + 1;

  const resp2 = {
    type: "update_winners",
    data: JSON.stringify([{
      name: nameWinner,
      wins: connections.get(nameWinnerIndex!)!.wins,
    }],),
    id: 0,
  }

  const firstPlayer = dataBaseGames.get(gameId)!.get(0)!.indexPlayer;
  const secondPlayer = dataBaseGames.get(gameId)!.get(1)!.indexPlayer;

  if (connections.has(firstPlayer)) {
    connections.get(firstPlayer)?.ws.send(JSON.stringify(resp));
  };

  if (connections.has(secondPlayer)) {
    connections.get(secondPlayer)?.ws.send(JSON.stringify(resp))
  }
  wss.clients.forEach((client) => client.send(JSON.stringify(resp2)));

}
