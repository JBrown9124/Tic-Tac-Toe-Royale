import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
const handleBomb = (
  selectedPowerUpTiles: Move[],
  playerId: string,
  tileIdx: number,
  rowIdx: number,
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void,
  boardSize: number
) => {
  selectedPowerUpTiles = [];
  if (tileIdx + 1 < boardSize && rowIdx + 1 < boardSize) {
    selectedPowerUpTiles.push({
      playerId: playerId,
      tileIdx: tileIdx,
      rowIdx: rowIdx,
    });
    selectedPowerUpTiles.push({
      playerId: playerId,
      tileIdx: tileIdx + 1,
      rowIdx: rowIdx,
    });
    selectedPowerUpTiles.push({
      playerId: playerId,
      tileIdx: tileIdx,
      rowIdx: rowIdx + 1,
    });
    selectedPowerUpTiles.push({
      playerId: playerId,
      tileIdx: tileIdx + 1,
      rowIdx: rowIdx + 1,
    });
    setSelectedPowerUpTiles([...selectedPowerUpTiles]);
  }
};
export default handleBomb;
