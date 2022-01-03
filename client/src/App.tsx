import React, { createContext, useRef } from "react";
import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import Board from "./components/Game/Board/Board";
import "./App.css";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { RgbaColor } from "react-colorful";
import { LobbyContext } from "./storage/lobbyContext";
import ClearIcon from "@mui/icons-material/Clear";
import joinLobby from "./creators/APICreators/joinLobby";
import getStartGame from "./creators/APICreators/getStartGame";
import { useCookies } from "react-cookie";
import { socket } from "./socket";

import { Player } from "./Models/Player";
import getGame from "./creators/APICreators/getGame";
import Game from "./components/Game/Game";
import { NewMove } from "./Models/NewMove";
import { Lobby } from "./Models/Lobby";
import { GameStatus } from "./Models/GameStatus";
import { useSound } from "use-sound";

function App() {
  const [sessionCookies, setSessionCookie, removeSessionCookie] = useCookies();
  const [startMusic] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/warHorn.mp3"
  );
  const [newMove, setNewMove] = useState<NewMove>({
    playerNumber: 0,
    rowIdx: 0,
    tileIdx: 0,
    win: { whoWon: null, type: null, winningMoves: null },
  });
  const [piece, setPiece] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    win: { whoWon: null, type: null, winningMoves: null },
    whoTurn: 0,
  });
  const [lobby, setLobby] = useState<Lobby>({
    hostSid: 0,
    lobbyId: 0,
    board: { size: 0, color: { r: 0, g: 0, b: 0, a: 0 }, winBy: 3, moves: [] },
    players: [],
  });
  const getCount = 0;
  const lobbyRef = useRef(lobby);
  const getCountRef = useRef(getCount);
  useEffect(() => {
    lobbyRef.current = lobby;
  }, [lobby]);
  useEffect(() => {
    getCountRef.current = getCount;
  }, [getCount]);

  socket.on("connect", () => {});

  socket.on("player-join-lobby", (newPlayer: any) => {
    const lobbyCopy = lobbyRef.current;
    let playerExists = lobbyCopy.players.filter((player) => {
      return player.playerId === newPlayer.playerId;
    });
    if (playerExists.length === 0) {
      lobbyCopy.players?.push({
        name: newPlayer.playerName,
        playerId: newPlayer.playerId,
        piece: "",
        isHost: false,
        playerNumber: 0,
        isReady: newPlayer.playerId.substring(0, 3) === "BOT" ? true : false,
      });
      setLobby({ ...lobbyCopy });
    }
  });
  socket.on("player-leave-lobby", (removedPlayer) => {
    if (removedPlayer === "HOST") {
      setSessionCookie("command", "leave", { path: "/" });
    } else {
      const lobbyCopy = lobbyRef.current;
      let newPlayerList = lobbyCopy.players.filter((player) => {
        return player.name !== removedPlayer;
      });
      lobbyCopy.players = newPlayerList;
      setLobby({ ...lobbyCopy });
    }
  });
  socket.once("player-ready", (receivedLobby) => {
    let getCount = 0;

    const getLobbyInfo = async () => {
      const lobbyCopy = lobbyRef.current;
      const lobbyInfo = await getStartGame({ lobbyId: lobbyCopy.lobbyId });
      await setLobby(lobbyInfo);
    };
    if (getCount === 0) {
      getLobbyInfo();
      getCount += 1;
    }
  });
  socket.on("start-game", (data) => {
    setSessionCookie("command", "begin", { path: "/" });
  });
  socket.on("new-move", (newMove) => {
    setNewMove(newMove.newMove);
    setGameStatus(newMove.gameStatus);
  });

  useLayoutEffect(() => {
    if (sessionCookies?.command === "quit") {
      setNewMove({
        playerNumber: 0,
        rowIdx: 0,
        tileIdx: 0,
        win: { whoWon: null, type: null, winningMoves: null },
      });

      setGameStatus({
        win: { whoWon: null, type: null, winningMoves: null },
        whoTurn: 0,
      });
      setLobby({
        hostSid: 0,
        lobbyId: 0,
        board: {
          size: 0,
          color: { r: 0, g: 0, b: 0, a: 0 },
          winBy: 3,
          moves: [],
        },
        players: [],
      });
      removeSessionCookie("lobbyId");
      removeSessionCookie("command");
    }
    if (sessionCookies?.command === "begin" && lobby.lobbyId === 0) {
      const getLobbyInfo = async () => {
        const lobbyInfo = await getGame({ lobbyId: sessionCookies?.lobbyId });

        setGameStatus(lobbyInfo.gameStatus);

        setLobby(lobbyInfo);
      };

      startMusic();
      getLobbyInfo();
    }
    if (sessionCookies?.command === "begin" && lobby.lobbyId > 0) {
      const getLobbyInfo = async () => {
        const lobbyInfo = await getStartGame({
          lobbyId: sessionCookies?.lobbyId,
        });

        setGameStatus(lobbyInfo.gameStatus);

        setLobby(lobbyInfo);
      };

      startMusic();
      getLobbyInfo();
    }
    if (
      (sessionCookies?.command === "create" ||
        sessionCookies?.command === "guest") &&
      sessionCookies.lobbyId !== undefined
    ) {
      const getLobbyInfo = async () => {
        const lobbyInfo = await getGame({
          lobbyId:
            lobby.lobbyId === 0 ? sessionCookies?.lobbyId : lobby.lobbyId,
        });

        lobbyInfo?.players.map((player: Player) => {
          if (player.name === sessionCookies?.name) {
            setPiece(player.piece);
          }
        });
        await setLobby(lobbyInfo);
      };
      getLobbyInfo();
      startMusic();
    }
  }, [sessionCookies?.command]);
  // removeSessionCookie("command")
  // removeSessionCookie("LobbyId")
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
                  setNewMove={(props) => setNewMove(props)}
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
