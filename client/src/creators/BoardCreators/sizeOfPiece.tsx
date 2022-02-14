export const sizeOfPiece = "40px";
/* 40px for 20x20, 80px for 3x3 */
export const mobileSizeOfPiece = "7vw";
/* 5vw for 20x20, 20vw for 3x3 */

export const determineSizeOfPiece = (
  boardSize: number
): { mobile: string; desktop: string } => {
  let pieceSize = { mobile: "5vw", desktop: "0px" };
  switch (boardSize) {
    case 15:
      pieceSize.desktop = "46.2px";
      pieceSize.mobile = "6.4vw";
      break;
    case 14:
      pieceSize.desktop = "49.5px";
      pieceSize.mobile = "6.9vw";
      break;
    case 13:
      pieceSize.desktop = "53.3px";
      pieceSize.mobile = "7.4vw";
      break;
    case 12:
      pieceSize.desktop = "57.76px";
      pieceSize.mobile = "8.0vw";
      break;
    case 11:
      pieceSize.desktop = "63px";
      pieceSize.mobile = "8.7vw";
      break;
    case 10:
      pieceSize.desktop = "69.3px";
      pieceSize.mobile = "9.6vw";
      break;
    case 9:
      pieceSize.desktop = "77px";
      pieceSize.mobile = "10.7vw";
      break;
    case 8:
      pieceSize.desktop = "86.6px";
      pieceSize.mobile = "12.0vw";
      break;
    case 7:
      pieceSize.desktop = "99px";
      pieceSize.mobile = "13.8vw";
      break;
    case 6:
      pieceSize.desktop = "115.5px";
      pieceSize.mobile = "16.1vw";
      break;

    case 5:
      pieceSize.desktop = "138.5px";
      pieceSize.mobile = "19.3vw";
      break;
    case 4:
      pieceSize.desktop = "173.2px";
      pieceSize.mobile = "24.4vw";
      break;
    case 3:
      pieceSize.desktop = "231px";
      pieceSize.mobile = "32.2vw";
      break;
  }
  // if (boardSize >= 3 && boardSize <= 10) {
  //   pieceSize.desktop = "80px";
  //   pieceSize.mobile = "10vw";
  // } else if (boardSize >= 11 && boardSize <= 15) {
  //   pieceSize.desktop = "40px";
  //   pieceSize.mobile = "6vw";}
  // } else if (boardSize >= 16 && boardSize <= 20) {
  //   pieceSize.desktop = "40px";
  //   pieceSize.mobile = "5vw";
  // }
  return pieceSize;
};
