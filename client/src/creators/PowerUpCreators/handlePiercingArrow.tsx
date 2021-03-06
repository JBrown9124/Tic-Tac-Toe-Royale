import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
import {
  checkHorizontal,
  checkVertical,
  checkDiagonalLeft,
  checkDiagonalRight,
} from "./safeSelectHelper";
const handlePiercingArrow = async (
  selectedPowerUpTiles: Move[],
  playerId: string,
  selectedPowerUp: PowerUp,
  rowIdx: number,
  columnIdx: number,
  boardSize: number,
  board: (number | string)[][],
  setSelectedPowerUpTiles: (selectedPowerUpTiles:Move[]) => void,
) => {
  if (
    selectedPowerUpTiles.length > 0 &&
    selectedPowerUpTiles[0].playerId === playerId
  ) {
    const selectedVerticalTiles: Move[] = await checkVertical(
      selectedPowerUp.rules.tilesAffected,
      rowIdx,
      columnIdx,
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
      columnIdx,
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
      columnIdx,
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
      columnIdx,
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
    board[rowIdx][columnIdx] === playerId
  ) {
    selectedPowerUpTiles.push({
      playerId: playerId,
      columnIdx: columnIdx,
      rowIdx: rowIdx,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handlePiercingArrow;
