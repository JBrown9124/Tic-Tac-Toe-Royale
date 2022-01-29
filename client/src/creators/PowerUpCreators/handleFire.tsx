import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
const handleFire = (
  selectedPowerUpTiles: Move[],
  board: (string | number)[][],
  rowIdx: number,
  tileIdx: number,
  playerId: string,
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void
) => {
  if (
    selectedPowerUpTiles.length === 0 &&
    typeof board[rowIdx][tileIdx] === "number"
  ) {
    selectedPowerUpTiles.push({
      playerId: playerId,
      tileIdx: tileIdx,
      rowIdx: rowIdx,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handleFire;
