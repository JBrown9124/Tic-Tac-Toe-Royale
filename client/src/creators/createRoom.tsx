import socket from "../socket";
import axios from "axios";
interface PlayerNameProps{
  playerName:string
}
const saveRoom = async (body:{playerName:string}) => {
  const { data } = await axios.post("http://127.0.0.1:8000/api/lobby",body);
  return data;
};
const sendRoom = (data: any) => {
  socket.emit("new-lobby", {
    lobby_id: data.lobby_id,
  });
};
const createRoom = async (body:PlayerNameProps) => {
  const data = await saveRoom(body);
  sendRoom(data);
  return await data
};

export default createRoom;
