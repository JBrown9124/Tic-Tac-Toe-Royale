import {socket} from "../socket";
import axios from "axios";
interface BodyProps {
  board:{color:string, size:number|number[]}
  lobbyId:number
  piece:string
  
}
const saveStartGame = async (body: BodyProps) => {
  console.log(body, "saveStartGAmeBody");
  const { data } = await axios.post("http://127.0.0.1:8000/api/game", 
    body,
  );
  return data;
};
const sendStartGame = (data: any) => {
  
  socket.emit("start-game", {lobbyId:data.lobby.lobbyId, hostSid:data?.lobby?.hostSid});
};
const startGame = async (body: BodyProps) => {
  try {
    const data = await saveStartGame(body);
    const responseBody = {lobby:await data.lobby, gameStatus:await data.gameStatus}
    await sendStartGame(responseBody);
    console.log(data, "startGameData");

    return await responseBody;
  } catch (e) {
    console.log(e);
  }
};

export default startGame;
