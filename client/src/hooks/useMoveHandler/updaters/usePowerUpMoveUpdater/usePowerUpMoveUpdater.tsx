import { GameStatus } from "../../../../Models/GameStatus";
import { useMemo, useState, useContext } from "react";
import useSound from "use-sound";
import {VolumeContext} from "../../../../storage/VolumeContext"
import fireUpdater from "../../updaters/usePowerUpMoveUpdater/fireUpdater";
import cleaveArrowUpdater from "../../updaters/usePowerUpMoveUpdater/cleaveArrowUpdater";
import bombUpdater from "../../updaters/usePowerUpMoveUpdater/bombUpdater";

export default function usePowerUpMoveUpdater(
  gameStatus: GameStatus,
  board: (string | number)[][],
  playerId: string
) {
  const volume:number = useContext(VolumeContext)
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3",
    { volume: volume }
  );

  const [playFireSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/fireSound.mp3",
    { volume: volume }
  );
  const [playArrowSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/arrowSound.mp3",
    { volume: volume }
  );
  const [playBombSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/bombSound.mp3",
    { volume: volume }
  );
  const [playCleaveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/cleaveSound.mp3",
    { volume: volume }
  );

  const [count, setCount] = useState(1);

  useMemo(() => {
    if (gameStatus.newMove.playerId !== playerId && gameStatus.newMove.playerId.length>0) {
      startOtherPlayerMoveSound();
    }

    // Fire spread updater
    if (gameStatus.fireTiles.length > 0) {
      gameStatus?.fireTiles?.forEach((tile) => {
        board[tile.rowIdx][tile.columnIdx] = tile.playerId;
      });
    }

    // Move updater
    if (gameStatus.newMove.playerId !== "") {
   
      board[gameStatus.newMove.rowIdx][gameStatus.newMove.columnIdx] =
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
