import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UploadPieceButton from "./UploadPieceButton";
import YourPiece from "./HoverPiece";
import { useState } from "react";
import PieceOptions from "./PieceOptions";
import createPiece from "../../../../../creators/BoardCreators/createPiece";
import SelectedPiece from "./SelectedPiece";

interface PieceSelectorProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
}
export default function PieceSelector({
  setPiece,
  playerPiece,
}: PieceSelectorProps) {
  const [isPieceSelected, setIsPieceSelected] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState("");
  const [onHoverPiece, setOnHoverPiece] = useState("");
  const [isOnHoverPiece, setIsOnHoverPiece] = useState(false);
  const [hoverDirection, setHoverDirection] = useState("");
  const pieces = createPiece("black");
  const handlePieceSelected = (piece: string) => {
    // setIsPieceSelected(true);
    // setTimeout(() => {
    //   setPiece(piece);
    //   setIsPieceSelected(false);
    // }, 500);
    setPiece(piece);
    setIsPieceSelected(true);
    setTimeout(() => {
      setSelectedPiece(piece);
      setIsPieceSelected(false);
      setOnHoverPiece(piece);
    }, 500);
  };
  const handleHoverPiece = (piece: string) => {
    if (
      pieces.findIndex((element) => element.name === piece) >
      pieces.findIndex((element) => element.name === onHoverPiece)
    ) {
      setHoverDirection("left");
    } else {
      setHoverDirection("right");
    }
    setIsOnHoverPiece(true);
    setTimeout(() => {
      setOnHoverPiece(piece);
      setIsOnHoverPiece(false);
    }, 400);
  };
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Bungee Hairline, cursive",
              fontWeight: 800,
              p: 1,
            }}
          >
            Select your Piece
          </Typography>
        </Grid>
        <Grid item>
          <YourPiece
            isOnHoverPiece={isOnHoverPiece}
            selectedPiece={playerPiece}
            onHoverPiece={onHoverPiece}
            isPieceSelected={isPieceSelected}
            hoverDirection={hoverDirection}
          />
        </Grid>
        <Grid item>
          <PieceOptions
            setOnHoverPiece={(props) => handleHoverPiece(props)}
            isPieceSelected={isPieceSelected}
            selectedPiece={playerPiece}
            onHoverPiece={onHoverPiece}
            setPiece={(props) => handlePieceSelected(props)}
          />
        </Grid>
        <Grid item>
          <SelectedPiece
            selectedPiece={selectedPiece}
            isPieceSelected={isPieceSelected}
          />
        </Grid>
        <Grid item>
          <UploadPieceButton setPiece={(props) => handlePieceSelected(props)} />
        </Grid>
      </Grid>
    </>
  );
}
