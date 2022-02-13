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
  playerPieces: Player[],
  setDisplayPiece: (piece: JSX.Element) => void,

  displayPlayerPieces: Player[]
) => {
  return players.forEach((player: Player) => {
    const defaultPieces = createPiece(
      boardColor.r * 0.299 + boardColor.g * 0.587 + boardColor.b * 0.114 > 186
        ? "black"
        : "white",
      sizeOfBoardPiece
    );

    const sizeOfDisplayPiece = { desktop: "60px", mobile: "7vw" };
    const defaultDisplayPieces = createPiece(
      boardColor.r * 0.299 + boardColor.g * 0.587 + boardColor.b * 0.114 > 186
        ? "black"
        : "white",
      sizeOfDisplayPiece
    );

    if (typeof player.piece === "string") {
      if (player.piece.length > 30) {
        const convertedDisplayPlayerPiece = (
          <img
            key={player.playerId}
            src={player.piece}
            alt={player.piece}
            style={{
              height: sizeOfDisplayPiece.mobile,
              width: sizeOfDisplayPiece.mobile,
              maxHeight: sizeOfDisplayPiece.desktop,
              maxWidth: sizeOfDisplayPiece.desktop,
              borderRadius: "5px",
            }}
          />
        );
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
              borderRadius: "5px",
            }}
          />
        );
        if (player.playerId === playerId) {
          setPiece(convertedPlayerPiece);
          setDisplayPiece(convertedDisplayPlayerPiece);
          setIsHost(player.isHost);
        }
        const displayPlayerCopy = {...player}
        displayPlayerCopy.piece = convertedDisplayPlayerPiece;
        displayPlayerPieces.push(displayPlayerCopy);

        const playerCopy = {...player}
        playerCopy.piece = convertedPlayerPiece;
        playerPieces.push(playerCopy);
      } else {
        
        defaultPieces.forEach((piece) => {
          if (piece.name === player.piece) {
            if (player.playerId === playerId) {
              setPiece(piece.value);

              setIsHost(player.isHost);
            }
            const playerCopy = {...player}
            playerCopy.piece = piece.value;
            playerPieces.push(playerCopy);
          }
        });
        defaultDisplayPieces.forEach((piece) => {
          if (piece.name === player.piece) {
            if (player.playerId === playerId) {
              setDisplayPiece(piece.value);
            }
            const displayPlayerCopy = {...player}
            displayPlayerCopy.piece = piece.value;
            displayPlayerPieces.push(displayPlayerCopy);
          }
        });

      }
    }
  });
};

export default getPlayerPieces;
