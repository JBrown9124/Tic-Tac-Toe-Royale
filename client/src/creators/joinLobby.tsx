import socket from "../socket";
import axios from "axios";
interface Body {
  lobbyId: number;
  playerName: string;
}
const saveLobby = async (body: Body) => {
  const { data } = await axios.put("http://127.0.0.1:8000/api/lobby", body);
  return data;
};
const sendLobbyInfo = (data: any) => {
  socket.emit("player-join-lobby", {
    lobby: data.lobby,
  });
};
const joinLobby = async (body: Body) => {
  try {
    const data = await saveLobby(body);

    sendLobbyInfo(data);
    console.log(data, "joinLobbyData");
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default joinLobby;
