import Grid from "@mui/material/Grid";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import PregameModal from "./components/PregameModal/PregameModal";
import { useCookies } from "react-cookie";
import Game from "./components/Game/Game";
import { NewMove } from "./Models/NewMove";
import { Lobby } from "./Models/Lobby";
import { GameStatus } from "./Models/GameStatus";
import startGame from "./creators/APICreators/startGame";
import { RgbaColor } from "react-colorful";
import useCommands from "./hooks/useCommands";
import useSocket from "./hooks/useSocket";
import BuildingBoardSplashScreen from "./components/BuildingBoardSplashScreen";

function App() {
  const [action, setAction] = useState("welcome");

  const [lobbyId, setLobbyId] = useState(0);
  const [isLobbyReceived, setIsLobbyReceived] = useState(false);
  const [isLobbyFound, setIsLobbyFound] = useState(true);
  const [hostWinBy, setHostWinBy] = useState(3);
  const [hostColor, setHostColor] = useState<RgbaColor>({
    r: 194,
    g: 42,
    b: 50,
    a: 1,
  });
  const [hostSize, setHostSize] = useState<number>(3);
  const [pieceSelection, setPieceSelection] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [playerWhoLeftSessionId, setPlayerWhoLeftSessionId] = useState("");

  const [gameStatus, setGameStatus] = useState<GameStatus>({
    win: { whoWon: null, type: null, winningMoves: null },
    whoTurn: "",
    newMove: { playerId: "", rowIdx: 0, tileIdx: 0 },
  });
  const [newMove, setNewMove] = useState<NewMove>({
    playerId: "",
    rowIdx: 0,
    tileIdx: 0,
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
      whoTurn: "",
      newMove: { playerId: "", rowIdx: 0, tileIdx: 0 },
    },
  });

  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleStart = () => {
    const reqBody = {
      lobbyId: lobby.lobbyId,
      board: {
        size: hostSize,
        color: hostColor,
        winBy: hostWinBy,
        moves: [],
      },
      piece: pieceSelection,
      playerId: playerId,
    };
    startGame(reqBody, setAction);
  };
  useCommands({
    action,
    lobbyId,
    lobby,
    setLobby,
    setGameStatus,
    setHostColor,
    setHostWinBy,
    setHostSize,
    setIsLobbyReceived,
    setPieceSelection,
    setIsLobbyFound,
    setPlayerId,
    setLobbyId,
    setPlayerName,
    playerName,
    playerId,
    setAction,
    isHost,
  });
  useSocket({
    lobby,
    setLobby,
    setPieceSelection,
    action,
    setAction,

    setGameStatus,
    playerId,
    setPlayerWhoLeftSessionId,
    setIsHost,
    setHostWinBy,
    setHostColor,
    setHostSize,
  });

  return (
    <>
      {/* <LobbyContext.Provider value={lobby}> */}
      <Grid
        sx={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background:
            lobby.board.color.r === 255 &&
            lobby.board.color.b === 255 &&
            lobby.board.color.g === 255 &&
            lobby.board.color.a === 0.9
              ? "#b4cad1"
              : `rgba(${lobby.board.color?.r}, ${lobby.board.color?.g}, ${
                  lobby.board.color?.b
                }, ${lobby.board.color?.a - 0.5})`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {action === "begin" && !isLobbyReceived && (
          <BuildingBoardSplashScreen />
        )}
        {(action === "create" ||
          action === "guest" ||
          action === "begin" ||
          action === "in game") && (
          <Grid item>
            <Game
              playerWhoLeftSessionId={playerWhoLeftSessionId}
              pieceSelection={pieceSelection}
              setGameStatus={(props) => setGameStatus(props)}
              gameStatus={gameStatus}
              lobby={lobby}
              isLobbyReceived={isLobbyReceived}
              action={action}
              setAction={(props) => setAction(props)}
              playerId={playerId}
              isHost={isHost}
              setIsLobbyReceived={(props) => setIsLobbyReceived(props)}
              setIsHost={(props) => setIsHost(props)}
              handleStart={() => handleStart()}
            />
          </Grid>
        )}
        {action !== "begin" && action !== "in game" && (
          <PregameModal
            playerName={playerName}
            setPlayerName={(props) => setPlayerName(props)}
            handleStart={() => handleStart()}
            action={action}
            isOpen={true}
            setLobbyId={(props) => setLobbyId(props)}
            setLobby={(props) => setLobby(props)}
            playerId={playerId}
            setPlayerId={(props) => setPlayerId(props)}
            playerPiece={pieceSelection}
            hostSize={hostSize}
            setHostSize={(props) => setHostSize(props)}
            hostWinBy={hostWinBy}
            setHostWinBy={(props) => setHostWinBy(props)}
            setHostColor={(props) => setHostColor(props)}
            hostColor={hostColor}
            setPiece={(props) => setPieceSelection(props)}
            lobby={lobby}
            setAction={(props) => setAction(props)}
            isLobbyFound={isLobbyFound}
          />
        )}
      </Grid>
      {/* </LobbyContext.Provider> */}
    </>
  );
}

export default App;
