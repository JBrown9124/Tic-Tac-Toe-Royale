import {socket} from "../socket";
import axios from "axios";
interface BodyProps{
  playerName:string
  
}
const saveLobby = async (body:{playerName:string, hostSid:string}) => {
  const { data } = await axios.post("http://127.0.0.1:8000/api/lobby",body);
  return data;
};
const sendLobby = (data: any) => {
 console.log(socket?.id, "SOCKETID")
  socket.emit("new-lobby", 
    data.lobby.lobbyId,
  );
};
const createLobby = async (body:BodyProps) => {
  const data = await saveLobby({playerName:body.playerName, hostSid:socket.id});
  await sendLobby(data);
  console.log(data, "createRoomData")
  return await data.lobby
};

export default createLobby;
