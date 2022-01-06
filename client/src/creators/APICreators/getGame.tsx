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
const rejoinRoom = async (hostSid: number) => {
  socket.emit("rejoin-room-after-refresh", hostSid);
};
const getGame = async (
  body: BodyProps,

  setLobby: (lobby: Lobby) => void,
  setPiece: (piece: string) => void
): Promise<void> => {
  try {
    const { lobby }: { lobby: Lobby } = await saveGetGame(body);
    if (!body.playerId) {
      await rejoinRoom(lobby.hostSid);
    }
    lobby.players.map((player: Player) => {
      if (player.playerId === body.playerId) {
        setPiece(player.piece);
      }
    });
    return setLobby(lobby);
  } catch (e) {
    console.log(e);
  }
};

export default getGame;
