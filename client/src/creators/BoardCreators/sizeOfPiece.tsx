export const sizeOfPiece = "40px";
/* 40px for 20x20, 80px for 3x3 */
export const mobileSizeOfPiece = "7vw";
/* 5vw for 20x20, 20vw for 3x3 */

export const determineSizeOfPiece = (
  boardSize: number
): { mobile: string; desktop: string } => {
  let pieceSize = { mobile: "5vw", desktop: "0px" };
  switch(boardSize){
    case 15:
      pieceSize.desktop = "45px";
      pieceSize.mobile = "6vw";
      break;
    case 14:
        pieceSize.desktop = "48px";
        pieceSize.mobile = "6vw";
        break;
    case 13:
        pieceSize.desktop = "51.8px";
        pieceSize.mobile = "6vw";
        break;
    case 12:
          pieceSize.desktop = "56.1px";
          pieceSize.mobile = "6vw";
          break;
    case 11:
            pieceSize.desktop = "61.3px";
            pieceSize.mobile = "6vw";
            break;
            case 10:
              pieceSize.desktop = "67.5px";
              pieceSize.mobile = "6vw";
              break;
              case 9:
              pieceSize.desktop = "74.9px";
              pieceSize.mobile = "6vw";
              break;
              case 8:
              pieceSize.desktop = "84.2px";
              pieceSize.mobile = "6vw";
              break;
              case 7:
              pieceSize.desktop = "98.2px";
              pieceSize.mobile = "6vw";
              break;
              case 6:
                pieceSize.desktop = "115px";
                pieceSize.mobile = "16vw";
                break;
            
                case 5:
                  pieceSize.desktop = "103.2px";
                  pieceSize.mobile = "6vw";
                  break;
                  case 4:
                  pieceSize.desktop = "103.2px";
                  pieceSize.mobile = "6vw";
                  break;
                  case 3:
                  pieceSize.desktop = "103.2px";
                  pieceSize.mobile = "14vw";
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
