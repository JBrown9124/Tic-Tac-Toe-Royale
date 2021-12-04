import React from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Board/Board";
import "./App.css";
import { useState } from "react";
import Settings from "./components/Settings/Settings";
function App() {
  const size = 20;
  const [pieceChoice, setPieceChoice] = useState();
  const [boardColor, setBoardColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  const [boardSize, setBoardSize] = useState<number | number[]>(3);
  const handleSetSettings = (
    sizeValue: number | number[],
    colorValue: { r: number; g: number; b: number; a: number }
  ) => {
    setBoardSize(sizeValue);
    setBoardColor(colorValue);
  };
  return (
    <>
      <Grid
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "blue",
          overflow: "auto",
        }}
      >
        <Grid container   direction="column" justifyContent="center">
          <Grid item >
            <Board boardColor={boardColor} boardSize={boardSize} />
          </Grid>
          <Grid item sx={{margin:"auto"}} >
            <Settings
              setSettings={(settingsSize, settingsColor) =>
                handleSetSettings(settingsSize, settingsColor)
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
