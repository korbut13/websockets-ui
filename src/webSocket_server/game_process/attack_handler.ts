import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { Request } from "../../utils/types";
import { turn } from "./turn";
import { setEmptyPositionAround } from "../../utils/setEmptyPositionAround";
import { attackedShip } from "../../dataBase/attakedShip";

export const attackHandler = (req: Request) => {
  const reqData: { gameId: number, x: number, y: number, indexPlayer: number } = JSON.parse(req.data);
  const gameId = reqData.gameId;
  const xPosition = reqData.x;
  const yPosition = reqData.y;
  const indexPlayer = reqData.indexPlayer;

  let nextPlayer = indexPlayer === 0 ? 1 : 0;
  let status: string = 'miss';
  const indexRival = nextPlayer;

  let emptyPositions = [] as { x: number; y: number; }[];


  for (const ship of dataBaseGames.get(gameId)!.get(indexRival)!.ships) {
    for (const position of ship.positionEachDeck!) {

      if (position[1].x === xPosition && position[1].y === yPosition) {

        attackedShip.push({ x: xPosition, y: yPosition, direction: ship.direction });
        ship.positionEachDeck!.delete(position[0]);

        if (ship.positionEachDeck!.size === 0) {
          status = 'killed';
          console.log(1, attackedShip);
          emptyPositions = setEmptyPositionAround(attackedShip);
          attackedShip.length = 0;

        } else {
          status = 'shot';
        }
        nextPlayer = indexPlayer;
        break;
      }
    }
    if (status !== 'miss') break;
  }

  const dataAttack = {
    position: {
      x: xPosition,
      y: yPosition,
    },
    currentPlayer: indexPlayer,
    status: status,
  }

  const resp = {
    type: 'attack',
    data: JSON.stringify(dataAttack),
    id: 0,
  }

  const idsPlayers = [];
  const firstPlayer = dataBaseGames.get(gameId)!.get(0)!.indexPlayer;
  const secondPlayer = dataBaseGames.get(gameId)!.get(1)!.indexPlayer;

  idsPlayers.push(firstPlayer, secondPlayer)

  idsPlayers.forEach((el) => {
    if (connections.has(el)) {
      connections.get(el)?.ws.send(JSON.stringify(resp))
    }
  })

  turn(nextPlayer, firstPlayer, secondPlayer);

  if (status === 'killed') {
    emptyPositions.forEach((position) => {
      const dataAttack = {
        position: {
          x: position.x,
          y: position.y,
        },
        currentPlayer: indexPlayer,
        status: 'miss',
      }
      const resp = {
        type: 'attack',
        data: JSON.stringify(dataAttack),
        id: 0,
      }
      const idsPlayers = [];
      const firstPlayer = dataBaseGames.get(gameId)!.get(0)!.indexPlayer;
      const secondPlayer = dataBaseGames.get(gameId)!.get(1)!.indexPlayer;

      idsPlayers.push(firstPlayer, secondPlayer)

      idsPlayers.forEach((el) => {
        if (connections.has(el)) {
          connections.get(el)?.ws.send(JSON.stringify(resp))
        }
      })

      turn(nextPlayer, firstPlayer, secondPlayer);

    })

  }
}
