
import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { Request, Ship } from "../../utils/types";
import { connections } from "../../dataBase/dataBaseConnections";
import { turn } from "../game_process/turn";
import { setPositionOfEachDeck } from "../../utils/setPositionOfEachDeck";

export const addShipsHandler = (req: Request) => {
  const reqData: { gameId: number, ships: Ship[], indexPlayer: number } = JSON.parse(req.data);

  const gameId = reqData.gameId;
  const ships = reqData.ships;
  const currentPlayerIndex = reqData.indexPlayer;

  dataBaseGames.get(gameId)!.get(currentPlayerIndex)!.ships.push(...ships);

  setPositionOfEachDeck(dataBaseGames.get(gameId)!.get(currentPlayerIndex)!.ships);


  const shipsOfFirstPlayer = dataBaseGames.get(gameId)?.get(0)?.ships.length;
  const shipsOfSecondPlayer = dataBaseGames.get(gameId)?.get(1)?.ships.length;

  if (shipsOfFirstPlayer !== 0 && shipsOfSecondPlayer !== 0) {
    const resp1 = {
      type: "start_game",
      data: JSON.stringify({
        ships: dataBaseGames.get(gameId)?.get(0)?.ships,
        currentPlayerIndex: currentPlayerIndex
      }),
      id: 0,
    };

    const resp2 = {
      type: "start_game",
      data: JSON.stringify({
        ships: dataBaseGames.get(gameId)?.get(1)?.ships,
        currentPlayerIndex: currentPlayerIndex
      }),
      id: 0,
    };

    const firstPlayer = dataBaseGames.get(gameId)!.get(0)!.indexPlayer;
    const secondPlayer = dataBaseGames.get(gameId)!.get(1)!.indexPlayer;

    connections.get(firstPlayer)?.ws.send(JSON.stringify(resp1));
    connections.get(secondPlayer)?.ws.send(JSON.stringify(resp2));

    turn(0, firstPlayer, secondPlayer);
  }
}
