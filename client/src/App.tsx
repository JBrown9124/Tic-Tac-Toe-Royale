import React, { createContext, useRef } from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Game/Board/Board";
import "./App.css";
import { useState, useEffect, useContext } from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { RgbaColor } from "react-colorful";
import { LobbyContext } from "./storage/lobbyContext";
import ClearIcon from "@mui/icons-material/Clear";
import joinLobby from "./creators/joinLobby";
import { useCookies } from "react-cookie";
import { socket } from "./socket";
import { Player } from "./Models/Player";
import getGame from "./creators/getGame";
import Game from "./components/Game/Game";
import { NewMove } from "./Models/NewMove";
import { Lobby } from "./Models/Lobby";
import { GameStatus } from "./Models/GameStatus";

function App() {
  const [sessionCookies, setSessionCookie, removeSessionCookie] = useCookies();
  const [newMove, setNewMove] = useState<NewMove>({
    playerNumber: 0,
    rowIdx: 0,
    tileIdx: 0,
  });
  const [piece, setPiece] = useState("");

  const [gameStatus, setGameStatus] = useState<GameStatus>({
    whoWon: null,
    whoTurn: 0,
  });
  const [lobby, setLobby] = useState<Lobby>({
    hostSid: 0,
    lobbyId: 0,
    board: { size: 0, color: { r: 0, g: 0, b: 0, a: 0 }, winBy: 3, moves: [] },
    players: [],
  });
  const lobbyRef = useRef(lobby);
  const commandRef = useRef(sessionCookies.command);
  useEffect(() => {
    lobbyRef.current = lobby;
  }, [lobby]);
  useEffect(() => {
    commandRef.current = sessionCookies.command;
  }, [sessionCookies.command]);
  const [players, setPlayers] = useState<any>([]);
  let lobbyContext = useContext(LobbyContext);
  socket.on("connect", () => {
    console.log("connected to server");
    socket.on("player-join-lobby", (newPlayer: any) => {
      console.log(newPlayer, "PLAYERJOINLOBBYSOCKETCLIENT");

      console.log(lobbyContext, "LOBByContext");
      console.log(lobby, "LobbySocket");
      console.log(lobbyRef.current, "LobbyRef");
      const lobbyCopy = lobbyRef.current;
      let playerExists = lobbyCopy.players.filter((player) => {
        return player.name === newPlayer;
      });
      if (playerExists.length === 0) {
        lobbyCopy.players?.push({
          name: newPlayer,
          piece: "",
          isHost: false,
          playerNumber: 0,
          isReady: false,
        });
        setLobby({ ...lobbyCopy });
      }

      // setLobby(lobby);

      // }
    });
    socket.on("player-leave-lobby", (removedPlayer) => {
      const lobbyCopy = lobbyRef.current;
      let newPlayerList = lobbyCopy.players.filter((player) => {
        return player.name !== removedPlayer;
      });
      lobbyCopy.players = newPlayerList;
      setLobby({ ...lobbyCopy });
    });
    socket.on("player-ready", (receivedLobby) => {
      console.log(receivedLobby, "PLAYER READY SOCKET");
      const lobbyCopy = lobbyRef.current;
      const getLobbyInfo = async () => {
        const lobbyInfo = await getGame({ lobbyId: lobbyCopy.lobbyId });
        console.log(lobbyInfo, "STARTGAMEGETGAMESOCKET");

        await setLobby(lobbyInfo);
      };
      getLobbyInfo();
    });
    socket.on("start-game", (data) => {
      setSessionCookie("command", "begin", { path: "/" });
      // setSessionCookie("lobby", data.lobby, { path: "/" });
    });
    socket.on("new-move", (newMove) => {
      setNewMove(newMove.newMove);
      setGameStatus(newMove.gameStatus);

      // }
    });
  });
  useEffect(() => {
    if (sessionCookies.command === "begin") {
      const getLobbyInfo = async () => {
        const lobbyInfo = await getGame({ lobbyId: sessionCookies?.lobbyId });
        console.log(lobbyInfo, "STARTGAMEGETGAMESOCKET");
        await setGameStatus(lobbyInfo.gameStatus);

        await setLobby(lobbyInfo);
      };
      getLobbyInfo();
    }
    if (
      (sessionCookies.command === "create" ||
        sessionCookies.command === "guest") &&
      sessionCookies.lobbyId !== undefined
    ) {
      const getLobbyInfo = async () => {
        const lobbyInfo = await getGame({ lobbyId: sessionCookies?.lobbyId });
        console.log(lobbyInfo, "STARTGAMEGETGAMESOCKET");

        await setLobby(lobbyInfo);
      };
      getLobbyInfo();
    }
  }, [sessionCookies?.command]);

  // removeSessionCookie("command");
  // removeSessionCookie("lobby");
  // removeSessionCookie("lobbyId");
  // removeSessionCookie("board");
  // removeSessionCookie("gameStatus");
  // setSessionCookie("gameStatus", {...sessionCookies.gameStatus, whoWon:null,}, {path:"/"})
  return (
    <>
      <LobbyContext.Provider value={lobby}>
        <Grid
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            background: `rgba(${lobby?.board?.color?.r}, ${
              lobby?.board?.color?.g
            }, ${lobby?.board?.color?.b}, ${lobby?.board?.color?.a - 0.5})`,
            overflow: "auto",
          }}
        >
          <Grid container direction="column" justifyContent="center">
            {sessionCookies.command === "begin" ? (
              <Grid item>
                <Game
                  setGameStatus={(props) => setGameStatus(props)}
                  gameStatus={gameStatus}
                  newMove={newMove}
                  lobby={lobby}
                />
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
      </LobbyContext.Provider>
    </>
  );
}

export default App;
