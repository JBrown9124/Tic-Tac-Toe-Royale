import { useMemo, useContext } from "react";
import { GameStatus } from "../../../Models/GameStatus";
import { Player } from "../../../Models/Player";
import useSound from "use-sound";
import {VolumeContext} from "../../../storage/VolumeContext"
export default function useTurnOrderUpdater(
playerId: string,
  isBoardCreated: boolean,
  gameStatus: GameStatus,
  playerPieces: Player[],
  displayPlayerPieces: Player[]
  
) {
  const volume:number = useContext(VolumeContext)
  const [playYourTurnSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourTurnSound.mp3", {volume:volume}
  );
  
  useMemo(() => {
    let displayPlayerWhosTurnItIs = displayPlayerPieces[displayPlayerPieces.length - 1];
    if (isBoardCreated && displayPlayerWhosTurnItIs?.playerId !== gameStatus.whoTurn) {
      let poppedDisplayedPlayer = displayPlayerPieces.pop();

      if (poppedDisplayedPlayer) {
        displayPlayerPieces.unshift(poppedDisplayedPlayer);
      }
    }
    
    let playerWhosTurnItIs = playerPieces[playerPieces.length - 1];
    if (isBoardCreated && playerWhosTurnItIs?.playerId !== gameStatus.whoTurn) {
      let poppedPlayer = playerPieces.pop();

      if (poppedPlayer) {
        playerPieces.unshift(poppedPlayer);
      }
    }
    if (playerId === gameStatus.whoTurn) {
      playYourTurnSound();
    }
  }, [gameStatus.whoTurn]);
}
