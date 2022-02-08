import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
const handleFire = (
  selectedPowerUpTiles: Move[],
  board: (string | number)[][],
  rowIdx: number,
  columnIdx: number,
  playerId: string,
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void
) => {
  if (
    selectedPowerUpTiles.length === 0 &&
    typeof board[rowIdx][columnIdx] === "number"
  ) {
    selectedPowerUpTiles.push({
      playerId: playerId,
      columnIdx: columnIdx,
      rowIdx: rowIdx,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handleFire;
