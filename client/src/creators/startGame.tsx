import socket from "../socket";
import axios from "axios";
interface BodyProps {
  board:{color:string, size:number|number[], }
  
}
const saveStartGame = async (body: BodyProps) => {
  console.log(body, "saveLeaveLobbyBody");
  const { data } = await axios.delete("http://127.0.0.1:8000/api/lobby", {
    data: body,
  });
  return data;
};
const sendStartGame = (data: any) => {
  socket.emit("player-leave-lobby", {
    lobby: data.lobby,
  });
};
const startGame = async (body: BodyProps) => {
  try {
    const data = await saveStartGame(body);
    sendStartGame(data);
    console.log(data, "leaveLobbyData");
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default startGame;
