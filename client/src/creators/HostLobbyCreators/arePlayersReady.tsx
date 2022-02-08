import {Player} from "../../Models/Player"
const arePlayersReady = (
  setErrorMessage: (message: string) => void,
  setIsError: (isError: boolean) => void,
  players: Player[],
  playerPiece: string,
  winBy: number,
  size: number
) => {
  const handleError = (message: string) => {
    setErrorMessage(message);
    setIsError(true);
    return false;
  };
  const playersNotReady = players.filter((player) => {
    return !player.isReady && !player.isHost;
  });
  if (playersNotReady.length > 0) {
    return handleError("Players not ready.");
  }
  if (players.length <= 1) {
    return handleError("Need at least 2 players.");
  }
  if (!playerPiece) {
    return handleError("Select a piece.");
  }
  if (winBy > size) {
    return handleError("Win By must be less than or equal to board size.");
  }
  setIsError(false);
  return true;
};
export default arePlayersReady;
