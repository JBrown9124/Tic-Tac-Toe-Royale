import Typography from "@mui/material/Typography";
import createPiece from "../../../../../creators/BoardCreators/createPiece";
import SelectedPieceInAnimator from "../../../../../animators/SelectedPieceInAnimator";

interface SelectedPieceProps {
  selectedPiece: string;
  isPieceSelected: boolean;
}
export default function SelectedPiece({
  selectedPiece,
  isPieceSelected,
}: SelectedPieceProps) {
  const pieces = createPiece("black", {
    mobile: "10vw",
    desktop: "90px",
  });

  return (
    <>
      {" "}
      <Typography sx={{
              fontFamily: "Bungee Hairline, cursive",
              fontWeight: 800,
              p: 1,
            }}>
        {" "}
        {selectedPiece.length === 0 ? "No Piece Selected" : "Your Selection"}
      </Typography>
      <SelectedPieceInAnimator
        isPieceSelected={isPieceSelected}
        selectedPiece={selectedPiece}
        delay={0}
      >
        {selectedPiece?.length > 15 ? (
          <img
            src={selectedPiece}
            alt={selectedPiece}
            style={{
              height: "10vw",
              width: "10vw",
              maxHeight: "90px",
              maxWidth: "90px",
              borderRadius: "15px",
            }}
          />
        ) : (
          pieces.map((piece) => {
            if (piece.name === selectedPiece) {
              return piece.value;
            }
          })
        )}
      </SelectedPieceInAnimator>
    </>
  );
}
