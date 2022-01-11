import { PlayerPieces } from "../../Models/PlayerPieces";
import { Player } from "../../Models/Player";
import { RgbaColor } from "react-colorful";
import createPiece from "./createPiece";

interface getPlayerPiecesArguments {
  turnNumber: number;
  players: Player[];
  setPiece: (piece: JSX.Element) => void;
  sizeOfBoardPiece: { mobile: string; desktop: string };
  setPlayerPieces: (playerPieces: Player[]) => void;
  boardColor: RgbaColor;
}

const getPlayerPieces = async (
  turnNumber: number,

  players: Player[],
  setPiece: (piece: JSX.Element) => void,
  sizeOfBoardPiece: { mobile: string; desktop: string },

  setPlayerPieces: (playerPieces: Player[]) => void,
  boardColor: RgbaColor,
  playerId: string,
  setIsHost: (isHost: boolean) => void,
  setTurnNumber: (turnNumber: number) => void,
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
            }}
          />
        );
        if (player.playerId === playerId) {
          setPiece(convertedPlayerPiece);
          setTurnNumber(player.turnNumber);
          setIsHost(player.isHost);
        }

        player.piece = convertedPlayerPiece;
        playerPieces.push(player);
      } else {
        defaultPieces.map((piece) => {
          if (piece.name === player.piece) {
            if (player.playerId === playerId) {
              setPiece(piece.value);
              setTurnNumber(player.turnNumber);
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
