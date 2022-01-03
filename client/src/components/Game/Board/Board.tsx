import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import determineWinner from "../../../creators/BoardCreators/determineWinner";
import getGame from "../../../creators/APICreators/getGame";
import createBoard from "../../../creators/BoardCreators/createBoard";
import Icon from "@mui/material/Icon";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useCookies } from "react-cookie";
import { RgbaColor } from "react-colorful";
import { Player } from "../../../Models/Player";
import createPiece from "../../../creators/BoardCreators/createPiece";
import botNewMove from "../../../creators/APICreators/botNewMove";
import { v4 as uuidv4 } from "uuid";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { Lobby } from "../../../Models/Lobby";
import { NewMove } from "../../../Models/NewMove";
import { GameStatus } from "../../../Models/GameStatus";
import {
  sizeOfPiece,
  mobileSizeOfPiece,
  determineSizeOfPiece,
} from "../../../creators/BoardCreators/sizeOfPiece";
import { WinningMove } from "../../../Models/Win";
import { useSound } from "use-sound";

interface BoardProps {
  newMove: NewMove;
  playerNumber: number;
  lobby: Lobby;
  isHost: boolean;

  setGameStatus: (status: GameStatus) => void;
  gameStatus: GameStatus;
}
export default function Board({
  newMove,
  playerNumber,
  lobby,
  setGameStatus,
  isHost,
  gameStatus,
}: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [cacheBoard, setCacheBoard] = useState<number[][]>([[]]);
  const [sessionCookies, setSessionCookies, removeSessionCookies] =
    useCookies();
  const [piece, setPiece] = useState<JSX.Element | string>();
  const [playerPieces, setPlayerPieces] = useState<PlayerPieces[]>([]);
  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const sizeOfBoardPiece = determineSizeOfPiece(lobby?.board?.size);
  const [startOtherPlayerMoveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/otherPlayerMoveSound.mp3"
  );
  useEffect(() => {
    if (
      sessionCookies.command === "begin" &&
      lobby.board.size &&
      lobby.board.moves &&
      lobby.players.length > 1
    ) {
      const getPlayerPieces = () => {
        let piecesValues: PlayerPieces[] = [];
        lobby.players.forEach((player: Player) => {
          if (
            player?.piece?.length > 30 &&
            player?.playerNumber === playerNumber
          ) {
            setPiece(
              <img
                src={player?.piece}
                alt={player?.piece}
                style={{
                  height: sizeOfBoardPiece.mobile,
                  width: sizeOfBoardPiece.mobile,
                  maxHeight: sizeOfBoardPiece.desktop,
                  maxWidth: sizeOfBoardPiece.desktop,
                }}
              />
            );
          } else if (
            player?.piece?.length > 30 &&
            player?.playerNumber !== playerNumber
          ) {
            piecesValues.push({
              playerNumber: player?.playerNumber,
              piece: (
                <img
                  src={player?.piece}
                  alt={player?.piece}
                  style={{
                    height: sizeOfBoardPiece.mobile,
                    width: sizeOfBoardPiece.mobile,
                    maxHeight: sizeOfBoardPiece.desktop,
                    maxWidth: sizeOfBoardPiece.desktop,
                  }}
                />
              ),
            });
          }
          createPiece(
            lobby?.board?.color?.r * 0.299 +
              lobby?.board?.color?.g * 0.587 +
              lobby?.board?.color?.b * 0.114 >
              186
              ? "black"
              : "white",
            sizeOfBoardPiece
          ).forEach((piece) => {
            if (
              piece.name === player?.piece &&
              player?.playerNumber === playerNumber
            ) {
              setPiece(piece.value);
            } else if (piece.name === player?.piece) {
              piecesValues.push({
                playerNumber: player?.playerNumber,
                piece: piece.value,
              });
            }
          });
        });

        setPlayerPieces(piecesValues);
      };

      getPlayerPieces();
      createBoard(setBoard, lobby.board.size, lobby.board.moves);

      setIsBoardCreated(true);
    }
  }, [playerNumber, lobby]);
  useEffect(() => {
    const nextIsBot = lobby?.players?.find((player) => {
      return (
        player.playerNumber === gameStatus.whoTurn &&
        player.playerId.substring(0, 3) === "BOT"
      );
    });

    if (
      isHost &&
      nextIsBot !== undefined &&
      !gameStatus?.win?.whoWon &&
      isBoardCreated
    ) {
      const botsMove = async () => {
        const reqBody = {
          lobbyId: lobby?.lobbyId,
          playerId: nextIsBot.playerId,
          playerNumber: nextIsBot.playerNumber,
        };
        const botNewMoveResponse = await botNewMove(reqBody);

        return await determineWinner(
          botNewMoveResponse?.rowIdx,
          botNewMoveResponse?.tileIdx,
          board,

          lobby?.board?.size,
          botNewMoveResponse?.playerNumber,
          lobby,
          setGameStatus,
          gameStatus,
          setSessionCookies
        );
      };
      botsMove();
      startOtherPlayerMoveSound();
    }
  }, [isBoardCreated, gameStatus]);
  useEffect(() => {
    if (newMove?.playerNumber !== undefined && newMove?.playerNumber !== 0) {
      board[newMove?.rowIdx][newMove?.tileIdx] = newMove?.playerNumber;
      startOtherPlayerMoveSound();
    }
  }, [newMove]);

  return (
    <>
      {board.map((row: number[], rowIdx: number) => (
        <Grid key={rowIdx} justifyContent="center" container>
          {row.map((tile: number, tileIdx: number) => (
            <>
              <TileHover
                move={{ rowIdx: rowIdx, tileIdx: tileIdx }}
                win={gameStatus.win}
                beforeColor={lobby?.board?.color}
                delay={(rowIdx * tileIdx === 0 ? 0 : rowIdx * tileIdx) * 10}
                boardRenderTime={200 * lobby?.board?.size}
              >
                <Tile
                  gameStatus={gameStatus}
                  playerNumber={playerNumber}
                  playerPieces={playerPieces}
                  sizeOfBoardPiece={sizeOfBoardPiece}
                  updateBoardCache={() =>
                    gameStatus.whoTurn === playerNumber
                      ? determineWinner(
                          rowIdx,
                          tileIdx,
                          board,

                          lobby?.board?.size,
                          playerNumber,
                          lobby,
                          setGameStatus,
                          gameStatus,
                          setSessionCookies
                        )
                      : ""
                  }
                  value={tile}
                  newMove={newMove}
                  chosenPiece={piece}
                  boardColor={lobby?.board?.color}
                />
              </TileHover>
            </>
          ))}
        </Grid>
      ))}
    </>
  );
}
