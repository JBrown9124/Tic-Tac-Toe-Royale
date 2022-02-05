import getRandomInt from "../../../../utilities/getRandomInt"
import {GameStatus} from "../../../../Models/GameStatus"
import {powerUps} from "../../../../storage/powerUps"
 const cleaveArrowUpdater = (gameStatus: GameStatus, board:(string|number)[][], playSound:()=>void) =>{
    const powerUpsAmount = Object.keys(powerUps).length
    for (
        let i = 0;
        i < gameStatus.newPowerUpUse.selectedPowerUpTiles.length;
        i++
      ) {
        board[gameStatus.newPowerUpUse.selectedPowerUpTiles[i].rowIdx][
          gameStatus.newPowerUpUse.selectedPowerUpTiles[i].tileIdx
        ] = getRandomInt(1, powerUpsAmount);
      }
      playSound();
}
export default cleaveArrowUpdater