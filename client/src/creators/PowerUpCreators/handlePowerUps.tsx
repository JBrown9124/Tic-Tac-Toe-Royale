import { PowerUp } from "../../Models/PowerUp";
import { Move } from "../../Models/Move";
import handleBomb from "./handleBomb";
import handlePiercingArrow from "./handlePiercingArrow";
import handleSwap from "./handleSwap";
import handleFire from "./handleFire";
import handleCleave from "./handleCleave";
interface handlePowerUpArgs {
  selectedPowerUp: PowerUp;
  selectedPowerUpTiles: Move[];
  playerId: string;
  columnIdx: number;
  rowIdx: number;
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  boardSize: number;
  board: (number | string)[][];
  setIsSelected: (isSelected: boolean) => void;
}
const handlePowerUps = async ({
  selectedPowerUp,
  selectedPowerUpTiles,
  playerId,
  columnIdx,
  rowIdx,
  setSelectedPowerUpTiles,
  boardSize,
  board,
  setIsSelected,
}: handlePowerUpArgs) => {
  const caster = selectedPowerUp.rules.affectsCaster ? 1 : 0;
  if (
    selectedPowerUpTiles.length === 1 &&
    columnIdx === selectedPowerUpTiles[0].columnIdx &&
    rowIdx === selectedPowerUpTiles[0].rowIdx
  ) {
    return setSelectedPowerUpTiles([]);
  
  }
  if (
    selectedPowerUpTiles.length <
    selectedPowerUp.rules.tilesAffected + caster
  ) {
    switch (selectedPowerUp.name) {
      case "bomb":
        handleBomb(
          selectedPowerUpTiles,
          playerId,
          columnIdx,
          rowIdx,
          setSelectedPowerUpTiles,
          boardSize
        );
        break;

      case "arrow":
        handlePiercingArrow(
          selectedPowerUpTiles,
          playerId,
          selectedPowerUp,
          rowIdx,
          columnIdx,
          boardSize,
          board,
          setSelectedPowerUpTiles
        );
        break;

      case "swap":
        handleSwap(
          selectedPowerUpTiles,
          playerId,
          selectedPowerUp,
          rowIdx,
          columnIdx,
          boardSize,
          board,
          setSelectedPowerUpTiles
        );
        break;

      case "fire":
        handleFire(
          selectedPowerUpTiles,
          board,
          rowIdx,
          columnIdx,
          playerId,
          setSelectedPowerUpTiles
        );
        break;

      case "cleave":
        handleCleave(
          selectedPowerUpTiles,
          playerId,
          rowIdx,
          columnIdx,
          boardSize,
          board,
          setSelectedPowerUpTiles
        );
    }
  } else {
    setSelectedPowerUpTiles([]);
  }
};
export default handlePowerUps;
