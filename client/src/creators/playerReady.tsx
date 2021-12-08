import socket from "../socket";
import axios from "axios";
interface BodyProps {
  player:{name:string, piece:string},
  lobbyId:number
  
}
const savePlayerReady = async (body: BodyProps) => {
  console.log(body, "playerReadyBody");
  const { data } = await axios.put("http://127.0.0.1:8000/api/game", 
    body,
  );
  return data;
};
const sendPlayerReady = (data: any) => {
  socket.emit("player-ready", {
    data,
  });
};
const playerReady = async (body: BodyProps) => {
  try {
    const data = await savePlayerReady(body);
    sendPlayerReady(data);
    console.log(data, "playerReadyData");
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default playerReady;
