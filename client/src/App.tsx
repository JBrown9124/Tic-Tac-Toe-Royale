import React, { createContext, useRef } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import { useState, useEffect } from "react";
import PregameModal from "./components/PregameModal/PregameModal";

import getStartGame from "./creators/APICreators/getStartGame";
import { useCookies } from "react-cookie";
import { socket } from "./socket";
import { Player } from "./Models/Player";
import getGame from "./creators/APICreators/getGame";
import Game from "./components/Game/Game";
import { NewMove } from "./Models/NewMove";
import { Lobby } from "./Models/Lobby";
import { GameStatus } from "./Models/GameStatus";
import createLobby from "./creators/APICreators/createLobby";
import joinLobby from "./creators/APICreators/joinLobby";
import leaveLobby from "./creators/APICreators/leaveLobby";
import startGame from "./creators/APICreators/startGame";
import { RgbaColor } from "react-colorful";
import useSound from "use-sound";
function App() {
  const [sessionCookie, setSessionCookie, removeSessionCookie] = useCookies();
  const [playerId, setPlayerId] = useState("");
  const [lobbyId, setLobbyId] = useState(0);
  const [isLobbyReceived, setIsLobbyReceived] = useState(false);
  const [isLobbyFound, setIsLobbyFound] = useState(false);
  const [playJoinOrStart] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/joinOrStartSound.mp3"
  );
  const [hostWinBy, setHostWinBy] = useState(2);
  const [hostColor, setHostColor] = useState<RgbaColor>({
    r: 194,
    g: 42,
    b: 50,
    a: 1,
  });
  const [hostSize, setHostSize] = useState<number>(3);
  const [piece, setPiece] = useState("");
  const [newMove, setNewMove] = useState<NewMove>({
    turnNumber: 0,
    rowIdx: 0,
    tileIdx: 0,
    win: { whoWon: null, type: null, winningMoves: null },
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    win: { whoWon: null, type: null, winningMoves: null },
    whoTurn: 0,
  });
  const [lobby, setLobby] = useState<Lobby>({
    hostSid: 0,
    lobbyId: 0,
    board: {
      size: 3,
      color: { r: 255, g: 255, b: 255, a: 0.9 },
      winBy: 3,
      moves: [],
    },
    players: [],
    gameStatus: {
      win: { whoWon: null, type: null, winningMoves: null },
      whoTurn: 0,
    },
  });

  const lobbyRef = useRef(lobby);

  useEffect(() => {
    lobbyRef.current = lobby;
  }, [lobby]);

  socket.on("connect", () => {
    console.log("Client Connected");
    socket.on("player-leave-lobby", (removedPlayer: string) => {
      if (removedPlayer === "HOST") {
        setSessionCookie("command", "leave", { path: "/" });
      } else {
        const lobbyCopy = lobbyRef.current;
        let newPlayerList = lobbyCopy.players.filter((player) => {
          return player.playerId !== removedPlayer;
        });
        lobbyCopy.players = newPlayerList;
        setLobby({ ...lobbyCopy });
      }
    });
    socket.on("player-ready", () => {
      const lobbyCopy = lobbyRef.current;

      setTimeout(() => {
        getGame(
          {
            lobbyId: lobbyCopy.lobbyId,
            playerId: sessionCookie.playerId,
            hostSid: lobbyCopy.hostSid,
          },
          setLobby,
          setPiece,
          setSessionCookie
        );
      }, 500);
    });
    socket.on("start-game", (data) => {
      setSessionCookie("command", "begin", { path: "/" });
    });
    socket.on("new-move", (newMove) => {
      setNewMove(newMove.newMove);
      setGameStatus(newMove.gameStatus);
    });
    socket.on(
      "player-join-lobby",
      (newPlayer: { playerName: string; playerId: string }) => {
        console.log(newPlayer.playerId);
        const lobbyCopy = lobbyRef.current;
        let playerExists = lobbyCopy.players.filter((player: Player) => {
          return player.playerId === newPlayer.playerId;
        });
        console.log(playerExists, "PLAYEREXISTS");
        const isNewPlayerBot = newPlayer.playerId.substring(0, 3) === "BOT";
        if (playerExists.length === 0) {
          lobbyCopy.players.push({
            name: newPlayer.playerName,
            playerId: newPlayer.playerId,
            piece: "",
            isHost: false,
            turnNumber: 0,
            playerLoaded: isNewPlayerBot ? true : false,
            isReady: isNewPlayerBot ? true : false,
          });
          setLobby({ ...lobbyCopy });
        }
      }
    );
  });
  socket.off("connect_error", () => {
    console.log("socket error");
  });
  socket.on("disconnect", () => {
    socket.removeAllListeners("player-join-lobby");
    socket.removeAllListeners("player-leave-lobby");
    socket.removeAllListeners("start-game");
    socket.removeAllListeners("player-ready");
    socket.removeAllListeners("new-move");
    socket.removeAllListeners("connect");
    socket.removeAllListeners("player-loaded-game");
    socket.removeAllListeners();
  });

  useEffect(() => {
    if (
      sessionCookie?.command === "create" &&
      parseInt(sessionCookie.lobbyId) === 0
    ) {
      const reqBody = { playerName: sessionCookie?.name };
      createLobby(reqBody).then((response) => {
        if (response) {
          setSessionCookie("lobbyId", response.lobby.lobbyId, { path: "/" });
          setLobby(response.lobby);
          setGameStatus({
            win: { whoWon: null, type: null, winningMoves: null },
            whoTurn: 0,
          });
          setHostColor({ r: 255, g: 255, b: 255, a: 0.9 });
          setHostWinBy(2);
          setHostSize(3);
          setSessionCookie("playerId", response.playerId, {
            path: "/",
          });
        }
      });
    }
    if (
      sessionCookie?.command === "guest" &&
      parseInt(sessionCookie.lobbyId) === 0
    ) {
      const reqBody = {
        lobbyId: lobbyId,
        playerName: sessionCookie?.name,
      };
      joinLobby(reqBody).then((response) => {
        if (typeof response === "string") {
          setSessionCookie("command", "join", { path: "/" });
          setIsLobbyFound(false);
        } else {
          setIsLobbyFound(true);
          setSessionCookie("lobbyId", lobbyId, { path: "/" });
          setSessionCookie("playerId", response.player.playerId, {
            path: "/",
          });
          setLobby(response.lobby);
          setGameStatus(response.lobby.gameStatus);
          playJoinOrStart();
        }
      });
    }
    if (
      sessionCookie?.command === "leave" &&
      parseInt(sessionCookie.lobbyId) !== 0
    ) {
      const reqBody = {
        lobbyId: sessionCookie?.lobbyId,
        playerId: sessionCookie.playerId,
        hostSid: lobby.hostSid,
      };
      lobby.players = [];
      leaveLobby(reqBody);
      setSessionCookie("lobbyId", 0, { path: "/" });
    }

    if (sessionCookie?.command === "start") {
      const reqBody = {
        lobbyId: lobby.lobbyId,
        board: {
          size: hostSize,
          color: hostColor,

          winBy: hostWinBy,
          moves: [],
        },
        piece: piece,
      };
      startGame(reqBody, setSessionCookie);
    }
    if (sessionCookie?.command === "quit") {
      setSessionCookie("lobbyId", 0, { path: "/" });
      setIsLobbyReceived(false);
      lobby.players = [];
    }
    /* When they are in the middle of the game and they hit the refresh button */
    if (sessionCookie.command === "begin" && lobby.lobbyId === 0) {
      getStartGame(
        {
          lobbyId: sessionCookie.lobbyId,
          playerId: null,
          hostSid: lobby.hostSid,
        },
        setGameStatus,
        setLobby,
        setIsLobbyReceived,
        setSessionCookie
      );
    }
    /* For when the game begins */
    if (
      sessionCookie?.command === "begin" &&
      parseInt(sessionCookie.lobbyId) > 0
    ) {
      getStartGame(
        {
          lobbyId: sessionCookie.lobbyId,
          playerId: sessionCookie.playerId,
          hostSid: lobby.hostSid,
        },
        setGameStatus,
        setLobby,
        setIsLobbyReceived,
        setSessionCookie
      );
    }
    if (
      (sessionCookie.command === "create" ||
        sessionCookie.command === "guest") &&
      parseInt(sessionCookie.lobbyId) !== 0
    ) {
      getGame(
        {
          lobbyId: sessionCookie.lobbyId,
          playerId: null,
          hostSid: lobby.hostSid,
        },
        setLobby,
        setPiece,
        setSessionCookie
      );
    }
  }, [sessionCookie.command]);

  return (
    <>
      {/* <LobbyContext.Provider value={lobby}> */}
      <Grid
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: `rgba(${lobby.board.color?.r}, ${lobby.board.color?.g}, ${
            lobby.board.color?.b
          }, ${lobby.board.color?.a - 0.5})`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Grid container direction="column" justifyContent="center">
          {(sessionCookie.command === "create" ||
            sessionCookie.command === "guest" ||
            sessionCookie.command === "begin") && (
            <Grid item>
              <Game
                setGameStatus={(props) => setGameStatus(props)}
                gameStatus={gameStatus}
                newMove={newMove}
                lobby={lobby}
                setNewMove={(props) => setNewMove(props)}
                isLobbyReceived={isLobbyReceived}
              />
            </Grid>
          )}
          {sessionCookie.command !== "begin" && (
            <PregameModal
              isOpen={true}
              setLobbyId={(props) => setLobbyId(props)}
              setLobby={(props) => setLobby(props)}
              playerId={playerId}
              setPlayerId={(props) => setPlayerId(props)}
              playerPiece={piece}
              hostSize={hostSize}
              setHostSize={(props) => setHostSize(props)}
              hostWinBy={hostWinBy}
              setHostWinBy={(props) => setHostWinBy(props)}
              setHostColor={(props) => setHostColor(props)}
              hostColor={hostColor}
              setPiece={(props) => setPiece(props)}
              lobby={lobby}
            />
          )}
        </Grid>
      </Grid>
      {/* </LobbyContext.Provider> */}
    </>
  );
}

export default App;
