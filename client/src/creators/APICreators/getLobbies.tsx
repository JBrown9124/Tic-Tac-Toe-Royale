import axios from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
interface BodyProps {
  lobbyId: number;
  playerId: string | null;
  hostSid: number;
}
const saveGetLobbies = async () => {
  const { data } = await axios.get(`${url}/api/lobby`);
  return data;
};

const getLobbies = async (setLobbies:(lobbies:Lobby[]) =>void
  
): Promise<Lobby[]|undefined> => {
  try {
    const {lobbies} = await saveGetLobbies();
    setLobbies(lobbies);
    return lobbies;
  } catch (e) {
      
    console.log(
      "Failed to get game while in lobby! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error" +
        e
    );
  }
};

export default getLobbies;
