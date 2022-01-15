import axios from "axios";
import { NewMove } from "../../Models/NewMove";
import url from "../../storage/url";
interface BodyProps {
  playerId: string;
  lobbyId: number;
  
}
const saveBotNewMove = async (body: BodyProps) => {
  const { data } = await axios.post(`${url}/api/bot`, body);
  return data;
};

const botNewMove = async (body: BodyProps): Promise<NewMove | undefined> => {
  try {
    const newMove = await saveBotNewMove(body);

    return newMove;
  } catch (e) {
    console.log("Failed to make move for bot! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error"+e);

  }
};

export default botNewMove;
