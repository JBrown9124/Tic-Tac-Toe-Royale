import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
interface BodyProps {
  playerName: string;
  hostSid:string,
}
const saveLobby = async (body: BodyProps) => {
  const { data } = await axios.post(`${url}/api/lobby`, body);
  return data;
};
const sendLobby = (data: Lobby) => {
  socket.emit("new-lobby", data.lobbyId);
};
const createLobby = async (
  playerName:string,
): Promise<{ lobby: Lobby; playerId: string } | undefined> => {
  try {
    const data = await saveLobby({
      playerName: playerName,
      hostSid: socket.id,
    });
    sendLobby(data.lobby);

    return data;
  } catch (e) {
    console.log("Failed to get create lobby! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error"+e);

  }
};

export default createLobby;
