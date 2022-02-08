import { Lobby } from "../../../Models/Lobby";
import {Player} from "../../../Models/Player";
import {powerUps} from "../../../storage/powerUps"
import { RefObject } from "react";
const updatePlayerJoinLobby =(lobbyRef: RefObject<Lobby>, newPlayer:Player,setLobby:(lobby:Lobby) =>void)=>{
    const lobbyCopy = lobbyRef.current;
    if (lobbyCopy){
    let playerExists = lobbyCopy.players.filter((player: Player) => {
      return player.playerId === newPlayer.playerId;
    });

    const isNewPlayerBot = newPlayer.playerId.substring(0, 3) === "BOT";
    if (playerExists.length === 0) {
      lobbyCopy.players.push({
        name: newPlayer.name,
        playerId: newPlayer.playerId,
        piece: isNewPlayerBot ? newPlayer.piece : "",
        isHost: false,
        inventory: powerUps,
        playerLoaded: isNewPlayerBot ? true : false,
        isReady: isNewPlayerBot ? true : false,
        sessionId: newPlayer.sessionId,
      });
      setLobby({ ...lobbyCopy });
    }
}
}
export default updatePlayerJoinLobby