import { PlayerPieces } from "../../Models/PlayerPieces";
import { Player } from "../../Models/Player";
import { RgbaColor } from "react-colorful";
import createPiece from "./createPiece";

interface getPlayerPiecesArguments {
  turnNumber: number;
  players: Player[];
  setPiece: (piece: JSX.Element) => void;
  sizeOfBoardPiece: { mobile: string; desktop: string };
  setPlayerPieces: (playerPieces: PlayerPieces[]) => void;
  boardColor: RgbaColor;
}

const getPlayerPieces = async (
  turnNumber: number,
  players: Player[],
  setPiece: (piece: JSX.Element) => void,
  sizeOfBoardPiece: { mobile: string; desktop: string },
  setPlayerPieces: (playerPieces: PlayerPieces[]) => void,
  boardColor: RgbaColor
) => {
  try {
    let piecesValues: PlayerPieces[] = [];
    players.map((player: Player) => {
      if (player?.piece?.length > 30 && player?.turnNumber === turnNumber) {
        setPiece(
          <img
            src={player?.piece}
            alt={player?.piece}
            key={player.playerId}
            style={{
              height: sizeOfBoardPiece.mobile,
              width: sizeOfBoardPiece.mobile,
              maxHeight: sizeOfBoardPiece.desktop,
              maxWidth: sizeOfBoardPiece.desktop,
            }}
          />
        );
      } else if (
        player?.piece?.length > 30 &&
        player?.turnNumber !== turnNumber
      ) {
        piecesValues.push({
          turnNumber: player?.turnNumber,
          piece: (
            <img
              key={player.playerId}
              src={player?.piece}
              alt={player?.piece}
              style={{
                height: sizeOfBoardPiece.mobile,
                width: sizeOfBoardPiece.mobile,
                maxHeight: sizeOfBoardPiece.desktop,
                maxWidth: sizeOfBoardPiece.desktop,
              }}
            />
          ),
        });
      }
      createPiece(
        boardColor.r * 0.299 + boardColor.g * 0.587 + boardColor.b * 0.114 > 186
          ? "black"
          : "white",
        sizeOfBoardPiece
      ).map((piece) => {
        if (piece.name === player?.piece && player?.turnNumber === turnNumber) {
          setPiece(piece.value);
        } else if (piece.name === player?.piece) {
          piecesValues.push({
            turnNumber: player?.turnNumber,
            piece: piece.value,
          });
        }
      });
    });
    setPlayerPieces(piecesValues);
    return piecesValues.length > 0;
  } catch (e) {
    console.log("Creating pieces failed");
    return false;
  }
};

export default getPlayerPieces;
