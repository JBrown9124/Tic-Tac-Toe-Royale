import React from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Board";
import "./App.css";
import { useState } from "react";
import ChooseColor from "./components/ChooseColor";
function App() {
  const size = 4;
  const [pieceChoice, setPieceChoice] = useState();
  const [boardColor, setBoardColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
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
        direction="column"
        container
      >
        <Board boardColor={boardColor} size={size} />
        <ChooseColor setBoardColor={(props) => setBoardColor(props)} />
      </Grid>
    </>
  );
}

export default App;
