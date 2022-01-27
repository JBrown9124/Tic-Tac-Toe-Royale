import Grid from "@mui/material/Grid";
import { RgbaColor } from "react-colorful";

import BoardAnimator from "../../../animators/BoardAnimator";
import { Tile } from "./Tile";

import determineWinner from "../../../creators/BoardCreators/determineWinner";
import {Player} from "../../../Models/Player"
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Lobby } from "../../../Models/Lobby";
import { NewMove } from "../../../Models/NewMove";
import {PowerUp } from "../../../Models/PowerUp"
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
  playerPieces: Player[];
  piece: JSX.Element | string;
  winBy: number;
  boardSize: number;
  lobbyId: number;
  lobbyHostSid: number;
  isCountDownFinished: boolean;
  inventory: PowerUp[]
  selectedPowerUpTiles:NewMove[]
  setSelectedPowerUpTiles:(selectedPowerUpTiles:NewMove[]) => void,
  selectedPowerUp:PowerUp
  isUsingPowerUp:boolean,
  powerOrMove:string
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
  inventory,
  selectedPowerUpTiles,
  setSelectedPowerUpTiles,
  selectedPowerUp,
  isUsingPowerUp,
  powerOrMove
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
                powerOrMove={powerOrMove}
                isUsingPowerUp={isUsingPowerUp}
                boardSize={boardSize}
                board={board}
                selectedPowerUp={selectedPowerUp}
                setSelectedPowerUpTiles={(props)=> setSelectedPowerUpTiles(props)}
                selectedPowerUpTiles={selectedPowerUpTiles}
                  playerId={playerId}
                  key={rowIdx * tileIdx}
                  gameStatus={gameStatus}
                  rowIdx={rowIdx}
                  tileIdx={tileIdx}
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
                          setGameStatus,
                   
                          inventory
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
