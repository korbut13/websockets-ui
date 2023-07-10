import { connections } from "../../dataBase/dataBaseConnections";
import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { Request } from "../../utils/types";
import { turn } from "./turn";

export const attackHandler = (req: Request) => {
  const reqData: { gameId: number, x: number, y: number, indexPlayer: number } = JSON.parse(req.data);
  const gameId = reqData.gameId;
  const xPosition = reqData.x;
  const yPosition = reqData.y;
  const indexPlayer = reqData.indexPlayer;

  let nextPlayer = indexPlayer === 0 ? 1 : 0;
  let status: string = 'miss';
  const indexRival = nextPlayer;

  for (const ship of dataBaseGames.get(gameId)!.get(indexRival)!.ships) {
    for (const position of ship.positionEachDeck!.values()) {
      console.log(position.x, position.y)
      if (position.x === xPosition && position.y === yPosition) {
        console.log("Попала сюда");

        if (ship.type === 'small') {
          status = 'killed';
          break;
        } else {
          status = 'shot';
          break;
        }
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
}
