import { WebSocket } from "ws";

export type Player = {
  name: string,
  password: string,
  idPlayer: string,
  ws: WebSocket,
  wins: number,
}

export type Request = {
  type: string,
  data: string,
  id: number,
}

export type Room = {
  roomId: number,
  roomUsers: { name: string, index: string, ships: Ship[], }[],
}
export type DataBaseRooms = Room[];

export type Ship = {
  position: {
    x: number,
    y: number,
  },
  direction: boolean,
  length: number,
  type: string,
  positionEachDeck?: Map<number, { x: number, y: number }>,
  positionEmptyCell?: Map<number, { x: number, y: number }>,
}
