import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SpaceHover from "../animators/SpaceHover";
import { useState, useEffect } from "react";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
interface Board {
  size: number;
  boardColor: { r: number; g: number; b: number; a: number };
}
export default function Board({ size, boardColor }: Board) {
  const [board, setBoard] = useState<number[][]>([[]]);

  const selectTile = (rowIdx: number, tileIdx: number) => {
    board[rowIdx][tileIdx] = 1;
    setBoard([...board]);
  };
  const createBoard = () => {
    let board = [];

    for (let i = 0; i < size; i++) {
      let row = [];

      for (let j = 0; j < size; j++) {
        row.push(0);
      }
      board.push(row);
    }
    console.log(board);
    return setBoard(board);
  };
  useEffect(() => {
    createBoard();
  }, [size]);
  return (
    <>
      <Grid
        item
        sx={{
          justifyContent: "center",
          margin: "auto",
          textAlign: "center",
        }}
      >
        {board.map((row: any, rowIdx: number) => (
          <Grid
            key={rowIdx}
            container
            sx={{
              //   background: `rgba(${boardColor.r}, ${boardColor.g}, ${boardColor.b}, ${boardColor.a})`,
              border: "solid black 1px",
              justifyContent: "center",
              margin: "auto",
              textAlign: "center",
            }}
          >
            {row.map((tile: any, tileIdx: number) => (
              <SpaceHover beforeColor={boardColor}>
                <Grid
                  onClick={() => selectTile(rowIdx, tileIdx)}
                  item
                  container
                  direction="column"
                  sx={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    border: "solid black 1px",
                  }}
                >
                 <Grid item sx={{}}>
                    {tile === 0
                      ? " "
                      : tile === 1
                      ? <ClearOutlinedIcon sx={{width: "40px", height: "40px"}}/>
                      : tile === 2
                      ? <CircleOutlinedIcon/>
                      : " "}
                </Grid>
                </Grid>
              </SpaceHover>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
