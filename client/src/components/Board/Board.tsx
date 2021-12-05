import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import determineWinner from "../../creators/determineWinner"
import createBoard from "../../creators/createBoard"
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
interface BoardProps {
  boardSize: number | number[] | any;
  boardColor: { r: number; g: number; b: number; a: number };
}
export default function Board({ boardSize, boardColor }: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [cacheBoard, setCacheBoard] = useState<number[][]>([[]]);

  
  useEffect(() => {
    createBoard(setCacheBoard, setBoard, boardSize);
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
              updateBoardCache={() => determineWinner(rowIdx, tileIdx, cacheBoard, boardSize)}
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
