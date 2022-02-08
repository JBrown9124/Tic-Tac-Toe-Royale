import joinLobby from "../APICreators/joinLobby";
import { Player } from "../../Models/Player";
import { Lobby } from "../../Models/Lobby";
const handleAddBot = (
  players: Player[],
  lobbyId: number,
  setLobby: (lobby: Lobby) => void,
  playAddBotSound: () => void
) => {
  const botsInLobby = players.filter((player) => {
    return player?.playerId?.substring(0, 3) === "BOT";
  });

  const createBot = async () => {
    const reqBody = {
      lobbyId: lobbyId,
      playerName: "BOTPASSPASS",
      sessionId: null,
    };
    const response = await joinLobby(reqBody);
    if (typeof response !== "string") {
      setLobby(response.lobby);
    }
  };
  if (botsInLobby.length < 10) {
    createBot();
    playAddBotSound();
  }
};
export default handleAddBot;
