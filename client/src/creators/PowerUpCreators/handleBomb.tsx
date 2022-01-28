import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
const handleBomb = (
  selectedPowerUpTiles: Move[],
  playerId: string,
  tileIdx: number,
  rowIdx: number,
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void
) => {
  selectedPowerUpTiles = [];
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
};
export default handleBomb;
