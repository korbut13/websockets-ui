import { WebSocket } from "ws";

export type RegData = {
  type: string,
  data: {
    name: string,
    password: string,
  },
  id: number,
}

export type DataBase = {
  players: Player[]
};

export type Player = {
  name: string,
  password: string,
  idPlayer: string,
  ws: WebSocket,
  room: Room,
}

export type Request = {
  type: string,
  data: string,
  id: number,
}

export type Room = {
  roomId: number,
  roomUsers: { name: string, index: string, ships: Ship[] }[],
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
}
