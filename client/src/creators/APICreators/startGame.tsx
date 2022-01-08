import { socket } from "../../socket";
import axios from "axios";
import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";
import {Board } from "../../Models/Board";
import url from "../../storage/url";
interface BodyProps {
  board: Board;
  lobbyId: number;
  piece: string;
}
const saveStartGame = async (body: BodyProps) => {
  const { data } = await axios.post(`${url}/api/game`, body);
  return data;
};
const sendStartGame = (data: Lobby) => {
  socket.emit("start-game", { lobbyId: data.lobbyId, hostSid: data.hostSid });
};
const startGame = async (
  body: BodyProps, setSessionCookie:Function
): Promise<undefined|void> => {
  try {
    const { lobby } = await saveStartGame(body);

    sendStartGame(lobby);
    setSessionCookie("command","begin", { path: "/" })
    
  } catch (e) {
    console.log(e);
  }
};

export default startGame;
