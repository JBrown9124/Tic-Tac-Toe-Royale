import React from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Board/Board";
import "./App.css";
import { useState, useEffect } from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { RgbaColor } from "react-colorful";
import Store from "./store"
import ClearIcon from "@mui/icons-material/Clear";
import joinLobby from "./creators/joinLobby";
interface BoardSettingsProps{
  boardColor:RgbaColor,
  boardSize:number[]|number
}
function App() {
  
  const [pieceChoice, setPieceChoice] = useState<JSX.Element>(
    <ClearIcon sx={{ height: "40px", width: "40px" }} />
  );

  // const [boardColor, setBoardColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  // const [boardSize, setBoardSize] = useState<number | number[]>(3);
  const [boardSettings, setBoardSettings] = useState<BoardSettingsProps>({boardColor:{ r: 50, g: 100, b: 150, a: 1 }, boardSize:3})
  const [lobbyId, setLobbyId] = useState(0);
  const [playerName, setPlayerName] = useState("Tic Tac Toe Master");
  
  Store(boardSettings, null);
  const handleSetSettings = (
    sizeValue: number | number[],
    colorValue: RgbaColor,
    pieceValue: JSX.Element
  ) => {
    setBoardSettings({boardColor:colorValue, boardSize:sizeValue})
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
              boardColor={boardSettings.boardColor}
              boardSize={boardSettings.boardSize}
              pieceChoice={pieceChoice}
            />
          </Grid>
          <PregameModal
          playerName={playerName}
            setLobbyId={(lobbyId) => setLobbyId(lobbyId)}
            setPlayerName={(playerName) => setPlayerName(playerName)}
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
