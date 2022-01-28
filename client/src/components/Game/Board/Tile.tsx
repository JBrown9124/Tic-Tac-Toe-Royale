import Grid from "@mui/material/Grid";
import { useState, useEffect, useRef } from "react";
import { RgbaColor } from "react-colorful";
import { GameStatus } from "../../../Models/GameStatus";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Player } from "../../../Models/Player";
import { PowerUp } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import handlePowerUps from "../../../creators/PowerUpCreators/handlePowerUps";
import {
  checkHorizontal,
  checkVertical,
  checkDiagonalLeft,
  checkDiagonalRight,
} from "../../../creators/PowerUpCreators/safeSelectHelper";
import {
  sizeOfPiece,
  mobileSizeOfPiece,
  determineSizeOfPiece,
} from "../../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";
interface TileProps {
  chosenPiece: JSX.Element | string | undefined;
  boardColor: RgbaColor;

  value: number | JSX.Element | string;
  playerPieces: Player[];
  rowIdx: number;
  tileIdx: number;
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
  powerOrMove: string;
}
export const Tile = ({
  boardColor,
  chosenPiece,
  value,
  updateBoardCache,
  rowIdx,
  tileIdx,
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
  powerOrMove,
}: TileProps) => {
  const [tile, setTile] = useState<{
    value: String | JSX.Element | number | undefined;
  }>({ value: value });
  const [startSnare] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourMoveSound.mp3"
  );
  const [count, setCount] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = async () => {
    if (typeof value === "number" && powerOrMove === "Move") {
      // setTile({ value: chosenPiece });

      startSnare();
      updateBoardCache();
      selectedPowerUpTiles = [];
      setIsSelected(false);
    }
    handlePowerUps({
      selectedPowerUp,
      selectedPowerUpTiles,
      playerId,
      tileIdx,
      rowIdx,
      setSelectedPowerUpTiles,
      boardSize,
      board,
      setIsSelected
    });
  };

  //Clear tiles select status
  useEffect(() => {
    selectedPowerUpTiles.forEach((tile) => {
      if (tile.rowIdx === rowIdx && tile.tileIdx === tileIdx) {
        setIsSelected(true);
      }
    });
    if (selectedPowerUpTiles.length === 0) {
      setIsSelected(false);
    }
  }, [rowIdx, selectedPowerUpTiles.length, tileIdx]);
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
        // justifyContent={{ xs: "center", md: "normal" }}
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
        <Grid item sx={{}}>
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
