import { Ship } from "../utils/types";

export const dataBaseGames = new Map<number, Map<number, { indexPlayer: string, ships: Ship[], killedShips: number, moves: { x: number, y: number }[] }>>();
