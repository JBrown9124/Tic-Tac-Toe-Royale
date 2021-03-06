import { socket } from "../../socket";
import axios from "axios";
import { Lobby } from "../../Models/Lobby";
import url from "../../storage/url";
interface BodyProps {
  player: { name: string; piece: string; playerId: string };
  lobbyId: number;
  hostSid: number;
}
const savePlayerReady = async (body: BodyProps) => {
  const { data } = await axios.put(`${url}/api/game`, body);
  return data;
};
const sendPlayerReady = (body: BodyProps) => {
  socket.emit("player-ready", {
    hostSid: body.hostSid,
    lobbyId: body.lobbyId
  });
};
const playerReady = async (body: BodyProps): Promise<Lobby | undefined> => {
  try {
    const data = await savePlayerReady(body);
    sendPlayerReady(body);

    return await data.lobby;
  } catch (e) {
    console.log("Failed to hit ready! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error"+e);
  }
};

export default playerReady;
