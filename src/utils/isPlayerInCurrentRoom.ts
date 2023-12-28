import { Room } from "./types";

export const isPlayerInCurrentRoom = (currentRoom: Room, idUser: string) => {
  const result = currentRoom.roomUsers.find((el) => el.index === idUser);
  return result === undefined ? false : true;
}
