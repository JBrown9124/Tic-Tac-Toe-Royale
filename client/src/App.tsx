import React from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Game/Board/Board";
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
import Game from "./components/Game/Game";
import { NewMove } from "./Models/NewMove";
import { Lobby } from "./Models/Lobby";

function App() {
  const [sessionCookies, setSessionCookie, removeSessionCookie] = useCookies();
  const [newMove, setNewMove] = useState<NewMove>({
    playerNumber: 0,
    rowIdx: 0,
    tileIdx: 0,
  });
  const [piece, setPiece] = useState("");
  const [lobby, setLobby] = useState<Lobby>({
    lobbyId: 0,
    board: { size: 0, color: { r: 0, g: 0, b: 0, a: 0 }, winBy: 3 },
    players: [
      { name: "", piece: "", isHost: false, playerNumber: 0, isReady: false },
    ],
  });
  socket.on("connect", () => {
    console.log("connected to server");
    socket.on("player-join-lobby", (receivedLobby) => {
      // if (receivedLobby.lobbyId === sessionCookies.session?.lobby?.lobbyId) {
      setLobby(receivedLobby);
      setSessionCookie("lobby", receivedLobby, { path: "/" });
      // }
    });
    socket.on("player-leave-lobby", (receivedLobby) => {
      setLobby(receivedLobby);
      setSessionCookie("lobby", receivedLobby, { path: "/" });
    });
    socket.on("player-ready", (receivedLobby) => {
      setSessionCookie("lobby", receivedLobby, { path: "/" });
      setLobby(receivedLobby);
    });
    socket.on("start-game", (data) => {
      setLobby(data.lobby);
      setSessionCookie("lobby", data.lobby, { path: "/" });
      setSessionCookie("gameStatus", data.gameStatus, { path: "/" });
      setSessionCookie("command", "begin", { path: "/" });
    });
    socket.on("new-move", (newMove) => {
      setNewMove(newMove.newMove);
      setSessionCookie("gameStatus", newMove.gameStatus, { path: "/" });

      // }
    });
  });

  // removeSessionCookie("command");
  // removeSessionCookie("lobby");
  // removeSessionCookie("board");
  // removeSessionCookie("gameStatus");
  // setSessionCookie("gameStatus", {...sessionCookies.gameStatus, whoWon:null,}, {path:"/"})
  return (
    <>
      <Grid
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: `rgba(${sessionCookies?.lobby?.board?.color?.r}, ${
            sessionCookies?.lobby?.board?.color?.g
          }, ${sessionCookies?.lobby?.board?.color?.b}, ${
            sessionCookies?.lobby?.board?.color?.a - 0.5
          })`,
          overflow: "auto",
        }}
      >
        <Grid container direction="column" justifyContent="center">
          {sessionCookies.command === "begin" ? (
            <Grid item>
              <Game newMove={newMove} lobby={lobby} />
            </Grid>
          ) : (
            <PregameModal
              setLobby={(props) => setLobby(props)}
              playerPiece={piece}
              setPiece={(props) => setPiece(props)}
              lobby={lobby}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
