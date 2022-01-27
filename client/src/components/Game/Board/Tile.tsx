import Grid from "@mui/material/Grid";
import { useState, useEffect, useRef } from "react";
import { RgbaColor } from "react-colorful";
import { GameStatus } from "../../../Models/GameStatus";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Player } from "../../../Models/Player";
import { PowerUp } from "../../../Models/PowerUp";
import { NewMove } from "../../../Models/NewMove";
import {
  checkHorizontal,
  checkVertical,
  checkDiagonalLeft,
  checkDiagonalRight,
} from "../../../creators/BoardCreators/checkMoveHelper";
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
  selectedPowerUpTiles: NewMove[];
  setSelectedPowerUpTiles: (selectedPowerUpTiles: NewMove[]) => void;
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
    const caster = selectedPowerUp.rules.affectsCaster ? 1 : 0;

    if (
      selectedPowerUpTiles.length <
      selectedPowerUp.rules.tilesAffected + caster
    ) {
      switch (selectedPowerUp.name) {
        case "bomb":
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
          break;

        case "piercing arrow":
          if (
            selectedPowerUpTiles.length > 0 &&
            selectedPowerUpTiles[0].playerId === playerId
          ) {
            const selectedVerticalTiles: NewMove[] = await checkVertical(
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
          break;
        case "swap":
          if (
            selectedPowerUpTiles.length > 0 &&
            selectedPowerUpTiles[0].playerId === playerId
          ) {
            const selectedVerticalTiles: NewMove[] = await checkVertical(
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
          break;
        case "fire":
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
          break;
        case "cleave":
          if (
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
          if (selectedPowerUpTiles.length > 0) {
            //right of player tile
            if (
              selectedPowerUpTiles[0].tileIdx === tileIdx - 1 &&
              selectedPowerUpTiles[0].rowIdx === rowIdx &&
              rowIdx - 1 > 0 &&
              rowIdx + 1 < boardSize - 1
            ) {
              selectedPowerUpTiles.push({
                playerId: playerId,
                tileIdx: tileIdx,
                rowIdx: rowIdx - 1,
              });
              selectedPowerUpTiles.push({
                playerId: playerId,
                tileIdx: tileIdx,
                rowIdx: rowIdx,
              });
              selectedPowerUpTiles.push({
                playerId: playerId,
                tileIdx: tileIdx,
                rowIdx: rowIdx + 1,
              });
              setSelectedPowerUpTiles([...selectedPowerUpTiles]);
              // left of player tile
            } else if (
              selectedPowerUpTiles[0].tileIdx === tileIdx + 1 &&
              selectedPowerUpTiles[0].rowIdx === rowIdx &&
              rowIdx - 1 > 0 &&
              rowIdx + 1 < boardSize - 1
            ) {
              selectedPowerUpTiles.push({
                playerId: playerId,
                tileIdx: tileIdx,
                rowIdx: rowIdx - 1,
              });
              selectedPowerUpTiles.push({
                playerId: playerId,
                tileIdx: tileIdx,
                rowIdx: rowIdx,
              });
              selectedPowerUpTiles.push({
                playerId: playerId,
                tileIdx: tileIdx,
                rowIdx: rowIdx + 1,
              });
              setSelectedPowerUpTiles([...selectedPowerUpTiles]);
            }
          }
      }
    } else {
      setSelectedPowerUpTiles([]);
    }
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
          {value === playerId
            ? chosenPiece
            : playerPieces?.map((playerPiece) => {
                if (playerPiece.playerId === value) return playerPiece.piece;
              })}
        </Grid>
      </Grid>
    </>
  );
};
