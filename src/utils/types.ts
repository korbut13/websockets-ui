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
}

export type Request = {
  type: string,
  data: string,
  id: number,
}

export type Room = {
  roomId: number,
  roomUsers: { name: string, index: string }[],
}
export type DataBaseRooms = Room[];
