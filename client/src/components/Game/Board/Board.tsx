import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo, useLayoutEffect } from "react";
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
import { socket } from "../../../socket";
import {
  sizeOfPiece,
  mobileSizeOfPiece,
  determineSizeOfPiece,
} from "../../../creators/BoardCreators/sizeOfPiece";
import { WinningMove } from "../../../Models/Win";
import { useSound } from "use-sound";

interface BoardProps {
  newMove: NewMove;
  turnNumber: number;
  lobby: Lobby;
  isHost: boolean;
  isLobbyReceived: boolean;
  isAllPlayersLoaded: boolean;
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
  isAllPlayersLoaded,
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
    if (sessionCookies.command === "begin") {
      const getPlayerPieces = async () => {
        try {
          let piecesValues: PlayerPieces[] = [];
          lobby.players.forEach((player: Player) => {
            if (
              player?.piece?.length > 30 &&
              player?.turnNumber === turnNumber
            ) {
              setPiece(
                <img
                  src={player?.piece}
                  alt={player?.piece}
                  key={player.playerId}
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
              player?.turnNumber !== turnNumber
            ) {
              piecesValues.push({
                turnNumber: player?.turnNumber,
                piece: (
                  <img
                    key={player.playerId}
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
                player?.turnNumber === turnNumber
              ) {
                setPiece(piece.value);
              } else if (piece.name === player?.piece) {
                piecesValues.push({
                  turnNumber: player?.turnNumber,
                  piece: piece.value,
                });
              }
            });
          });
          await setPlayerPieces(piecesValues);
          return true;
        } catch (e) {
          console.log("Creating pieces failed");
          return false;
        }
      };

      getPlayerPieces().then(
        (arePiecesMade) => {
          createBoard(setBoard, lobby.board.size, lobby.board.moves).then(
            (isBoardMade) => {
              setTimeout(() => {
                setIsBoardCreated(isBoardMade);
              }, 5000);
            },
            (onReject) => {
              console.log(`Error creating board${onReject}`);
            }
          );
        },
        (onReject) => {
          console.log(`Error creating pieces ${onReject} `);
        }
      );
    }
  }, [isLobbyReceived]);
  //   useLayoutEffect(()=>{
  // // socket.emit("player-loaded-game", {
  //                 //   playerId: sessionCookies.playerId,
  //                 //   hostSid: lobby.hostSid,
  //                 // });
  //   },[isBoardCreated])
  useLayoutEffect(() => {
    const nextIsBot = lobby?.players?.find((player) => {
      return (
        player.turnNumber === gameStatus.whoTurn &&
        player.playerId.substring(0, 3) === "BOT"
      );
    });

    if (
      isBoardCreated &&
      isHost &&
      nextIsBot !== undefined &&
      !gameStatus?.win?.whoWon &&
      isBoardCreated
    ) {
      const botsMove = async () => {
        const reqBody = {
          lobbyId: lobby?.lobbyId,
          playerId: nextIsBot.playerId,
          turnNumber: nextIsBot.turnNumber,
        };
        const botNewMoveResponse = await botNewMove(reqBody);

        return await determineWinner(
          botNewMoveResponse?.rowIdx,
          botNewMoveResponse?.tileIdx,
          board,

          lobby?.board?.size,
          botNewMoveResponse?.turnNumber,
          lobby,
          setGameStatus,
          gameStatus,
          setSessionCookies
        );
      };
      botsMove();
      startOtherPlayerMoveSound();
    }
  }, [gameStatus, isBoardCreated]);
  useEffect(() => {
    if (newMove?.turnNumber !== undefined && newMove?.turnNumber !== 0) {
      board[newMove.rowIdx][newMove.tileIdx] = newMove?.turnNumber;
      startOtherPlayerMoveSound();
    }
  }, [newMove]);

  return (
    <>
      {board.map((row: number[], rowIdx: number) => (
        <Grid justifyContent="center" container>
          {row.map((tile: number, tileIdx: number) => (
            <>
              <TileHover
                key={rowIdx * tileIdx}
                move={{ rowIdx: rowIdx, tileIdx: tileIdx }}
                win={gameStatus.win}
                beforeColor={lobby?.board?.color}
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
