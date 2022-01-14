import { socket } from "../../socket";
import axios from "axios";
import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";
import { Board } from "../../Models/Board";
import url from "../../storage/url";
interface BodyProps {
  board: Board;
  lobbyId: number;
  piece: string;
}
const savePlayAgain = async (body: BodyProps) => {
  const { data } = await axios.post(`${url}/api/game`, body);
  return data;
};
const sendPlayAgain = (data: Lobby) => {
  socket.emit("play-again", { lobbyId: data.lobbyId, hostSid: data.hostSid });
};
const playAgain = async (
  body: BodyProps,
  setAction: (action: string) => void
): Promise<undefined | void> => {
  try {
    const { lobby } = await savePlayAgain(body);

    sendPlayAgain(lobby);
    setAction("play again")
  } catch (e) {

    console.log("Failed to play again. Please try refreshing your browser first. If that does not work clear your cookies for this website. Error"+e);
  }
};

export default playAgain;
