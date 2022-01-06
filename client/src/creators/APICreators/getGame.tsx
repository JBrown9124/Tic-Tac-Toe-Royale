import { socket } from "../../socket";
import axios, { AxiosResponse } from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";
import { Player } from "../../Models/Player";
interface BodyProps {
  lobbyId: number;
  playerId: string | null;
  hostSid: number;
}
const saveGetGame = async (body: any) => {
  const { data } = await axios.get(`${url}/api/game`, {
    params: body,
  });
  return data;
};
const rejoinRoom = async (data: any) => {
  socket.emit("rejoin-room-after-refresh", data.hostSid);
};
const getGame = async (
  body: BodyProps,
  
  setLobby: (lobby: Lobby) => void,
  setPiece: (piece: string) => void
) => {
  try {
    const { lobby } = await saveGetGame(body);
    if (!body.playerId){
      await rejoinRoom(lobby)
    } 
    
    setLobby(lobby);
    return lobby.players.map((player: Player) => {
      if (player.playerId === body.playerId) {
        setPiece(player.piece);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default getGame;
