import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
interface BoardProps {
  boardSize: number | number[] | any;
  boardColor: { r: number; g: number; b: number; a: number };
}
export default function Board({ boardSize, boardColor }: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [cacheBoard, setCacheBoard] = useState<number[][]>([[]]);

  const determineWinner = (rowIdx: number, tileIdx: number) => {
    cacheBoard[rowIdx][tileIdx] = 1;
    const checkVertical = () => {
      if (rowIdx + 1 <= boardSize - 1 && rowIdx - 1 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx]
        ) {
          console.log("Winner");
        }
      } else if (rowIdx - 2 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 2][tileIdx]
        ) {
          console.log("Winner");
        }
      } else if (rowIdx + 2 <= boardSize - 1) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx]
        ) {
          console.log("Winner");
        }
      }
    };
    const checkHorizontal = () => {
      if (tileIdx + 1 <= boardSize - 1 && tileIdx - 1 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 1]
        ) {
          console.log("Winner");
        }
      }
      if (tileIdx - 2 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx - 2]
        ) {
          console.log("Winner");
        }
      }
      if (tileIdx + 2 <= boardSize - 1) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx][tileIdx + 2]
        ) {
          console.log("Winner");
        }
      }
    };
    const checkDiagonal = () => {
      if (
        rowIdx + 1 <= boardSize - 1 &&
        rowIdx - 1 >= 0 &&
        tileIdx + 1 <= boardSize - 1 &&
        tileIdx - 1 >= 0
      ) {
        if (
          (cacheBoard[rowIdx][tileIdx] ===
            cacheBoard[rowIdx + 1][tileIdx + 1] &&
            cacheBoard[rowIdx][tileIdx] ===
              cacheBoard[rowIdx - 1][tileIdx - 1]) ||
          (cacheBoard[rowIdx][tileIdx] ===
            cacheBoard[rowIdx + 1][tileIdx - 1] &&
            cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx - 1][tileIdx + 1])
        ) {
          console.log("Winner");
        }
      }
      if (rowIdx + 2 <= boardSize - 1 && tileIdx - 2 >= 0) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx - 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx - 2]
        ) {
          console.log("Winner");
        }
      }
      if (rowIdx + 2 <= boardSize - 1 && tileIdx + 2 <= boardSize - 1) {
        if (
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 1][tileIdx + 1] &&
          cacheBoard[rowIdx][tileIdx] === cacheBoard[rowIdx + 2][tileIdx + 2]
        ) {
          console.log("Winner");
        }
      }
    };
    checkHorizontal();
    checkDiagonal();
    checkVertical();
  };

  const createBoard = (): void => {
    let board: number[][] = [];

    for (let i = 0; i < boardSize; i++) {
      let row: number[] = [];

      for (let j = 0; j < boardSize; j++) {
        row.push(0);
      }
      board.push(row);
    }
    // let row:  number[] = Array(boardSize).fill(0);
    // let board: number[][] = Array(boardSize).fill(row);
    console.log(board, "BOARD");
    setCacheBoard(board);
    setBoard(board);
  };
  useEffect(() => {
    createBoard();
  }, [boardColor, boardSize]);
  return (
    <>
      {board.map((row, rowIdx: number) => (
        <Grid
          key={rowIdx}
          justifyContent="center"
          container
          sx={
            {
              //   background: `rgba(${boardColor.r}, ${boardColor.g}, ${boardColor.b}, ${boardColor.a})`,
            }
          }
        >
          {row.map((tile, tileIdx: number) => (
            <Tile
              updateBoardCache={() => determineWinner(rowIdx, tileIdx)}
              value={tile}
              chosenPiece={
                <ClearOutlinedIcon sx={{ height: "40px", width: "40px" }} />
              }
              boardColor={boardColor}
            />
          ))}
        </Grid>
      ))}
    </>
  );
}
