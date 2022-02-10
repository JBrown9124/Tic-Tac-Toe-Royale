import Grid from "@mui/material/Grid";
import createPiece from "../../../../../creators/BoardCreators/createPiece";
import useSound from "use-sound";
import PieceSelectorAnimator from "../../../../../animators/PieceSelectorAnimator";

interface PieceOptionsProps {
  setPiece: (piece: string) => void;
  selectedPiece: string;
  isPieceSelected: boolean;
  setOnHoverPiece: (piece: string) => void;
  onHoverPiece:string
}
export default function PieceOptions({
  setPiece,
  selectedPiece,
  isPieceSelected,
  setOnHoverPiece,
  onHoverPiece
}: PieceOptionsProps) {
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const pieces = createPiece("black");
  const handleSelectPiece = (pieceName: string) => {
    setPiece(pieceName);
    playSound();
  };
 
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{ background: "#e8f5e9", borderRadius: "40px" }}
      >
        <Grid
          item
          spacing={0}
          container
          justifyContent="center"
          sx={{
            overflowY: "hidden",
            overflowX: "auto",
            p:2
          }}
        >
          {pieces.map((piece) => (
            <Grid
              item
              key={piece.name}
              onClick={() => handleSelectPiece(piece.name)}
              onMouseEnter={() => setOnHoverPiece(piece.name)}
              sx={{ cursor: "pointer", p:1 }}
            >
              <PieceSelectorAnimator  isSelected={selectedPiece === piece.name}>
                {piece.value}
              </PieceSelectorAnimator>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
