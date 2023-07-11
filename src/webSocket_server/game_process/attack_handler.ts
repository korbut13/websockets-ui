import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { attackedShip } from "../../dataBase/attakedShip";
import { setEmptyPositionAround } from "../../utils/setEmptyPositionAround";
import { sendResponseAfterAttack } from "./sendResponseAfterAttack";
import { nextPlayer } from "../../utils/nextPlayer";
import { Request } from "../../utils/types";
import { connections } from "../../dataBase/dataBaseConnections";

export const attackHandler = (req: Request) => {
  const reqData: { gameId: number, x: number, y: number, indexPlayer: number } = JSON.parse(req.data);
  const gameId = reqData.gameId;
  const xPosition = reqData.x;
  const yPosition = reqData.y;
  const indexPlayer = reqData.indexPlayer;

  if (nextPlayer.index === indexPlayer) {

    let status: string = 'miss';
    const indexRival = indexPlayer === 0 ? 1 : 0;
    let emptyPositions = [] as { x: number; y: number; }[];

    for (const ship of dataBaseGames.get(gameId)!.get(indexRival)!.ships) {

      for (const position of ship.positionEachDeck!) {
        if (position[1].x === xPosition && position[1].y === yPosition) {

          attackedShip.push({ x: xPosition, y: yPosition, direction: ship.direction });
          ship.positionEachDeck!.delete(position[0]);

          if (ship.positionEachDeck!.size === 0) {
            status = 'killed';

            emptyPositions = setEmptyPositionAround(attackedShip);
            attackedShip.length = 0;

            const ammountKilledShips = dataBaseGames.get(gameId)!.get(indexRival)!.killedShips;
            dataBaseGames.get(gameId)!.get(indexRival)!.killedShips = ammountKilledShips + 1;
            if (dataBaseGames.get(gameId)!.get(indexRival)!.killedShips === 10) {

              const resp = {
                type: "finish",
                data: JSON.stringify({
                  winPlayer: indexPlayer,
                }),
                id: 0
              }

              const firstPlayer = dataBaseGames.get(gameId)!.get(0)!.indexPlayer;
              const secondPlayer = dataBaseGames.get(gameId)!.get(1)!.indexPlayer;

              if (connections.has(firstPlayer)) {
                connections.get(firstPlayer)?.ws.send(JSON.stringify(resp))
              };

              if (connections.has(secondPlayer)) {
                connections.get(secondPlayer)?.ws.send(JSON.stringify(resp))
              }
            }

          } else {
            status = 'shot';
          }
          nextPlayer.index = indexPlayer;
          break;
        } else {
          nextPlayer.index = indexPlayer === 0 ? 1 : 0;
        }
      }
      if (status !== 'miss') break;
    }


    sendResponseAfterAttack(status, xPosition, yPosition, indexPlayer, gameId, nextPlayer.index);
    if (status === 'killed') {
      emptyPositions.forEach((position) => {
        sendResponseAfterAttack("miss", position.x, position.y, indexPlayer, gameId, nextPlayer.index)
      })
    }

  } else {
    console.log("Next player's turn")
  }


}
