import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";

interface BodyProps {
  lobbyId: number;
  playerId: string | null;
  hostSid: number;
}
const saveGetStartGame = async (body: BodyProps) => {
  const { data } = await axios.get(`${url}/api/game`, {
    params: body,
  });
  return data;
};
const rejoinRoom = async (hostSidValue: number) => {
  socket.emit("rejoin-room-after-refresh", hostSidValue);
};
const getStartGame = async (
  body: BodyProps,
  setGameStatus: (status: GameStatus) => void,
  setLobby: (lobby: Lobby) => void,
  setIsLobbyReceived: (isLobbyReceived: boolean) => void,
  setSessionCookie:Function
): Promise<void> => {
  try {
    const { lobby }:{lobby:Lobby} = await saveGetStartGame(body);
 
    setGameStatus(lobby.gameStatus);

    setLobby(lobby);
    if (!body.playerId) {
      await rejoinRoom(lobby.hostSid);
    }

    setIsLobbyReceived(true);
  } catch (e) {
    setSessionCookie("command", "quit", { path: "/" });
    console.log("Failed to get get game at start of game! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error"+e);

    
   
  }
};

export default getStartGame;
