import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
import { Player } from "../../Models/Player";
interface BodyProps {
  lobbyId: number;
  playerName: string;
}
interface DataProps {
  lobby: Lobby;
  player: Player;
}
const saveLobby = async (body: BodyProps) => {
  const { data } = await axios.put(`${url}/api/lobby`, body);
  return data;
};
const sendLobbyInfo = (data: DataProps) => {
  socket.emit("player-join-lobby", {
    player: data.player,
    lobbyId: data.lobby.lobbyId,
    hostSid: data.lobby.hostSid,
  });
};
const joinLobby = async (body: BodyProps): Promise<DataProps | string> => {
  try {
    const data = await saveLobby(body);

    sendLobbyInfo(data);

    return await data;
  } catch (e) {
    return "Lobby does not exist.";
  }
};

export default joinLobby;
