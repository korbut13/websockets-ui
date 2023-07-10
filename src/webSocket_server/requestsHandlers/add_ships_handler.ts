
import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { Request, Ship } from "../../utils/types";
import { connections } from "../../dataBase/dataBaseConnections";

export const addShipsHandler = (req: Request) => {
  const reqData: { gameId: number, ships: Ship[], indexPlayer: number } = JSON.parse(req.data);

  const gameId = reqData.gameId;
  const ships = reqData.ships;
  const currentPlayerIndex = reqData.indexPlayer;

  dataBaseGames.get(gameId)!.get(currentPlayerIndex)!.ships.push(...ships);

  const shipsOfFirstPlayer = dataBaseGames.get(gameId)?.get(0)?.ships.length;
  const shipsOfSecondPlayer = dataBaseGames.get(gameId)?.get(1)?.ships.length;

  if (shipsOfFirstPlayer !== 0 && shipsOfSecondPlayer !== 0) {
    const resp = {
      type: "start_game",
      data: JSON.stringify({
        ships: ships,
        currentPlayerIndex: currentPlayerIndex
      }),
      id: 0,
    };

    const idsPlayers: string[] = [];
    idsPlayers.push(dataBaseGames.get(gameId)!.get(0)!.indexPlayer);
    idsPlayers.push(dataBaseGames.get(gameId)!.get(1)!.indexPlayer);

    idsPlayers.forEach((el) => {
      if (connections.has(el)) {
        connections.get(el)?.ws.send(JSON.stringify(resp))
      }
    })
  }
}
