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
  columnIdx: number,
  boardSize: number,
  board: (string | number)[][],
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void
) => {
  const selectedPlayerId = board[rowIdx][columnIdx];
  if (
    selectedPowerUpTiles.length > 0 &&
    (selectedPowerUpTiles[0].rowIdx !== rowIdx ||
      selectedPowerUpTiles[0].columnIdx !== columnIdx) &&
      selectedPlayerId   !== playerId &&
    typeof selectedPlayerId  === "string" && selectedPlayerId.substring(0,4) !== "FIRE"
  ) {
    const player = board[rowIdx][columnIdx];
    selectedPowerUpTiles.push({
      playerId: selectedPlayerId ,
      columnIdx: columnIdx,
      rowIdx: rowIdx,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  } else if (
    selectedPowerUpTiles.length === 0 &&
    selectedPlayerId  !== playerId &&
    typeof selectedPlayerId  === "string" && selectedPlayerId.substring(0,4) !== "FIRE"
  ) {
    
    selectedPowerUpTiles.push({
      playerId: selectedPlayerId ,
      columnIdx: columnIdx,
      rowIdx: rowIdx,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handleSwap;
