import { connections } from "../../dataBase/dataBaseConnections";

export const turn = (idPlayer: number, firstPlayer: string, secondPlayer: string) => {
  const resp = {
    type: "turn",
    data: JSON.stringify({
      currentPlayer: idPlayer,
    }),
    id: 0,
  };
  if (connections.has(firstPlayer)) {
    connections.get(firstPlayer)?.ws.send(JSON.stringify(resp))
  }
  if (connections.has(secondPlayer)) {
    connections.get(secondPlayer)?.ws.send(JSON.stringify(resp))
  }

}
