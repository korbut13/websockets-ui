import { Request } from "../../utils/types";
import { getRandomNumber } from "../../utils/getRandomNumber";
import { dataBaseGames } from "../../dataBase/dataBaseGames";
import { attackHandler } from "../game_process/attack_handler";

export const randomAttackHandler = (req: Request) => {
  const reqData: { gameId: number, indexPlayer: number } = JSON.parse(req.data);
  const gameId = reqData.gameId;
  const indexPlayer = reqData.indexPlayer;


  function wasThereSuchMove() {
    let x = getRandomNumber();
    let y = getRandomNumber();
    const moveMade = dataBaseGames.get(gameId)?.get(indexPlayer)!.moves.find((move) => move.x === x && move.y === y);
    if (moveMade !== undefined) {
      wasThereSuchMove()
    }
    return { xPosition: x, yPosition: y }
  }
  const move = wasThereSuchMove();

  const data = {
    type: 'attack',
    data: JSON.stringify({
      gameId: gameId,
      x: move.xPosition,
      y: move.yPosition,
      indexPlayer: indexPlayer
    }),
    id: 0,
  }
  attackHandler(data);


}
