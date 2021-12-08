import socket from "../socket";
import axios from "axios";
interface PlayerNameProps{
  playerName:string
}
const saveLobby = async (body:{playerName:string}) => {
  const { data } = await axios.post("http://127.0.0.1:8000/api/lobby",body);
  return data;
};
const sendLobby = (data: any) => {
  socket.emit("new-lobby", {
    lobby_id: data.lobby_id,
  });
};
const createLobby = async (body:PlayerNameProps) => {
  const data = await saveLobby(body);
  sendLobby(data);
  console.log(data, "createRoomData")
  return await data.lobby
};

export default createLobby;
