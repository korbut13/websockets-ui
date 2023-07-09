
import { Request, Ship } from "../../utils/types";
import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { connections } from "../../dataBase/dataBaseConnections";

export const addShipsHandler = (req: Request, connectionId: string) => {
  const reqData: { gameId: number, ships: Ship[], indexPlayer: number } = JSON.parse(req.data);

  const gameId = reqData.gameId;
  const ships = reqData.ships;
  const currentPlayerIndex = reqData.indexPlayer;

  dataBaseGames.get(gameId)?.set(currentPlayerIndex, { indexPlayer: connectionId, ships: ships });
  const ammountShipsFirstPlayer = dataBaseGames.get(gameId)?.get(0)?.ships.length;
  const ammountShipsSecondPlayer = dataBaseGames.get(gameId)?.get(1)?.ships.length;

  if (ammountShipsFirstPlayer && ammountShipsSecondPlayer) {

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
        console.log("зашли сюда")
        connections.get(el)?.ws.send(JSON.stringify(resp))
      }
    })


    //ws.send(JSON.stringify(resp));
  }

}
