import getRandomInt from "../../../../utilities/getRandomInt"
import {GameStatus} from "../../../../Models/GameStatus"
import {powerUps} from "../../../../storage/powerUps"
const bombUpdater = (gameStatus: GameStatus, board:(string|number)[][], playBombSound:()=>void)=>{
    const powerUpsAmount = Object.keys(powerUps).length

    for (
        let i = 0;
        i < gameStatus.newPowerUpUse.selectedPowerUpTiles.length;
        i++
      ) {
        board[gameStatus.newPowerUpUse.selectedPowerUpTiles[i].rowIdx][
          gameStatus.newPowerUpUse.selectedPowerUpTiles[i].columnIdx
        ] = getRandomInt(1, powerUpsAmount);
      }
      playBombSound();
}
export default bombUpdater