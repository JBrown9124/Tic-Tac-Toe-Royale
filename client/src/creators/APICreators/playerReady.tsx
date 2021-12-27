import {socket}from "../../socket";
import axios from "axios";
import url from "../../storage/url"
interface BodyProps {
  player:{name:string, piece:string},
  lobbyId:number,
  hostSid:number
  
}
const savePlayerReady = async (body: BodyProps) => {

  const { data } = await axios.put(`${url}/api/game`, 
    body,
  );
  return data;
};
const sendPlayerReady = (body: BodyProps) => {
  
  socket.emit("player-ready", {
    hostSid:body.hostSid},
  );
};
const playerReady = async (body: BodyProps) => {
  try {
    const data = await savePlayerReady(body);
    sendPlayerReady(body);
   
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default playerReady;
