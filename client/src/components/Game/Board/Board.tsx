import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import determineWinner from "../../../creators/determineWinner";
import createBoard from "../../../creators/createBoard";
import Icon from '@mui/material/Icon';
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useCookies } from "react-cookie";
import { RgbaColor } from "react-colorful";
import { Player } from "../../../Models/Player";
import pieces from "../../../storage/CreatePiece";
import socket from "../../../socket";
import { PlayerPieces } from "../../../Models/PlayerPieces";
interface NewMove {
  playerNumber: number;
  rowIdx: number;
  tileIdx: number;
}
interface BoardProps {
  newMove: NewMove;
  playerNumber: number;
}

export default function Board({ newMove, playerNumber }: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [cacheBoard, setCacheBoard] = useState<number[][]>([[]]);
  const [sessionCookies, setSessionCookies, removeSessionCookies] =
    useCookies();
  const [piece, setPiece] = useState<JSX.Element>();
  const [createdPieces,setCreatedPieces] =  useState<any>(pieces(`rgba(${sessionCookies.lobby.board.color.r}, ${sessionCookies.lobby.board.color.g}, ${sessionCookies.lobby.board.color.b}, ${sessionCookies.lobby.board.color.a-.5})`));
  const [playerPieces, setPlayerPieces] = useState<PlayerPieces[]>();

  // socket.on("connect", () => {
  //   console.log("connected to server");
  //   socket.on("new-move", (newMove) => {
  //     // if (receivedLobby.lobbyId === sessionCookies.session?.lobby?.lobbyId) {

  //       let newMoveRowIdx = newMove.newMove.rowIdx;
  //       let newMoveTileIdx = newMove.newMove.tileIdx;
  //       let newMovePlayerNumber = newMove.newMove.playerNumber;
  //       console.log(newMoveRowIdx ,"NewMoveSocket");
  //       if (board !== undefined && newMoveRowIdx !==undefined){
  //       const boardCopy = board
  //       console.log(boardCopy, "boardCopy")
  //       boardCopy[newMoveRowIdx ][newMoveTileIdx ]=newMovePlayerNumber;
  //       setBoard(boardCopy);}

  //     // }
  //   });

  // });
  // removeSessionCookies("gameStatus")

  useEffect(() => {
    if (sessionCookies.command === "begin") {
    setCreatedPieces(pieces(`rgba(${sessionCookies.lobby.board.color.r}, ${sessionCookies.lobby.board.color.g}, ${sessionCookies.lobby.board.color.b}, ${sessionCookies.lobby.board.color.a-.5})`));
      createBoard(
        setCacheBoard,
        setBoard,
        sessionCookies?.lobby?.board?.size,
        setSessionCookies,
        sessionCookies
      );
    }

    const getPlayerPieces = () => {
      let piecesValues: PlayerPieces[] = [];
      sessionCookies?.lobby?.players?.forEach((player: Player) => {
        createdPieces.forEach((piece) => {
          if (piece.name === player.piece) {
            piecesValues.push({
              playerNumber: player.playerNumber,
              piece: piece.value,
            });
          }
        });
      });

      setPlayerPieces(piecesValues);
    };
    createdPieces.map((piece) => {
      if (piece.name === sessionCookies.piece) {
        setPiece(piece.value);
      }
    });
    getPlayerPieces();
  }, [sessionCookies?.command]);
  useEffect(() => {
    if (newMove.playerNumber !== 0) {
      let boardCopy = board;
      boardCopy[newMove.rowIdx][newMove.tileIdx] = newMove.playerNumber;
     
      console.log(boardCopy, "boardcoppy");
    }
  }, [newMove]);

  return (
    <>
      {board.map((row: number[], rowIdx: number) => (
        <Grid key={rowIdx} justifyContent="center" container>
          {row.map((tile: number, tileIdx: number) => (
            <Tile
              playerNumber={playerNumber}
              playerPieces={playerPieces}
              key={rowIdx + tileIdx}
              updateBoardCache={() =>
                sessionCookies?.gameStatus?.whoTurn === playerNumber
                  ? determineWinner(
                      rowIdx,
                      tileIdx,
                      cacheBoard,

                      sessionCookies?.lobby?.board?.size,
                      playerNumber,
                      setSessionCookies,
                      sessionCookies
                    )
                  : ""
              }
              value={tile}
              newMove={newMove}
              chosenPiece={piece}
              boardColor={sessionCookies?.lobby?.board?.color}
            />
          ))}
        </Grid>
      ))}
    </>
  );
}
