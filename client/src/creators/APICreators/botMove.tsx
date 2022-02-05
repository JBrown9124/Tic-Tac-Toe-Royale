import axios from "axios";
import { Move } from "../../Models/Move";
import url from "../../storage/url";
interface BodyProps {
  playerId: string;
  lobbyId: number;
  
}
const saveBotMove = async (body: BodyProps) => {
  const { data } = await axios.post(`${url}/api/bot`, body);
  return data;
};

const botMove = async (body: BodyProps): Promise<Move | undefined> => {
  try {
    const newMove = await saveBotMove(body);

    return newMove;
  } catch (e) {
    console.log("Failed to make move for bot! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error"+e);

  }
};

export default botMove;
