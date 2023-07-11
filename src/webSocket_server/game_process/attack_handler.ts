import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { attackedShip } from "../../dataBase/attakedShip";
import { setEmptyPositionAround } from "../../utils/setEmptyPositionAround";
import { sendResponseAfterAttack } from "./sendResponseAfterAttack";
import { nextPlayer } from "../../utils/nextPlayer";
import { Request } from "../../utils/types";

export const attackHandler = (req: Request) => {
  const reqData: { gameId: number, x: number, y: number, indexPlayer: number } = JSON.parse(req.data);
  const gameId = reqData.gameId;
  const xPosition = reqData.x;
  const yPosition = reqData.y;
  const indexPlayer = reqData.indexPlayer; //кто стрелял

  if (nextPlayer.index === indexPlayer) {
    // let nextPlayer = indexPlayer === 0 ? 1 : 0; // кто следующий стреляет
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
    //console.log(33333, dataBaseGames.get(gameId)!.get(indexPlayer)!.finished)
  } else {
    console.log("Стреляет не тот")
  }


}
