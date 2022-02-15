import { Lobby } from "../../../Models/Lobby";
import {Player} from "../../../Models/Player";
import {powerUps} from "../../../storage/powerUps"
import { RefObject } from "react";
const updatePlayerJoinLobby =async (lobbyRef: RefObject<Lobby>, newPlayer:Player,setLobby:(lobby:Lobby) =>void)=>{
    const lobbyCopy = lobbyRef.current;
    if (lobbyCopy){
   
    // let playerExists = lobbyCopy.players.filter((player: Player) => {
    //   return player.playerId === newPlayer.playerId;
    // });
    const scan = new Promise((resolve, reject) => {
      let doesPlayerExist = false
      for (var i = lobbyCopy.players.length; i--; ) {
        if (lobbyCopy.players[i].playerId === newPlayer.playerId) {
          doesPlayerExist = true
          resolve(doesPlayerExist);
        }
      }
      resolve(doesPlayerExist);
    });
    const doesPlayerExist = await scan
    const isNewPlayerBot = newPlayer.playerId.substring(0, 3) === "BOT";
    if (!doesPlayerExist) {
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