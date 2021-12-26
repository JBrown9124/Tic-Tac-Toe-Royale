import {socket} from "../socket";
import axios from "axios";
import url from "../storage/url"
interface BodyProps {
  board:{color:string, size:number|number[]}
  lobbyId:number
  piece:string
  
}
const saveStartGame = async (body: BodyProps) => {

  const { data } = await axios.post(`${url}/api/game`, 
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
 

    return await responseBody;
  } catch (e) {
    console.log(e);
  }
};

export default startGame;
