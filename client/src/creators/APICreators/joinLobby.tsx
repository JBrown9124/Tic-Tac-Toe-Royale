import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
interface Body {
  lobbyId: number;
  playerName: string;
}
const saveLobby = async (body: Body) => {
  const { data } = await axios.put(`${url}/api/lobby`, body);
  return data;
};
const sendLobbyInfo = (data: any, body: Body) => {
  socket.emit("player-join-lobby", {
    player: data.player,
    lobbyId: data.lobby.lobbyId,
    hostSid: data.lobby.hostSid,
  });
};
const joinLobby = async (body: Body) => {
  try {
    const data = await saveLobby(body);

    sendLobbyInfo(data, body);

    return await data;
  } catch (e) {
    return await "Lobby does not exist.";
  }
};

export default joinLobby;
