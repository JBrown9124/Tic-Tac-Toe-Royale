import { Player } from "../../Models/Player";
import { RgbaColor } from "react-colorful";
import createPiece from "./createPiece";


const getDisplayPlayerPieces = async (
  playerId: string,
  players: Player[],
  setDisplayPiece: (piece: JSX.Element) => void,
 
  boardColor: RgbaColor,
  
  displayPlayerPieces: Player[]
) => {
  return players.forEach((player: Player) => {
    const sizeOfPiece = {desktop:"60px", mobile:"7vw"}
    const defaultPieces = createPiece(
      boardColor.r * 0.299 + boardColor.g * 0.587 + boardColor.b * 0.114 > 186
        ? "black"
        : "white",
        sizeOfPiece
    );
    if (typeof player.piece === "string") {
      if (player.piece.length > 30) {
        const convertedPlayerPiece = (
          <img
            key={player.playerId}
            src={player.piece}
            alt={player.piece}
            style={{
              height: sizeOfPiece.mobile,
              width: sizeOfPiece.mobile,
              maxHeight: sizeOfPiece.desktop,
              maxWidth: sizeOfPiece.desktop,
              borderRadius:"5px"
            }}
          />
        );
        if (player.playerId === playerId) {
          setDisplayPiece(convertedPlayerPiece);

        
        }

        player.piece = convertedPlayerPiece;
        displayPlayerPieces.push(player);
      } else {
        defaultPieces.forEach((piece) => {
          if (piece.name === player.piece) {
            if (player.playerId === playerId) {
              setDisplayPiece(piece.value);

            
            }

            player.piece = piece.value;
            displayPlayerPieces.push(player);
          }
        });
      }
    }
  });
};

export default getDisplayPlayerPieces;
