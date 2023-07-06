import { httpServer } from "./src/http_server";
import { WebSocketServer } from 'ws';
import { RegData } from "./src/utils/types";
//import { randomBytes } from 'node:crypto';
import { dataBase } from "./src/dataBase/dataBase";


const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  ws.on('message', (message: string) => {

    try {
      const req: RegData = JSON.parse(message);
      //const name = req.data.name;
      //const password = req.data.password;

      const player = {
        name: req.data.name,
        password: req.data.password,
      };

      dataBase.players.push(player);

      const dataPlayer = {
        name: player.name,
        index: dataBase.players.indexOf(player),
        error: false,
        errorText: "",
      };

      const resp = {
        type: "reg",
        data: JSON.stringify(dataPlayer),
        id: 0,
      }

      ws.send(JSON.stringify(resp))


    } catch (err) {
      console.log(err)
    }


    //const id = randomBytes(16).toString('hex');


  })
})
