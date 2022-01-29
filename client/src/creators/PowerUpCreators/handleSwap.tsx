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
  setSelectedPowerUpTiles:(selectedPowerUpTiles:Move[])=>void
) => {
  if (
    selectedPowerUpTiles.length > 0 &&
    selectedPowerUpTiles[0].playerId === playerId && board[rowIdx][tileIdx] !== "FIRE" && typeof board[rowIdx][tileIdx] !== "number"
  ) {
    const selectedVerticalTiles: Move[] = await checkVertical(
      selectedPowerUp.rules.tilesAffected,
      rowIdx,
      tileIdx,
      boardSize,
      playerId,
      board,
      selectedPowerUpTiles[0]
    );
    if (selectedVerticalTiles.length > 0) {
      selectedPowerUpTiles.push(...selectedVerticalTiles);
    }
    
    const selectedHorizontalTiles = await checkHorizontal(
      selectedPowerUp.rules.tilesAffected,
      rowIdx,
      tileIdx,
      boardSize,
      playerId,
      board,
      selectedPowerUpTiles[0]
    );
    if (selectedHorizontalTiles.length > 0) {
      selectedPowerUpTiles.push(...selectedHorizontalTiles);
    }
    
    const selectLeftDiagonalTiles = await checkDiagonalLeft(
      selectedPowerUp.rules.tilesAffected,
      rowIdx,
      tileIdx,
      boardSize,
      playerId,
      board,
      selectedPowerUpTiles[0]
    );
    if (selectLeftDiagonalTiles.length > 0) {
      selectedPowerUpTiles.push(...selectLeftDiagonalTiles);
    }
    
    const selectRightDiagonalTiles = await checkDiagonalRight(
      selectedPowerUp.rules.tilesAffected,
      rowIdx,
      tileIdx,
      boardSize,
      playerId,
      board,
      selectedPowerUpTiles[0]
    );
    if (selectRightDiagonalTiles.length > 0) {
      selectedPowerUpTiles.push(...selectRightDiagonalTiles);
    }
    
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  } else if (
    selectedPowerUpTiles.length === 0 &&
    board[rowIdx][tileIdx] === playerId
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
