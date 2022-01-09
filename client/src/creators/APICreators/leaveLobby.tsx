import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import {Player} from "../../Models/Player";
import { Lobby } from "../../Models/Lobby";
interface BodyProps {
  player: Player;
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
    player: body.player,

    hostSid: body.hostSid,
  });
};
const leaveLobby = async (
  body: BodyProps,
 
): Promise<undefined | void> => {
  try {
    const { lobby } = await saveLeaveLobby(body);
    sendLeaveLobby(body);
  
  } catch (e) {
    console.log(
      "Failed to leave lobby! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error" +
        e
    );
  }
};

export default leaveLobby;
