import { socket } from "../../socket";
import axios from "axios";
import url from "../../storage/url";
import { Lobby } from "../../Models/Lobby";
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

const getLobby = async (
  body: BodyProps,

  setLobby: (lobby: Lobby) => void,
  setPiece: (piece: string) => void,
  
): Promise<void> => {
  try {
    const { lobby }: { lobby: Lobby } = await saveGetGame(body);
    
    lobby.players.map((player: Player) => {
      if (
        typeof player.piece === "string" &&
        player.playerId === body.playerId
      ) {
        setPiece(player.piece);
      }
    });
    return setLobby(lobby);
  } catch (e) {
 
    console.log(
      "Failed to get game while in lobby! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error" +
        e
    );
    

  }
};

export default getLobby;
