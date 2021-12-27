import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url"
interface BodyProps {
  playerName: string;
}
const saveLobby = async (body: { playerName: string; hostSid: string }) => {
  const { data } = await axios.post(`${url}/api/lobby`, body);
  return data;
};
const sendLobby = (data: any) => {
  
  socket.emit("new-lobby", data.lobby.lobbyId);
};
const createLobby = async (body: BodyProps) => {
  const data = await saveLobby({
    playerName: body.playerName,
    hostSid: socket.id,
  });
  await sendLobby(data);
  
  return await data.lobby;
};

export default createLobby;
