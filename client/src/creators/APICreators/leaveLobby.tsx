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
const leaveLobby = async (body: BodyProps): Promise<Lobby | undefined> => {
  try {
    const { lobby } = await saveLeaveLobby(body);
    sendLeaveLobby(body);

    return lobby;
  } catch (e) {
    console.log(e);
  }
};

export default leaveLobby;
