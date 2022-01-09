import Grid from "@mui/material/Grid";
import "./App.css";
import { useState, useEffect } from "react";
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
import { Player } from "./Models/Player";
function App() {
  const [sessionCookie, setSessionCookie, removeSessionCookie] = useCookies();

  const [lobbyId, setLobbyId] = useState(0);
  const [isLobbyReceived, setIsLobbyReceived] = useState(false);
  const [isLobbyFound, setIsLobbyFound] = useState(false);
  const [hostWinBy, setHostWinBy] = useState(2);
  const [hostColor, setHostColor] = useState<RgbaColor>({
    r: 194,
    g: 42,
    b: 50,
    a: 1,
  });
  const [hostSize, setHostSize] = useState<number>(3);
  const [pieceSelection, setPieceSelection] = useState("");
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

  const [playerId, setPlayerId] = useState("");
  const [turnNumber, setTurnNumber] = useState(0);
  const [isHost, setIsHost] = useState(false);
  const [piece, setPiece] = useState<JSX.Element | string>("");

  const [board, setBoard] = useState<number[][]>([[]]);
  const [playerPieces, setPlayerPieces] = useState<Player[]>([]);
  const sizeOfBoardPiece = determineSizeOfPiece(lobby?.board?.size);

  const [playLeaveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3"
  );

  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const [botCanMove, setBotCanMove] = useState(false);
  const [isCountDownFinished, setIsCountDownFinished] = useState(false);
  useCommands({
    sessionCookie,
    lobby,
    lobbyId,
    setSessionCookie,
    setLobby,
    setGameStatus,
    setHostColor,
    setHostWinBy,
    setHostSize,
    setIsLobbyReceived,
    setPieceSelection,
    setIsLobbyFound,
  });
  useSocket({
    lobby,
    setLobby,
    setPieceSelection,
    sessionCookie,
    setSessionCookie,
    setNewMove,
    setGameStatus,
  });
  useMoveHandler({
    botCanMove,
    lobby,
    gameStatus,
    isHost,
    sessionCookie,
    board,
    setGameStatus,
    newMove,
  });
  useEffect(() => {
    if (sessionCookie.command === "begin" && isLobbyReceived) {
      const setUpGame = async () => {
        await getPlayerPieces(
          turnNumber,
          lobby.players,
          setPiece,
          sizeOfBoardPiece,
          setPlayerPieces,
          lobby.board.color,
          sessionCookie.playerId,
          setIsHost,
          setTurnNumber,
          playerPieces
        );
        const boardCreated = await createBoard(
          setBoard,
          lobby.board.size,
          lobby.board.moves
        );

        setIsBoardCreated(boardCreated);
      };
      if (lobby.board.color) {
        setUpGame();
      }
    }
  }, [isLobbyReceived]);

  const quitGame = () => {
    playLeaveSound();
    setBotCanMove(false);
    setIsCountDownFinished(false);
    setIsBoardCreated(false);
    setIsLobbyReceived(false);
    setIsHost(false);
    setIsLobbyFound(false);
    setTimeout(() => {
      
      setSessionCookie("command", "quit", { path: "/" });
      setBoard([[]]);
      setPiece("");
      setPieceSelection("");
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
      setPlayerPieces([]);
    }, 3500);
  };
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
    startGame(reqBody, setSessionCookie);
  };
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
                isCountDownFinished={isCountDownFinished}
                turnNumber={turnNumber}
                playerPieces={playerPieces}
                quitGame={() => quitGame()}
                sizeOfBoardPiece={sizeOfBoardPiece}
                board={board}
                piece={piece}
                isBoardCreated={isBoardCreated}
                setBotCanMove={(props) => setBotCanMove(props)}
                setIsCountDownFinished={(props) =>
                  setIsCountDownFinished(props)
                }
              />
            </Grid>
          )}
          {sessionCookie.command !== "begin" && (
            <PregameModal
              handleStart={() => handleStart()}
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
            />
          )}
        </Grid>
      </Grid>
      {/* </LobbyContext.Provider> */}
    </>
  );
}

export default App;
