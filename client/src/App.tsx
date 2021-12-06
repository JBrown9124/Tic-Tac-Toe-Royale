import React from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Board/Board";
import "./App.css";
import { useState, useEffect } from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { RgbaColor } from "react-colorful";
import ClearIcon from "@mui/icons-material/Clear";
import joinLobby from "./creators/joinLobby";
function App() {
  const size = 20;
  const [pieceChoice, setPieceChoice] = useState<JSX.Element>(
    <ClearIcon sx={{ height: "40px", width: "40px" }} />
  );
  const [boardColor, setBoardColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  const [boardSize, setBoardSize] = useState<number | number[]>(3);
  const [lobbyId, setLobbyId] = useState(0);
  const [playerName, setPlayerName] = useState("Tic Tac Toe Master");
  const handleSetSettings = (
    sizeValue: number | number[],
    colorValue: RgbaColor,
    pieceValue: JSX.Element
  ) => {
    setBoardSize(sizeValue);
    setBoardColor(colorValue);
    setPieceChoice(pieceValue);
  };
  useEffect(() => {
    const findLobby = () => {
      const reqBody = { lobbyId: lobbyId, playerName: playerName };
      joinLobby(reqBody);
    };
    findLobby();
  }, [lobbyId]);
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
        <Grid container direction="column" justifyContent="center">
          <Grid item>
            <Board
              boardColor={boardColor}
              boardSize={boardSize}
              pieceChoice={pieceChoice}
            />
          </Grid>
          <PregameModal
            setLobbyId={(lobbyId) => setLobbyId(lobbyId)}
            setName={(props) => setPlayerName(props)}
            sendBoardSettings={(size, color, piece) =>
              handleSetSettings(size, color, piece)
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
