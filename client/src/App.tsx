import React from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Board/Board";
import "./App.css";
import { useState, useEffect } from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { RgbaColor } from "react-colorful";
import Store from "./store";
import ClearIcon from "@mui/icons-material/Clear";
import joinLobby from "./creators/joinLobby";
import { useCookies } from "react-cookie";
import socket from "./socket";
import { Player } from "./Models/Player";
interface BoardSettingsProps {
  boardColor: RgbaColor;
  boardSize: number[] | number;
}
interface LobbyProps {
  lobbyId: number;
  players: Player[];
}
interface NewMove{
  playerNumber: number;
  rowIdx: number;
  tileIdx: number;
}
function App() {
  const [sessionCookies, setSessionCookie, removeSessionCookie] = useCookies();
  const [newMove, setNewMove] = useState<NewMove>({playerNumber: 0, rowIdx: 0, tileIdx: 0});
  socket.on("connect", () => {
    console.log("connected to server");
    socket.on("player-join-lobby", (receivedLobby) => {
      // if (receivedLobby.lobbyId === sessionCookies.session?.lobby?.lobbyId) {

      setSessionCookie("lobby", receivedLobby, { path: "/" });
      // }
    });
    socket.on("player-leave-lobby", (receivedLobby) => {
      setSessionCookie("lobby", receivedLobby, { path: "/" });
    });
    socket.on("player-ready", (receivedLobby) => {
      setSessionCookie("lobby", receivedLobby, { path: "/" });
    });
    socket.on("start-game", (receivedLobby) => {
      setSessionCookie("lobby", receivedLobby, { path: "/" });
      setSessionCookie("command", "begin", { path: "/" });
    });
    socket.on("new-move", (newMove) => {
      // if (receivedLobby.lobbyId === sessionCookies.session?.lobby?.lobbyId) {
        
        let newMoveRowIdx = newMove.newMove.rowIdx;
        let newMoveTileIdx = newMove.newMove.tileIdx;
        let newMovePlayerNumber = newMove.newMove.playerNumber;
      
        // sessionCookies.board[newMoveRowIdx][newMoveTileIdx] = newMovePlayerNumber;
        setNewMove(newMove.newMove)
        
      
        // board[newMove.newMove.rowIdx][newMove.newMove.tileIdx]=newMove.newMove.playerNumber;
        // setBoard([...board]);
        
      // }
    });
    
  });
  
  // removeSessionCookie("command");
  // removeSessionCookie("lobby");
  // removeSessionCookie("board");

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
          {sessionCookies.command === "begin" ? (
            <Grid item>
              <Board newMove={newMove}/>
            </Grid>
          ) : (
            <PregameModal />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
