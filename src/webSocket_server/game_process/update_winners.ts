import { wss } from "../../..";
import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseGames } from "../../dataBase/dataBaseGames";

export const updateWinners = (gameId: number, indexPlayer: number) => {

  const winnerIndex = dataBaseGames.get(gameId)!.get(indexPlayer)!.indexPlayer;
  const nameWinner = connections.get(winnerIndex!)!.name;
  const wins = connections.get(winnerIndex!)!.wins;
  connections.get(winnerIndex!)!.wins = wins + 1;

  const resp = {
    type: "update_winners",
    data: JSON.stringify([{
      name: nameWinner,
      wins: connections.get(winnerIndex!)!.wins,
    }],),
    id: 0,
  };
  wss.clients.forEach((client) => client.send(JSON.stringify(resp)));
}
