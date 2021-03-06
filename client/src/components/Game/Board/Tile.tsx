import Grid from "@mui/material/Grid";
import { useState, useEffect, useRef, useContext} from "react";
import { RgbaColor } from "react-colorful";
import { GameStatus } from "../../../Models/GameStatus";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Player } from "../../../Models/Player";
import { PowerUp } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import handlePowerUps from "../../../creators/PowerUpCreators/handlePowerUps";
import {VolumeContext} from "../../../storage/VolumeContext"
import { useSound } from "use-sound";
interface TileProps {
  chosenPiece: JSX.Element | string | undefined;
  boardColor: RgbaColor;

  value: number | JSX.Element | string;
  playerPieces: Player[];
  rowIdx: number;
  columnIdx: number;
  updateBoardCache: () => void;
  gameStatus: GameStatus;
  sizeOfBoardPiece: { mobile: string; desktop: string };
  playerId: string;
  selectedPowerUpTiles: Move[];
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  selectedPowerUp: PowerUp;
  board: (number | string)[][];
  boardSize: number;
  isUsingPowerUp: boolean;
  // powerOrMove: string;
}
export const Tile = ({
  boardColor,
  chosenPiece,
  value,
  updateBoardCache,
  rowIdx,
  columnIdx,
  playerPieces,
  gameStatus,

  playerId,
  sizeOfBoardPiece,
  selectedPowerUpTiles,
  setSelectedPowerUpTiles,
  selectedPowerUp,
  board,
  boardSize,
  isUsingPowerUp,
}: // powerOrMove,
TileProps) => {
  const volume = useContext(VolumeContext)
  const [startSnare] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourMoveSound.mp3", {volume:volume}
  );
  const [isSelected, setIsSelected] = useState(false);
  const playerAttackPieceSelected =
    selectedPowerUpTiles.length > 1 &&
    (selectedPowerUp.name === "cleave" || selectedPowerUp.name === "arrow") &&
    columnIdx === selectedPowerUpTiles[0].columnIdx &&
    rowIdx === selectedPowerUpTiles[0].rowIdx;
  const handleClick = async () => {
    
    if (typeof value === "number" && !isUsingPowerUp) {
      startSnare();
      updateBoardCache();
      setSelectedPowerUpTiles([]);
      setIsSelected(false);
    }
    
    if (selectedPowerUp.quantity > 0 && isUsingPowerUp) {
      handlePowerUps({
        selectedPowerUp,
        selectedPowerUpTiles,
        playerId,
        columnIdx,
        rowIdx,
        setSelectedPowerUpTiles,
        boardSize,
        board,
        setIsSelected,
      });
    }
  };

  //Clear tiles select status
  useEffect(() => {
    selectedPowerUpTiles.forEach((tile) => {
      if (tile.rowIdx === rowIdx && tile.columnIdx === columnIdx) {
        setIsSelected(true);
      }
    });
    if (selectedPowerUpTiles.length === 0) {
      setIsSelected(false);
    }
    if (playerAttackPieceSelected) {
      setIsSelected(false);
    }
  }, [rowIdx, selectedPowerUpTiles.length, columnIdx]);
  useEffect(() => {
    setIsSelected(false);
    selectedPowerUpTiles = [];
  }, [gameStatus.whoTurn]);
  return (
    <>
      <Grid
        onClick={() =>
          gameStatus.whoTurn === playerId && !gameStatus.win.whoWon
            ? handleClick()
            : ""
        }
        item
        container
        maxWidth="sm"
        maxHeight="sm"
        textAlign="center"
        direction="column"
        sx={{
          height: sizeOfBoardPiece.mobile,
          width: sizeOfBoardPiece.mobile,
          maxHeight: sizeOfBoardPiece.desktop,
          maxWidth: sizeOfBoardPiece.desktop,
          cursor: "pointer",
          border: `solid ${isSelected ? "1px" : "1px"}`,
          boxShadow: 7,
          borderRadius:"5px",
          borderColor: isSelected
            ? selectedPowerUp.selectColor
            : boardColor?.r * 0.299 +
                boardColor?.g * 0.587 +
                boardColor?.b * 0.114 >
              186
            ? "black"
            : "white",
        }}
      >
        <Grid item sx={{ }}>
          {isSelected ? (
            <img
              src={selectedPowerUp.imgUrl}
              alt={selectedPowerUp.imgUrl}
              style={{
                height: sizeOfBoardPiece.mobile,
                width: sizeOfBoardPiece.mobile,
                maxHeight: sizeOfBoardPiece.desktop,
                maxWidth: sizeOfBoardPiece.desktop,
              }}
            />
          ) : typeof value === "string" && value.substring(0, 4) === "FIRE" ? (
            <img
              style={{
                height: sizeOfBoardPiece.mobile,
                width: sizeOfBoardPiece.mobile,
                maxHeight: sizeOfBoardPiece.desktop,
                maxWidth: sizeOfBoardPiece.desktop,
                borderRadius:"5px"
              }}
              src={"https://c.tenor.com/VbezPY1TRaMAAAAC/fire-flames.gif"}
              alt={"fire"}
            />
          ) : value === playerId ? (
            chosenPiece
          ) : (
            playerPieces?.map((playerPiece) => {
              if (playerPiece.playerId === value) return playerPiece.piece;
            })
          )}
        </Grid>
      </Grid>
    </>
  );
};
