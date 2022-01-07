import Grid from "@mui/material/Grid";
import { RgbaColor } from "react-colorful";

import BoardAnimator from "../../../animators/BoardAnimator";
import { Tile } from "./Tile";
import { useState, useEffect } from "react";
import determineWinner from "../../../creators/BoardCreators/determineWinner";
import createBoard from "../../../creators/BoardCreators/createBoard";
import { useCookies } from "react-cookie";
import getPlayerPieces from "../../../creators/BoardCreators/getPlayerPieces";
import botNewMove from "../../../creators/APICreators/botNewMove";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Lobby } from "../../../Models/Lobby";
import { NewMove } from "../../../Models/NewMove";
import { GameStatus } from "../../../Models/GameStatus";
import { determineSizeOfPiece } from "../../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";

interface BoardProps {
  newMove: NewMove;
  turnNumber: number;
  isHost: boolean;
  isLobbyReceived: boolean;
  setGameStatus: (status: GameStatus) => void;
  gameStatus: GameStatus;
  sizeOfBoardPiece: { mobile: string; desktop: string };
  board: number[][];
  boardColor: RgbaColor;
  isBoardCreated: boolean;
  playerPieces: PlayerPieces[];
  piece: JSX.Element | string;
  winBy: number;
  boardSize: number;
  lobbyId: number;
  lobbyHostSid: number;
}
export default function Board({
  newMove,
  turnNumber,

  setGameStatus,
  isHost,
  gameStatus,
  isLobbyReceived,
  board,
  sizeOfBoardPiece,
  boardColor,
  isBoardCreated,
  playerPieces,
  winBy,
  boardSize,
  lobbyHostSid,
  lobbyId,
  piece,
}: BoardProps) {
  return (
    <>
      {board.map((row: number[], rowIdx: number) => (
        <Grid justifyContent="center" container>
          {row.map((tile: number, tileIdx: number) => (
            <>
              <BoardAnimator
                key={rowIdx * tileIdx}
                move={{ rowIdx: rowIdx, tileIdx: tileIdx }}
                win={gameStatus.win}
                beforeColor={boardColor}
                delay={(rowIdx * tileIdx === 0 ? 0 : rowIdx * tileIdx) * 10}
                boardRenderTime={200 * boardSize}
              
              >
                <Tile
                  key={rowIdx * tileIdx}
                  gameStatus={gameStatus}
                  turnNumber={turnNumber}
                  playerPieces={playerPieces}
                  sizeOfBoardPiece={sizeOfBoardPiece}
                  updateBoardCache={() =>
                    gameStatus.whoTurn === turnNumber
                      ? determineWinner(
                          rowIdx,
                          tileIdx,
                          board,

                          boardSize,
                          turnNumber,
                          winBy,
                          lobbyId,
                          lobbyHostSid,
                          setGameStatus
                        )
                      : ""
                  }
                  value={tile}
                  newMove={newMove}
                  chosenPiece={piece}
                  boardColor={boardColor}
                />
              </BoardAnimator>
            </>
          ))}
        </Grid>
      ))}
    </>
  );
}
