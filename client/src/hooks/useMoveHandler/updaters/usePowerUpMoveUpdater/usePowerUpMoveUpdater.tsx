import {GameStatus} from "../../../../Models/GameStatus"
import {useMemo, useState} from "react"
import useSound from "use-sound"
import fireUpdater from "../../updaters/usePowerUpMoveUpdater/fireUpdater";
import cleaveArrowUpdater from "../../updaters/usePowerUpMoveUpdater/cleaveArrowUpdater";
import bombUpdater from "../../updaters/usePowerUpMoveUpdater/bombUpdater";

export default function usePowerUpMoveUpdater(gameStatus:GameStatus,board:(string|number)[][]){
    const [startOtherPlayerMoveSound] = useSound(
        process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
      );
     
      const [playFireSound] = useSound(
        process.env.PUBLIC_URL + "static/assets/sounds/fireSound.mp3"
      );
      const [playArrowSound] = useSound(
        process.env.PUBLIC_URL + "static/assets/sounds/arrowSound.mp3"
      );
      const [playBombSound] = useSound(
        process.env.PUBLIC_URL + "static/assets/sounds/bombSound.mp3"
      );
      const [playCleaveSound] = useSound(
        process.env.PUBLIC_URL + "static/assets/sounds/cleaveSound.mp3"
      );
    
      const [count, setCount] = useState(1);
    
      useMemo(() => {
        if (gameStatus.newMove.playerId === gameStatus.whoTurn) {
          startOtherPlayerMoveSound();
        }
    
        // Fire spread updater
        if (gameStatus.fireTiles.length > 0) {
          gameStatus?.fireTiles?.forEach((tile) => {
            board[tile.rowIdx][tile.tileIdx] = tile.playerId;
          });
        }
    
        // Move updater
        if (gameStatus.newMove.playerId !== "") {
          board[gameStatus.newMove.rowIdx][gameStatus.newMove.tileIdx] =
            gameStatus.newMove.playerId;
        }
    
        if (gameStatus?.newPowerUpUse?.selectedPowerUpTiles?.length !== 0)
          switch (gameStatus?.newPowerUpUse?.powerUp?.name) {
            case "fire":
              fireUpdater(board, gameStatus, playFireSound);
              break;
            case "arrow":
              cleaveArrowUpdater(gameStatus, board, playArrowSound);
              break;
            case "cleave":
              cleaveArrowUpdater(gameStatus, board, playCleaveSound);
    
              break;
            case "bomb":
              bombUpdater(gameStatus, board, playBombSound);
              break;
          }
        setCount((state: number) => state + 1);
      }, [gameStatus.newMove, gameStatus.newPowerUpUse]);
}