import { Player } from "../../Models/Player";
import { RgbaColor } from "react-colorful";
import createPiece from "./createPiece";


const getPlayerPieces = async (
  playerId: string,
  players: Player[],
  setPiece: (piece: JSX.Element) => void,
  sizeOfBoardPiece: { mobile: string; desktop: string },
  boardColor: RgbaColor,
  setIsHost: (isHost: boolean) => void,
  playerPieces: Player[]
) => {
  return players.forEach((player: Player) => {
    const defaultPieces = createPiece(
      boardColor.r * 0.299 + boardColor.g * 0.587 + boardColor.b * 0.114 > 186
        ? "black"
        : "white",
      sizeOfBoardPiece
    );
    if (typeof player.piece === "string") {
      if (player.piece.length > 30) {
        const convertedPlayerPiece = (
          <img
            key={player.playerId}
            src={player.piece}
            alt={player.piece}
            style={{
              height: sizeOfBoardPiece.mobile,
              width: sizeOfBoardPiece.mobile,
              maxHeight: sizeOfBoardPiece.desktop,
              maxWidth: sizeOfBoardPiece.desktop,
              borderRadius:"5px"
            }}
          />
        );
        if (player.playerId === playerId) {
          setPiece(convertedPlayerPiece);

          setIsHost(player.isHost);
        }

        player.piece = convertedPlayerPiece;
        playerPieces.push(player);
      } else {
        defaultPieces.forEach((piece) => {
          if (piece.name === player.piece) {
            if (player.playerId === playerId) {
              setPiece(piece.value);

              setIsHost(player.isHost);
            }

            player.piece = piece.value;
            playerPieces.push(player);
          }
        });
      }
    }
  });
};

export default getPlayerPieces;
