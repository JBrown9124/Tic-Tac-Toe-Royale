import playerReady from "../APICreators/playerReady";
const sendHostPiece = (
  setPiece: (pieceValue: string) => void,
  pieceValue: string,
  playerName: string,
  playerId: string,
  lobbyId: number,
  hostSid: number
) => {
  setPiece(pieceValue);
  const reqBody = {
    player: {
      name: playerName,
      piece: pieceValue,
      playerId: playerId,
    },
    lobbyId: lobbyId,
    hostSid: hostSid,
  };
  playerReady(reqBody);
};
export default sendHostPiece;
