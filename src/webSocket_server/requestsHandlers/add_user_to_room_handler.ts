import { dataBaseRooms } from "../../dataBase/dataBaseRooms";
import { connections } from "../../dataBase/dataBaseConnections";
import { isPlayerInCurrentRoom } from "../../utils/isPlayerInCurrentRoom";
import { Request, Room, Player } from "../../utils/types";
import { dataBaseGames } from "../../dataBase/dataBaseGames";


export const addUserToRoomHandler = (req: Request, connectionId: string) => {
  const reqData: { indexRoom: number } = JSON.parse(req.data);
  const indexRoom: number = reqData.indexRoom;

  const currentRoom = dataBaseRooms.find((room) => room.roomId === indexRoom) as Room;

  const idUser = connections.get(connectionId)!.idPlayer;

  if (!isPlayerInCurrentRoom(currentRoom, idUser) && currentRoom.roomUsers.length < 2) {
    const newPlayer = { ...connections.get(connectionId) } as Player;

    const playerInCurrentRoom = currentRoom.roomUsers.filter((player) => player.index !== idUser)[0];
    const idPlayerInCurrentRoom = playerInCurrentRoom!.index;

    // connections.get(idPlayerInCurrentRoom)!.room.roomUsers.push({ name: newPlayer.name, index: newPlayer.idPlayer, ships: [] });

    currentRoom.roomUsers.push({ name: newPlayer.name, index: newPlayer.idPlayer, ships: [] });
    //connections.get(idPlayerInCurrentRoom)!.room.roomUsers.push({ name: newPlayer.name, index: newPlayer.idPlayer, ships: [] });
    connections.get(idPlayerInCurrentRoom)!.room = currentRoom;
    connections.get(idUser)!.room = currentRoom;
  }

  if (currentRoom.roomUsers.length === 2) {
    currentRoom.roomUsers.forEach((player, index) => {
      const dataGame = {
        idGame: indexRoom,
        idPlayer: index,
      };

      const game = new Map();
      game.set(index, [])
      dataBaseGames.set(indexRoom, game);

      const resp = {
        type: "create_game",
        data: JSON.stringify(dataGame),
        id: 0,
      }
      if (connections.has(player.index)) {
        connections.get(player.index)!.ws.send(JSON.stringify(resp))
      }
    })
    dataBaseRooms.splice(indexRoom, 1);
  }

}
