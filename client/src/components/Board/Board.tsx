import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import determineWinner from "../../creators/determineWinner";
import createBoard from "../../creators/createBoard";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {RgbaColor} from "react-colorful";

interface BoardProps {
  boardSize: number | number[] | any;
  boardColor: RgbaColor;
  pieceChoice: JSX.Element;
}
export default function Board({ boardSize, boardColor, pieceChoice}: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [cacheBoard, setCacheBoard] = useState<number[][]>([[]]);

  useEffect(() => {
    createBoard(setCacheBoard, setBoard, boardSize);
  }, [boardColor, boardSize]);
  return (
    <>
      {board.map((row, rowIdx: number) => (
        <Grid key={rowIdx} justifyContent="center" container>
          {row.map((tile, tileIdx: number) => (
            <Tile
            key={tileIdx}
              updateBoardCache={() =>
                determineWinner(rowIdx, tileIdx, cacheBoard, boardSize)
              }
              value={tile}
              chosenPiece={
                pieceChoice
              }
              boardColor={boardColor}
            />
          ))}
        </Grid>
      ))}
    </>
  );
}
