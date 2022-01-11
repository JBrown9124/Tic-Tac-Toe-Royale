import Grid from "@mui/material/Grid";
import { Player } from "../../Models/Player";
import { useState, useEffect, useLayoutEffect } from "react";
import determineWinner from "../../creators/BoardCreators/determineWinner";
import createBoard from "../../creators/BoardCreators/createBoard";
import { useCookies } from "react-cookie";
import getPlayerPieces from "../../creators/BoardCreators/getPlayerPieces";
import botNewMove from "../../creators/APICreators/botNewMove";
import { Lobby } from "../../Models/Lobby";
import { NewMove } from "../../Models/NewMove";
import { GameStatus } from "../../Models/GameStatus";
import { determineSizeOfPiece } from "../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";
import Board from "./Board/Board";
import StatusBoardAnimator from "../../animators/StatusBoardAnimator";
import StatusBoard from "./StatusBoard/StatusBoard";
import CountDownAnimator from "../../animators/CountDownAnimator";
import useMoveHandler from "../../hooks/useMoveHandler";
import sortPlayerPieces from "../../creators/BoardCreators/sortPlayerPieces";
import updateAfterPlayerLeaves from "../../creators/BoardCreators/updateAfterPlayerLeaves";

interface GameProps {
  newMove: NewMove;
  lobby: Lobby;
  gameStatus: GameStatus;
  isLobbyReceived: boolean;
  setGameStatus: (status: GameStatus) => void;
  setNewMove: (newMoveValue: NewMove) => void;
  action: string;
  setAction: (action: string) => void;
  playerId: string;
  isHost: boolean;
  setIsHost: (isHost: boolean) => void;
  playerWhoLeft: string;
}
export default function Game({
  newMove,
  lobby,
  gameStatus,
  setGameStatus,
  setNewMove,
  isLobbyReceived,
  action,
  setAction,
  playerId,
  isHost,
  setIsHost,
  playerWhoLeft,
}: GameProps) {
  const [playLeaveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3"
  );

  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const [botCanMove, setBotCanMove] = useState(false);
  const [isCountDownFinished, setIsCountDownFinished] = useState(false);
  const [turnNumber, setTurnNumber] = useState(0);

  const [piece, setPiece] = useState<JSX.Element | string>("");

  const [board, setBoard] = useState<(number | string)[][]>([[]]);
  const [playerPieces, setPlayerPieces] = useState<Player[]>([]);
  const sizeOfBoardPiece = determineSizeOfPiece(lobby?.board?.size);
  useEffect(() => {
    updateAfterPlayerLeaves({
      playerPieces,
      setTurnNumber,
      setPlayerPieces,
      setGameStatus,
      gameStatus,
      playerWhoLeft,
      playerId,
    });
  }, [playerWhoLeft]);
  useMoveHandler({
    botCanMove,
    lobby,
    gameStatus,
    isHost,
    action,
    board,
    setGameStatus,
    newMove,
    playerPieces,
    playerWhoLeft,
  });
  const quitGame = () => {
    playLeaveSound();
    setBotCanMove(false);
    setIsCountDownFinished(false);
    setIsBoardCreated(false);

    setIsHost(false);

    setTimeout(() => {
      setAction("leave");
    }, 3500);
  };
  useEffect(() => {
    if (action === "begin" && isLobbyReceived) {
      const setUpGame = async () => {
        await getPlayerPieces(
          turnNumber,
          lobby.players,
          setPiece,
          sizeOfBoardPiece,
          setPlayerPieces,
          lobby.board.color,
          playerId,
          setIsHost,
          setTurnNumber,
          playerPieces
        );
        console.log(gameStatus.whoTurn, "GAMESTATUSWHOTURN");
        const { whoTurn } = gameStatus;
        await sortPlayerPieces({ playerPieces, setPlayerPieces, whoTurn });
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

  useEffect(() => {
    if (isBoardCreated && gameStatus.win.whoWon === null) {
      let currentPlayer = playerPieces[playerPieces.length - 1];
      const poppedPlayer = playerPieces.pop();

      if (poppedPlayer !== undefined) {
        playerPieces.unshift(poppedPlayer);

        if (currentPlayer.turnNumber !== gameStatus.whoTurn && gameStatus.win.whoWon === null) {
          const secondPoppedPlayer = playerPieces.pop();
          if (secondPoppedPlayer !== undefined) {
            playerPieces.unshift(secondPoppedPlayer);
          }
        }
      }
      // let currentPlayer = playerPieces[playerPieces.length - 1];
      // let j = playerPieces.length - 2;
      // for (let i = playerPieces.length - 1; j >= 0; i--) {
      //   [playerPieces[j], playerPieces[i]] = [playerPieces[i], playerPieces[j]];
      //   j -= 1;
      // }

      // if (currentPlayer.turnNumber !== gameStatus.whoTurn) {
      //   j = playerPieces.length - 2;
      //   for (let i = playerPieces.length - 1; j >= 0; i--) {
      //     [playerPieces[j], playerPieces[i]] = [
      //       playerPieces[i],
      //       playerPieces[j],
      //     ];
      //     j -= 1;
      //   }
      // }
    }
  }, [gameStatus]);
  // useEffect(() => {
  //   let poppedPlayer = playerPieces.pop();
  //   if (poppedPlayer) {
  //     playerPieces.push(poppedPlayer);
  //   }
  // }, [gameStatus.win.whoWon]);
  return (
    <>
      <Grid container direction="row" spacing={{ md: 0, xs: 2 }}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent={{ md: "right", xs: "center" }}
          sx={{ marginTop: "10px" }}
          md={2}
        >
          <StatusBoardAnimator
            fromX={-100}
            isVisible={isCountDownFinished}
            delay={800}
          >
            <StatusBoard
              isCountDownFinished={isCountDownFinished}
              isBoardCreated={isBoardCreated}
              setPlayerPieces={(props) => setPlayerPieces(props)}
              winBy={lobby.board.winBy}
              gameStatus={gameStatus}
              playerPieces={playerPieces}
              turnNumber={turnNumber}
              quitGame={() => quitGame()}
            />
          </StatusBoardAnimator>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginTop: "120px" }}
          justifyContent="center"
          md={8}
        >
          <Board
            playerId={playerId}
            isCountDownFinished={isCountDownFinished}
            boardColor={lobby.board.color}
            gameStatus={gameStatus}
            setGameStatus={(props) => setGameStatus(props)}
            winBy={lobby.board.winBy}
            lobbyId={lobby.lobbyId}
            lobbyHostSid={lobby.hostSid}
            newMove={newMove}
            turnNumber={turnNumber}
            board={board}
            sizeOfBoardPiece={sizeOfBoardPiece}
            playerPieces={playerPieces}
            piece={piece}
            boardSize={lobby.board.size}
          />
        </Grid>
      </Grid>
      {!isCountDownFinished && isBoardCreated && (
        <Grid
          container
          sx={{
            position: "absolute",
            top: "43%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <CountDownAnimator
            startCountDown={isBoardCreated}
            setBotCanMove={(props) => setBotCanMove(props)}
            setIsCountDownFinished={(props) => setIsCountDownFinished(props)}
            fromScale={0}
          />
        </Grid>
      )}
    </>
  );
}
