import { useMemo } from "react";
import { GameStatus } from "../../../Models/GameStatus";
import { Player } from "../../../Models/Player";
import useSound from "use-sound";
export default function useTurnOrderUpdater(
playerId: string,
  isBoardCreated: boolean,
  gameStatus: GameStatus,
  playerPieces: Player[],
  displayPlayerPieces: Player[]
  
) {
  const [playYourTurnSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourTurnSound.mp3"
  );
  
  useMemo(() => {
    let playerWhosTurnItIs = displayPlayerPieces[displayPlayerPieces.length - 1];
    if (isBoardCreated && playerWhosTurnItIs?.playerId !== gameStatus.whoTurn) {
      let poppedPlayer = displayPlayerPieces.pop();

      if (poppedPlayer) {
        displayPlayerPieces.unshift(poppedPlayer);
      }
    }
    if (playerId === gameStatus.whoTurn) {
      playYourTurnSound();
    }
  }, [gameStatus.whoTurn]);
}
