import { socket } from "../../socket";
import axios, { AxiosResponse } from "axios";
import url from "../../storage/url"
import { Lobby } from "../../Models/Lobby";
interface BodyProps {
  lobbyId: number;
}
const saveGetStartGame = async (body: any) => {
  
  const { data } = await axios.get(`${url}/api/game`, {
    params: body,
  });
  return data;
};

const getStartGame = async (body: BodyProps) => {
  try {
    const data = await saveGetStartGame(body);
   

    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default getStartGame;
