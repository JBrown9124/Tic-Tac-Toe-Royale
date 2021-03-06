import Grid from "@mui/material/Grid";
import createPiece from "../../../../../creators/BoardCreators/createPiece";
import useSound from "use-sound";
import PieceSelectorAnimator from "../../../../../animators/PieceSelectorAnimator";
import {VolumeContext} from "../../../../../storage/VolumeContext"
import {useContext} from "react"
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
  const volume:number=useContext(VolumeContext)
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3", {volume:volume}
  );
  const pieces = createPiece("white",{mobile:'8vw',desktop:"40px"});
  const handleSelectPiece = (pieceName: string) => {
    setPiece(pieceName);
    playSound();
  };
 
  return (
    <>
      <Grid
        container
        direction="column"
        // sx={{ borderRadius: "5px",   background: '#dcc3e2',  }}
      >
        <Grid
          item
          spacing={0}
          container
          justifyContent="center"
          sx={{
            overflowY: "hidden",
            overflowX: "auto",
            p:0
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
              <PieceSelectorAnimator  isSelected={onHoverPiece === piece.name}>
                {piece.value}
              </PieceSelectorAnimator>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
