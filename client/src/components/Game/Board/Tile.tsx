import Grid from "@mui/material/Grid";
import { useState, useEffect, useRef } from "react";
import { RgbaColor } from "react-colorful";
import { GameStatus } from "../../../Models/GameStatus";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import {Player} from "../../../Models/Player";
import {
  sizeOfPiece,
  mobileSizeOfPiece,
  determineSizeOfPiece,
} from "../../../creators/BoardCreators/sizeOfPiece";
import { useSound } from "use-sound";
interface TileProps {
  chosenPiece: JSX.Element | string | undefined;
  boardColor: RgbaColor;

  value: number | JSX.Element | string;
  playerPieces: Player[];

  updateBoardCache: () => void;
  gameStatus: GameStatus;
  sizeOfBoardPiece: { mobile: string; desktop: string };
  playerId: string;
}
export const Tile = ({
  boardColor,
  chosenPiece,
  value,
  updateBoardCache,

  playerPieces,
  gameStatus,

  playerId,
  sizeOfBoardPiece,
}: TileProps) => {
  const [tile, setTile] = useState<{
    value: String | JSX.Element | number | undefined;
  }>({ value: value });
  const [startSnare] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourMoveSound.mp3"
  );

  const handleClick = () => {
    if (typeof value === "number") {
      // setTile({ value: chosenPiece });

      startSnare();
      updateBoardCache();
    }
  };

  return (
    <>
      <Grid
        onClick={() =>
          gameStatus.whoTurn === playerId && !gameStatus.win.whoWon
            ? handleClick()
            : ""
        }
        item
        container
        maxWidth="sm"
        maxHeight="sm"
        // justifyContent={{ xs: "center", md: "normal" }}
        textAlign="center"
        direction="column"
        sx={{
          height: sizeOfBoardPiece.mobile,
          width: sizeOfBoardPiece.mobile,
          maxHeight: sizeOfBoardPiece.desktop,
          maxWidth: sizeOfBoardPiece.desktop,
          cursor: "pointer",
          border: `solid black 1px`,
          boxShadow: 7,
          borderColor:
            boardColor?.r * 0.299 +
              boardColor?.g * 0.587 +
              boardColor?.b * 0.114 >
            186
              ? "black"
              : "white",
        }}
      >
        <Grid item sx={{}}>
          {value === playerId
            ? chosenPiece
            : playerPieces?.map((playerPiece) => {
                if (playerPiece.playerId === value) return playerPiece.piece;
              })}
        </Grid>
      </Grid>
    </>
  );
};
