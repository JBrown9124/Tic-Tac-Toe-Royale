import Grid from "@mui/material/Grid";
import { Player } from "../../Models/Player";
import { useState, useEffect } from "react";
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
import useMoveHandler from "../../hooks/useMoveHandler"

interface GameProps {
  newMove: NewMove;
  lobby: Lobby;
  gameStatus: GameStatus;
  isLobbyReceived: boolean;
  setGameStatus: (status: GameStatus) => void;
  setNewMove: (newMoveValue: NewMove) => void;
  isCountDownFinished: boolean;
  turnNumber: number;
  playerPieces:Player[],
  quitGame:()=>void,
  sizeOfBoardPiece:{mobile: string; desktop: string},
  board:number[][],
  piece:JSX.Element | string,
  isBoardCreated:boolean,
  setBotCanMove:(canMove:boolean)=>void,
  setIsCountDownFinished:(isFinished:boolean)=>void

}
export default function Game({
  newMove,
  lobby,
  gameStatus,
  setGameStatus,
  setNewMove,
  isLobbyReceived,
  isCountDownFinished,
  turnNumber,playerPieces,
  quitGame,
  sizeOfBoardPiece,
  board,
  piece,
  isBoardCreated,
  setBotCanMove,
  setIsCountDownFinished,


}: GameProps) {
  

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
              winBy={lobby?.board?.winBy}
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

