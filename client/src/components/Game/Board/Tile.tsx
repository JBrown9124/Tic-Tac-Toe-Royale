import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../../animators/SpaceHover";
import { useState, useEffect, useRef } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { RgbaColor } from "react-colorful";
import { useCookies } from "react-cookie";
import { GameStatus } from "../../../Models/GameStatus";
import { PlayerPieces } from "../../../Models/PlayerPieces";
import { sizeOfPiece, mobileSizeOfPiece } from "../../../storage/sizeOfPiece";
import { useSound } from "use-sound";
interface TileProps {
  chosenPiece: JSX.Element | string | undefined;
  boardColor: RgbaColor;
  newMove: any;
  value: number | JSX.Element;
  playerPieces: PlayerPieces[] | undefined;
  playerNumber: number;
  updateBoardCache: () => void;
  gameStatus: GameStatus;
}
export const Tile = ({
  boardColor,
  chosenPiece,
  value,
  updateBoardCache,
  newMove,
  playerPieces,
  gameStatus,
  playerNumber,
}: TileProps) => {
  const [tile, setTile] = useState<{
    value: String | JSX.Element | number | undefined;
  }>({ value: value });
  const [sessionCookies, setSessionCookies] = useCookies();
  const delay = 0;
  const delayRef = useRef(delay);
  const [startSnare] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/yourMoveSound.mp3"
  );
  const handleClick = () => {
    if (value === 0) {
      setTile({ value: chosenPiece });

      startSnare();
      updateBoardCache();
    }
  };

  return (
    <>
      <Grid
        //  onClick={() => selectTile(rowIdx, tileIdx)}
        onClick={() =>
          gameStatus.whoTurn === playerNumber && gameStatus.win.whoWon === null
            ? handleClick()
            : ""
        }
        item
        container
        maxWidth="sm"
        maxHeight="sm"
        justifyContent="center"
        textAlign="center"
        direction="column"
        sx={{
          height: mobileSizeOfPiece,
          width: mobileSizeOfPiece,
          maxHeight: sizeOfPiece,
          maxWidth: sizeOfPiece,
          cursor: "pointer",
          border: `solid black 1px`,
          boxShadow: 7,
          borderColor:
            boardColor.r * 0.299 + boardColor.g * 0.587 + boardColor.b * 0.114 >
            186
              ? "black"
              : "white",
        }}
      >
        <Grid item sx={{}}>
          {playerPieces?.map((playerPiece) => {
            if (playerPiece.playerNumber === value) {
              return playerPiece.piece;
            } else if (value === playerNumber) {
              return chosenPiece;
            }
          })}
        </Grid>
      </Grid>
    </>
  );
};
