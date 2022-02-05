import {GameStatus} from "../../../../Models/GameStatus"
const fireUpdater=(board:(string|number)[][], gameStatus:GameStatus, playFireSound:()=>void)=>{
    board[gameStatus.newPowerUpUse.selectedPowerUpTiles[0].rowIdx][
        gameStatus.newPowerUpUse.selectedPowerUpTiles[0].tileIdx
      ] = "FIRE";
      playFireSound();
}
export default fireUpdater