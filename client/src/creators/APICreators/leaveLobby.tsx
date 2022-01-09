import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
interface BodyProps {
  playerId: string;
  lobbyId: number;
  hostSid: number;
}
const saveLeaveLobby = async (body: BodyProps) => {
  const { data } = await axios.delete(`${url}/api/lobby`, {
    data: body,
  });
  return data;
};
const sendLeaveLobby = (body: BodyProps) => {
  socket.emit("player-leave-lobby", {
    playerId: body.playerId,

    hostSid: body.hostSid,
  });
};
const leaveLobby = async (body: BodyProps, setSessionCookie:Function): Promise<Lobby | undefined> => {
  try {
    const { lobby } = await saveLeaveLobby(body);
    sendLeaveLobby(body);
    setSessionCookie("lobbyId", 0, { path: "/" });
    return lobby;
  } catch (e) {
    console.log("Failed to leave lobby! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error"+e);

  }
};

export default leaveLobby;
