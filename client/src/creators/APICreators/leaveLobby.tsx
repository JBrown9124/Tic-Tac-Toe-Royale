import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import { Player } from "../../Models/Player";
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
const sendLeaveLobby = async(body: BodyProps, newHost: Player) => {
  socket.emit("player-leave-lobby", {
    player: body.player,
    newHost: newHost,
    hostSid: body.hostSid,
    lobbyId: body.lobbyId,
  });
};
const leaveLobby = async (
  body: BodyProps
): Promise<{ data: { lobby: Lobby; newHost: Player } } | undefined | void> => {
  try {
    const { lobby, newHost } = await saveLeaveLobby(body);
    
    if (body.player.name) {
      return sendLeaveLobby(body, newHost);
      
    }
    
    // If host disconnects return new host to all clients in room.
    return { data: { lobby: lobby, newHost: newHost } };
  } catch (e) {
    console.log(
      "Failed to leave lobby! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error" +
        e
    );
  }
};

export default leaveLobby;
