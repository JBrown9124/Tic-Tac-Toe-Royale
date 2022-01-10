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
import useMoveHandler from "./hooks/useMoveHandler";
import useSound from "use-sound";
import getPlayerPieces from "./creators/BoardCreators/getPlayerPieces";
import createBoard from "./creators/BoardCreators/createBoard";
import { determineSizeOfPiece } from "./creators/BoardCreators/sizeOfPiece";
import getGame from "./creators/APICreators/getLobby";
import { Player } from "./Models/Player";
import { socket } from "./socket";
function App() {
  const [action, setAction] = useState("welcome");

  const [lobbyId, setLobbyId] = useState(0);
  const [isLobbyReceived, setIsLobbyReceived] = useState(false);
  const [isLobbyFound, setIsLobbyFound] = useState(true);
  const [hostWinBy, setHostWinBy] = useState(2);
  const [hostColor, setHostColor] = useState<RgbaColor>({
    r: 194,
    g: 42,
    b: 50,
    a: 1,
  });
  const [hostSize, setHostSize] = useState<number>(3);
  const [pieceSelection, setPieceSelection] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [playerWhoLeft, setPlayerWhoLeft]=useState("")
  const [newMove, setNewMove] = useState<NewMove>({
    turnNumber: 1,
    rowIdx: 0,
    tileIdx: 0,
    win: { whoWon: null, type: null, winningMoves: null },
  });
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    win: { whoWon: null, type: null, winningMoves: null },
    whoTurn: 1,
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
      whoTurn: 1,
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
    setNewMove,
  
  });
  useSocket({
    lobby,
    setLobby,
    setPieceSelection,
    action,
    setAction,
    setNewMove,
    setGameStatus,
    playerId,
    setPlayerWhoLeft,
  });

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
          {(action === "create" ||
            action === "guest" ||
            action === "begin") && (
            <Grid item>
              <Game
                playerWhoLeft={playerWhoLeft}
                setGameStatus={(props) => setGameStatus(props)}
                gameStatus={gameStatus}
                newMove={newMove}
                lobby={lobby}
                setNewMove={(props) => setNewMove(props)}
                isLobbyReceived={isLobbyReceived}
                action={action}
                setAction={(props) => setAction(props)}
                playerId={playerId}
                isHost={isHost}
                setIsHost={(props) => setIsHost(props)}               
              />
            </Grid>
          )}
          {action !== "begin" && (
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
      </Grid>
      {/* </LobbyContext.Provider> */}
    </>
  );
}

export default App;
