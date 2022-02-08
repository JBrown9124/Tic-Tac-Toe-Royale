import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
const handleBomb = (
  selectedPowerUpTiles: Move[],
  playerId: string,
  columnIdx: number,
  rowIdx: number,
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void,
  boardSize: number
) => {
  selectedPowerUpTiles = [];
  if (columnIdx + 1 < boardSize && rowIdx + 1 < boardSize) {
    selectedPowerUpTiles.push({
      playerId: playerId,
      columnIdx: columnIdx,
      rowIdx: rowIdx,
    });
    selectedPowerUpTiles.push({
      playerId: playerId,
      columnIdx: columnIdx + 1,
      rowIdx: rowIdx,
    });
    selectedPowerUpTiles.push({
      playerId: playerId,
      columnIdx: columnIdx,
      rowIdx: rowIdx + 1,
    });
    selectedPowerUpTiles.push({
      playerId: playerId,
      columnIdx: columnIdx + 1,
      rowIdx: rowIdx + 1,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handleBomb;
