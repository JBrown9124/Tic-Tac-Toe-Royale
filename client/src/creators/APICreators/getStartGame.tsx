import { socket } from "../../socket";
import axios, { AxiosResponse } from "axios";
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
  setIsLobbyReceived: (isLobbyReceived: boolean) => void
) => {
  try {
    const { lobby } = await saveGetStartGame(body);
    console.log(lobby,"GETSTARTGAMELOBBY")
    setGameStatus(lobby.gameStatus);

    setLobby(lobby);
    if (!body.playerId){
      await rejoinRoom(lobby.hostSid)
    } 
    
    return setIsLobbyReceived(true);
  } catch (e) {
    console.log(e);
  }
};

export default getStartGame;
