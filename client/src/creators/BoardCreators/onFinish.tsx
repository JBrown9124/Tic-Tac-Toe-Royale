import { PowerUp, PowerUps } from "../../Models/PowerUp";
import { GameStatus } from "../../Models/GameStatus";
import { Move } from "../../Models/Move";
import { Lobby } from "../../Models/Lobby";
import makeNewMove from "../APICreators/makeNewMove";
const onFinish = async (
  selectedPowerUp: PowerUp,
  gameStatus: GameStatus,
  selectedPowerUpTiles: Move[],
  lobby: Lobby,
  inventory: PowerUps,
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void,
  setSelectedPowerUp: (selectedPowerUp: PowerUp) => void,
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void,
  setGameStatus: (gameStatus: GameStatus) => void,
  board: (number | string)[][],
  playerId: string
) => {
  let newGameStatus = gameStatus;

  if (selectedPowerUp.name === "cleave" || selectedPowerUp.name === "arrow") {
    selectedPowerUpTiles.shift();
  }

  newGameStatus.newPowerUpUse.powerUp = selectedPowerUp;
  newGameStatus.newPowerUpUse.selectedPowerUpTiles = selectedPowerUpTiles;
  newGameStatus.newMove.playerId = "";
  const reqBody = {
    lobbyId: lobby.lobbyId,
    hostSid: lobby.hostSid,
    gameStatus: newGameStatus,
  };

  const gameStatusResponse = await makeNewMove(reqBody);
  if (gameStatusResponse) {
    const powerUpKey = String(selectedPowerUp.value);
    inventory[powerUpKey].quantity -= 1;
    setSelectedPowerUpTiles([]);
    setSelectedPowerUp({
      value: 0,
      name: "",
      description: "",
      imgUrl: "",

      rules: {
        affectsCaster: false,
        direction: {
          isVertical: false,
          isHorizontal: false,
          isDiagonal: false,
        },
        castAnywhere: false,
        tilesAffected: 0,
        mustBeEmptyTile: false,
        areaShape: "line",
      },
      selectColor: "",
      quantity: 0,
    });
    setIsUsingPowerUp(false);
    setGameStatus(gameStatusResponse);
  }
};
export default onFinish;
