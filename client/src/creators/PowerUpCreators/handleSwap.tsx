import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
import {
  checkHorizontal,
  checkVertical,
  checkDiagonalLeft,
  checkDiagonalRight,
} from "./safeSelectHelper";
const handleSwap = async (
  selectedPowerUpTiles: Move[],
  playerId: string,
  selectedPowerUp: PowerUp,
  rowIdx: number,
  tileIdx: number,
  boardSize: number,
  board: (string | number)[][],
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void
) => {
  if (
    selectedPowerUpTiles.length > 0 &&
    (selectedPowerUpTiles[0].rowIdx !== rowIdx ||
    selectedPowerUpTiles[0].tileIdx !== tileIdx) &&
    board[rowIdx][tileIdx] !== playerId &&
    typeof board[rowIdx][tileIdx] !== "number"
  ) {
    selectedPowerUpTiles.push({
      playerId: playerId,
      tileIdx: tileIdx,
      rowIdx: rowIdx,
    });
   setSelectedPowerUpTiles([...selectedPowerUpTiles])
  } else if (
    selectedPowerUpTiles.length === 0 &&
    board[rowIdx][tileIdx] !== playerId
  ) {
    selectedPowerUpTiles.push({
      playerId: playerId,
      tileIdx: tileIdx,
      rowIdx: rowIdx,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handleSwap;
