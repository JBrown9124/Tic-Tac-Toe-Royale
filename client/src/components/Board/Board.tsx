import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import determineWinner from "../../creators/determineWinner";
import createBoard from "../../creators/createBoard";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useCookies } from "react-cookie";
import { RgbaColor } from "react-colorful";
import { Player } from "../../Models/Player";
import pieces from "../../storage/pieces";
import socket from "../../socket";
import { PlayerPieces } from "../../Models/PlayerPieces";
interface NewMove {
  playerNumber: number;
  rowIdx: number;
  tileIdx: number;
}
interface BoardProps {
  newMove: NewMove;
}

export default function Board({ newMove }: BoardProps) {
  const [board, setBoard] = useState<number[][]>([[]]);
  const [cacheBoard, setCacheBoard] = useState<number[][]>([[]]);
  const [sessionCookies, setSessionCookies, removeSessionCookies] =
    useCookies();
  const [piece, setPiece] = useState<JSX.Element>();
  const [playerNumber, setPlayerNumber] = useState<number>(0);
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
  // removeSessionCookies("boardMoves")
  const updateBoard = (rowIdx: number, tileIdx: number, tile: number) => {
    determineWinner(
      rowIdx,
      tileIdx,
      board,

      sessionCookies?.lobby?.board?.size,
      playerNumber,
      setSessionCookies,
      sessionCookies
    );
    
    return board[rowIdx][tileIdx] = tile;

  };

  useEffect(() => {
    if (sessionCookies.command === "begin") {
      createBoard(
        setCacheBoard,
        setBoard,
        sessionCookies?.lobby?.board?.size,
        setSessionCookies,
        sessionCookies
      );
    }

    sessionCookies?.lobby?.players.map((player: Player) => {
      if (player.name === sessionCookies?.name) {
        return setPlayerNumber(player.playerNumber);
      }
    });
    const getPlayerPieces = () => {
      let piecesValues: PlayerPieces[] = [];
      sessionCookies?.lobby?.players.forEach((player: any) => {
        pieces.forEach((piece) => {
          if (piece.name === player.piece) {
            if (player.playerNumber === playerNumber) {
              setPiece(piece.value);
            }
            piecesValues.push({
              playerNumber: player.playerNumber,
              piece: piece.value,
            });
          }
        });
      });

      setPlayerPieces(piecesValues);
    };
    getPlayerPieces();
  }, [sessionCookies?.command]);
  useEffect(() => {
    if (newMove.playerNumber !== 0) {
      let boardCopy = board;
      boardCopy[newMove.rowIdx][newMove.tileIdx] = newMove.playerNumber;
      setBoard([...boardCopy]);
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
              key={tileIdx}
              updateBoardCache={() => updateBoard(rowIdx, tileIdx, tile)}
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
