import { socket } from "../socket";
import axios, { AxiosResponse } from "axios";
import url from "../storage/url"
import { Lobby } from "../Models/Lobby";
interface BodyProps {
  lobbyId: number;
}
const saveGetGame = async (body: any) => {
  
  const { data } = await axios.get(`${url}/api/game`, {
    params: body,
  });
  return data;
};
const sendGetGame = async (data: any) => {
  socket.emit("rejoin-room-after-refresh", data.hostSid);
};
const getGame = async (body: BodyProps) => {
  try {
    const data = await saveGetGame(body);
    await sendGetGame(data.lobby);

    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default getGame;
