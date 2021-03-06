import Grid from "@mui/material/Grid";
import { RgbaColor } from "react-colorful";
import BoardAnimator from "../../../animators/BoardAnimator";
import { Tile } from "./Tile";
import determineWinner from "../../../creators/BoardCreators/determineWinner/determineWinner";
import { Player } from "../../../Models/Player";
import { Move } from "../../../Models/Move";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import { GameStatus } from "../../../Models/GameStatus";


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
  inventory: PowerUps;
  selectedPowerUpTiles: Move[];
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  selectedPowerUp: PowerUp;
  isUsingPowerUp: boolean;
  // powerOrMove: string;
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
  // powerOrMove,
}: BoardProps) {
  return (
    <>
      {board.map((row: (string | number)[], rowIdx: number) => (
        <Grid justifyContent="center" container>
          {row.map((tile: number | string, columnIdx: number) => (
            <>
              <BoardAnimator
                isCountDownFinished={isCountDownFinished}
                key={rowIdx * columnIdx}
                move={{ rowIdx: rowIdx, columnIdx: columnIdx }}
                win={gameStatus.win}
                beforeColor={boardColor}
                delay={(rowIdx * columnIdx === 0 ? 0 : rowIdx * columnIdx) * 10}
                boardRenderTime={200 * boardSize}
              >
                <Tile
                  isUsingPowerUp={isUsingPowerUp}
                  boardSize={boardSize}
                  board={board}
                  selectedPowerUp={selectedPowerUp}
                  setSelectedPowerUpTiles={(props) =>
                    setSelectedPowerUpTiles(props)
                  }
                  selectedPowerUpTiles={selectedPowerUpTiles}
                  playerId={playerId}
                  key={rowIdx * columnIdx}
                  gameStatus={gameStatus}
                  rowIdx={rowIdx}
                  columnIdx={columnIdx}
                  playerPieces={playerPieces}
                  sizeOfBoardPiece={sizeOfBoardPiece}
                  updateBoardCache={() =>
                    gameStatus.whoTurn === playerId
                      ? determineWinner(
                          rowIdx,
                          columnIdx,
                          board,
                          boardSize,
                          playerId,
                          winBy,
                          lobbyId,
                          lobbyHostSid,
                          setGameStatus,
                          inventory,
                       
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
