import React, { createContext, useRef } from "react";
import Grid from "@mui/material/Grid";
import "./App.css";
import { useState, useEffect,} from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { LobbyContext } from "./storage/lobbyContext";
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
  const [playerId, setPlayerId] = useState("");
  const [isAllPlayersLoaded, setIsAllPlayersLoaded] = useState(false);
  const [isLobbyReceived, setIsLobbyReceived] = useState(false);
  const [startOpenSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/warHorn.mp3"
  );
  const [newMove, setNewMove] = useState<NewMove>({
    turnNumber: 0,
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
            playerId: sessionCookies.playerId,
            hostSid: lobbyCopy.hostSid,
          },
          setLobby,
          setPiece
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
        if (playerExists.length === 0) {
          lobbyCopy.players?.push({
            name: newPlayer.playerName,
            playerId: newPlayer.playerId,
            piece: "",
            isHost: false,
            turnNumber: 0,
            playerLoaded:
              newPlayer.playerId.substring(0, 3) === "BOT" ? true : false,
            isReady:
              newPlayer.playerId.substring(0, 3) === "BOT" ? true : false,
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
    if (sessionCookies?.command === "quit") {
      setNewMove({
        turnNumber: 0,
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
      setIsLobbyReceived(false);
      removeSessionCookie("lobbyId");
      removeSessionCookie("command");
      removeSessionCookie("playerId");
    }
    /* When they are in the middle of the game and they hit the refresh button */
    if (sessionCookies?.command === "begin" && lobby.lobbyId === 0) {
      getStartGame(
        {
          lobbyId: sessionCookies?.lobbyId,
          playerId: null,
          hostSid: lobby.hostSid,
        },
        setGameStatus,
        setLobby,
        setIsLobbyReceived
      );

      startOpenSound();

      // getLobbyInfo().then((isLobbyInfoReceived) => {
      //   setIsLobbyReceived(isLobbyInfoReceived);
      // });
    }
    /* For when the game begins */
    if (sessionCookies?.command === "begin" && lobby.lobbyId > 0) {
      getStartGame(
        {
          lobbyId: sessionCookies?.lobbyId,
          playerId: sessionCookies.playerId,
          hostSid: lobby.hostSid,
        },
        setGameStatus,
        setLobby,
        setIsLobbyReceived
      );

      startOpenSound();
    }
    if (
      (sessionCookies?.command === "create" ||
        sessionCookies?.command === "guest") &&
      sessionCookies.lobbyId !== undefined
    ) {
      getGame(
        {
          lobbyId: sessionCookies?.lobbyId,
          playerId: sessionCookies.playerId,
          hostSid: lobby.hostSid,
        },
        setLobby,
        setPiece
      );

      startOpenSound();
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
                  isLobbyReceived={isLobbyReceived}
                  isAllPlayersLoaded={isAllPlayersLoaded}
                />
              </Grid>
            ) : (
              <PregameModal
                setLobby={(props) => setLobby(props)}
                playerId={playerId}
                setPlayerId={(props) => setPlayerId(props)}
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
