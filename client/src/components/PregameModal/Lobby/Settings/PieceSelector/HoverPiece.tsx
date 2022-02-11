import Typography from "@mui/material/Typography";
import createPiece from "../../../../../creators/BoardCreators/createPiece";
import PieceSelectInAnimator from "../../../../../animators/HoverInAnimator";

interface HoverPieceProps {
  selectedPiece: string;
  isPieceSelected: boolean;
  onHoverPiece: string;
  isOnHoverPiece: boolean;
  hoverDirection: string;
}
export default function HoverPiece({
  selectedPiece,
  isPieceSelected,
  onHoverPiece,
  isOnHoverPiece,
  hoverDirection,
}: HoverPieceProps) {
  const pieces = createPiece("black", {
    mobile: "15vw",
    desktop: "110px",
  });

  return (
    <>
      {" "}
      { onHoverPiece.length === 0 && (
        pieces[0].value
      )}
      <PieceSelectInAnimator
        delay={0}
        selectedPiece={selectedPiece}
        onHoverPiece={onHoverPiece}
        isOnHoverPiece={isOnHoverPiece}
        
        isPieceSelected={isPieceSelected}
        hoverDirection={hoverDirection}
      >
        {onHoverPiece?.length > 15 ? (
          <img
            src={onHoverPiece}
            alt={onHoverPiece}
            style={{
              height: "15vw",
              width: "15vw",
              maxHeight: "110px",
              maxWidth: "110px",
              borderRadius:"15px"
            }}
          />
        ) : (
          pieces.map((piece) => {
            if (piece.name === onHoverPiece) {
              return piece.value;
            }
          })
        )}
      </PieceSelectInAnimator>
    </>
  );
}
