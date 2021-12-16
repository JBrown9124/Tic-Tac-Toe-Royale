import socket from "../socket";
import axios, { AxiosResponse } from "axios";
import { Lobby } from "../Models/Lobby";
interface BodyProps {
  lobbyId: number;
}
const saveGetGame = async (body:any) => {
  console.log(body, "getGameBody");
  const { data } = await axios.get("http://127.0.0.1:8000/api/game", {params:body});
  return data;
};

const getGame = async (body: BodyProps) => {
  try {
    const data = await saveGetGame(body);

    console.log(data, "saveGetGameData");
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default getGame;
