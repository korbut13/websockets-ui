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

export type Room = {
  roomId: number,
  roomUsers: { name: string, index: string }[],
}

export type Player = {
  name: string,
  password: string,
  idPlayer: string,
  ws: WebSocket,
  plauerRoom: {
    roomId: number,
    roomUsers: { name: string, index: string, ships: Shpip[] }[],
  }
}

export type Request = {
  type: string,
  data: string,
  id: number,
}


export type DataBaseRooms = Room[];

export type Shpip = {
  position: {
    x: number,
    y: number,
  },
  direction: boolean,
  length: number,
  type: string,
}
