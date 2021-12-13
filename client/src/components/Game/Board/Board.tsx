import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../../animators/SpaceHover";
import { Tile } from "./Tile";
import { useState, useEffect, useMemo } from "react";
import determineWinner from "../../../creators/determineWinner";
import createBoard from "../../../creators/createBoard";
import Icon from "@mui/material/Icon";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useCookies } from "react-cookie";
import { RgbaColor } from "react-colorful";
import { Player } from "../../../Models/Player";
import createPiece from "../../../storage/createPiece";
import socket from "../../../socket";
import { v4 as uuidv4 } from 'uuid';
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

  const [playerPieces, setPlayerPieces] = useState<PlayerPieces[]>();

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

    const getPlayerPieces = () => {
      let piecesValues: PlayerPieces[] = [];
      sessionCookies?.lobby?.players?.forEach((player: Player) => {
        createPiece("white").forEach((piece) => {
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
    createPiece("white").map((piece) => {
      if (piece.name === sessionCookies.piece) {
        setPiece(piece.value);
      }
    });
    getPlayerPieces();
  }, [sessionCookies?.command]);
  useEffect(() => {
    if (newMove.playerNumber !== 0) {
      board[newMove.rowIdx][newMove.tileIdx] = newMove.playerNumber;
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
