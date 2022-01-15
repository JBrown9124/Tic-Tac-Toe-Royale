import Grid from "@mui/material/Grid";
import { RgbaColor } from "react-colorful";

import BoardAnimator from "../../../animators/BoardAnimator";
import { Tile } from "./Tile";

import determineWinner from "../../../creators/BoardCreators/determineWinner";

import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Lobby } from "../../../Models/Lobby";
import { NewMove } from "../../../Models/NewMove";
import { GameStatus } from "../../../Models/GameStatus";
import { determineSizeOfPiece } from "../../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";

interface BoardProps {
  
 
  playerId: string;
  setGameStatus: (status: GameStatus) => void;
  gameStatus: GameStatus;
  sizeOfBoardPiece: { mobile: string; desktop: string };
  board: (number | string)[][];
  boardColor: RgbaColor;
  playerPieces: PlayerPieces[];
  piece: JSX.Element | string;
  winBy: number;
  boardSize: number;
  lobbyId: number;
  lobbyHostSid: number;
  isCountDownFinished: boolean;
}
export default function Board({
 

  setGameStatus,
  gameStatus,
  board,
  sizeOfBoardPiece,
  boardColor,
  playerPieces,
  winBy,
  boardSize,
  lobbyHostSid,
  lobbyId,
  isCountDownFinished,
  playerId,
  piece,
}: BoardProps) {
  return (
    <>
      {board.map((row: (string | number)[], rowIdx: number) => (
        <Grid justifyContent="center" container>
          {row.map((tile: number | string, tileIdx: number) => (
            <>
              <BoardAnimator
                isCountDownFinished={isCountDownFinished}
                key={rowIdx * tileIdx}
                move={{ rowIdx: rowIdx, tileIdx: tileIdx }}
                win={gameStatus.win}
                beforeColor={boardColor}
                delay={(rowIdx * tileIdx === 0 ? 0 : rowIdx * tileIdx) * 10}
                boardRenderTime={200 * boardSize}
              >
                <Tile
                  playerId={playerId}
                  key={rowIdx * tileIdx}
                  gameStatus={gameStatus}
             
                  playerPieces={playerPieces}
                  sizeOfBoardPiece={sizeOfBoardPiece}
                  updateBoardCache={() =>
                    gameStatus.whoTurn ===
                    playerId
                      ? determineWinner(
                          rowIdx,
                          tileIdx,
                          board,

                          boardSize,
                          playerId,
                          winBy,
                          lobbyId,
                          lobbyHostSid,
                          setGameStatus
                        )
                      : ""
                  }
                  value={tile}
              
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
