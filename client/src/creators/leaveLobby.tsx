import socket from "../socket";
import axios from "axios";
interface BodyProps {
  playerName: string;
  lobbyId: number;
}
const saveLeaveLobby = async (body: BodyProps) => {
  console.log(body, "saveLeaveLobbyBody");
  const { data } = await axios.delete("http://127.0.0.1:8000/api/lobby", {
    data: body,
  });
  return data;
};
const sendLeaveLobby = (data: any) => {
  socket.emit("player-leave-lobby", {
    lobby: data.lobby,
  });
};
const leaveLobby = async (body: BodyProps) => {
  try {
    const data = await saveLeaveLobby(body);
    sendLeaveLobby(data);
    console.log(data, "leaveLobbyData");
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default leaveLobby;
