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
  const selectedPlayerId = board[rowIdx][tileIdx];
  if (
    selectedPowerUpTiles.length > 0 &&
    (selectedPowerUpTiles[0].rowIdx !== rowIdx ||
      selectedPowerUpTiles[0].tileIdx !== tileIdx) &&
      selectedPlayerId   !== playerId &&
    typeof selectedPlayerId  === "string" && selectedPlayerId.substring(0,4) !== "FIRE"
  ) {
    const player = board[rowIdx][tileIdx];
    selectedPowerUpTiles.push({
      playerId: selectedPlayerId ,
      tileIdx: tileIdx,
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
      tileIdx: tileIdx,
      rowIdx: rowIdx,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handleSwap;
