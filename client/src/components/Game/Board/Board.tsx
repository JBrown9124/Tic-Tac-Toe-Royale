import Grid from "@mui/material/Grid";

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
  lobby: Lobby;
  isHost: boolean;
  isLobbyReceived: boolean;
  setGameStatus: (status: GameStatus) => void;
  gameStatus: GameStatus;
}
export default function Board({
  newMove,
  turnNumber,
  lobby,
  setGameStatus,
  isHost,
  gameStatus,
  isLobbyReceived,
}: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [sessionCookie, setSessionCookie, removeSessionCookie] = useCookies();
  const [botCanMove, setBotCanMove] = useState(false);
  const [piece, setPiece] = useState<JSX.Element | string>();
  const [playerPieces, setPlayerPieces] = useState<PlayerPieces[]>([]);
  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const sizeOfBoardPiece = determineSizeOfPiece(lobby?.board?.size);
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
  );
  useEffect(() => {
    if (sessionCookie.command === "begin") {
      const setUpGame = async () => {
        await getPlayerPieces(
          turnNumber,
          lobby.players,
          setPiece,
          sizeOfBoardPiece,
          setPlayerPieces,
          lobby.board.color
        );
        const boardCreated = await createBoard(
          setBoard,
          lobby.board.size,
          lobby.board.moves
        );
        setIsBoardCreated(boardCreated);
        return setTimeout(() => {
          setBotCanMove(true);
        }, 10000);
      };
      setUpGame();
    }
  }, [isLobbyReceived]);

  useEffect(() => {
    if (botCanMove) {
      const findIfBot = async () => {
        return lobby.players.find((player) => {
          return (
            player.turnNumber === gameStatus.whoTurn &&
            player.playerId.substring(0, 3) === "BOT"
          );
        });
      };
      findIfBot().then((nextIsBot) => {
        if (
          isHost &&
          nextIsBot !== undefined &&
          !gameStatus.win.whoWon &&
          botCanMove
        ) {
          const reqBody = {
            lobbyId: sessionCookie.lobbyId,
            playerId: nextIsBot.playerId,
            turnNumber: nextIsBot.turnNumber,
          };
          botNewMove(reqBody).then((botNewMoveResponse) => {
            if (botNewMoveResponse) {
              determineWinner(
                botNewMoveResponse.rowIdx,
                botNewMoveResponse.tileIdx,
                board,
                lobby.board.size,
                botNewMoveResponse.turnNumber,
                lobby,
                setGameStatus
              );
            }
          });

          startOtherPlayerMoveSound();
        }
      });
    }
  }, [gameStatus, botCanMove]);
  useEffect(() => {
    if (newMove.turnNumber !== undefined && newMove.turnNumber !== 0) {
      board[newMove.rowIdx][newMove.tileIdx] = newMove.turnNumber;
      startOtherPlayerMoveSound();
    }
  }, [newMove]);

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
                beforeColor={lobby.board.color}
                delay={(rowIdx * tileIdx === 0 ? 0 : rowIdx * tileIdx) * 10}
                boardRenderTime={200 * lobby?.board?.size}
                isBoardCreated={isBoardCreated}
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

                          lobby?.board?.size,
                          turnNumber,
                          lobby,
                          setGameStatus
                        )
                      : ""
                  }
                  value={tile}
                  newMove={newMove}
                  chosenPiece={piece}
                  boardColor={lobby?.board?.color}
                />
              </BoardAnimator>
            </>
          ))}
        </Grid>
      ))}
    </>
  );
}
