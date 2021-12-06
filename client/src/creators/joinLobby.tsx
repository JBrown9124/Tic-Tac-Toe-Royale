import socket from "../socket";
import axios from "axios";
interface Body{
    lobbyId:number, playerName:string
}
const saveLobby = async (body:Body) => {
    
  const { data } = await axios.put("http://127.0.0.1:8000/api/lobby", body);
  return data;
};
const sendLobbyInfo = (data: any) => {
    console.log(data, "SENDLOBBY")
  socket.emit("player-join-lobby", 
    data
  );
};
const joinLobby = async (body:Body) => {
  const data = await saveLobby(body);
  console.log(data, "data")
  sendLobbyInfo(data);
};

export default joinLobby;