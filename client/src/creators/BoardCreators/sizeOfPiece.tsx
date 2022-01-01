export const sizeOfPiece = "40px";
/* 40px for 20x20, 80px for 3x3 */
export const mobileSizeOfPiece = "7vw";
/* 5vw for 20x20, 20vw for 3x3 */

export const determineSizeOfPiece = (
  boardSize: number
): { mobile: string; desktop: string } => {
  let pieceSize = { mobile: "5vw", desktop: "0px" };

  if (boardSize >= 3 && boardSize <= 10) {
    pieceSize.desktop = "80px";
    pieceSize.mobile = "10vw";
  } else if (boardSize >= 11 && boardSize <= 15) {
    pieceSize.desktop = "60px";
    pieceSize.mobile = "6vw";
  } else if (boardSize >= 16 && boardSize <= 20) {
    pieceSize.desktop = "40px";
    pieceSize.mobile = "5vw";
  }
  return pieceSize;
};
