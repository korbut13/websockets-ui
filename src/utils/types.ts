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
  password: string
}
