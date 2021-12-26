import {socket}from "../socket";
import axios from "axios";
import url from "../storage/url"
interface BodyProps {
  playerName: string;
  lobbyId: number;
  hostSid:number
}
const saveLeaveLobby = async (body: BodyProps) => {
 
  const { data } = await axios.delete(`${url}/api/lobby`, {
    data: body,
  });
  return data;
};
const sendLeaveLobby = (data: any, body:BodyProps) => {
  
  socket.emit("player-leave-lobby", {
    lobby: data.lobby,
    playerName:body.playerName,

    hostSid:body.hostSid
  });
};
const leaveLobby = async (body: BodyProps) => {
  try {
    const data = await saveLeaveLobby(body);
    sendLeaveLobby(data, body);
    
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default leaveLobby;
