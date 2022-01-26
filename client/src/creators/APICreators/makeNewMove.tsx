import { socket } from "../../socket";
import axios from "axios";
import { NewMove } from "../../Models/NewMove";
import { GameStatus } from "../../Models/GameStatus";
import { PowerUp } from "../../Models/PowerUp";
import url from "../../storage/url";
interface BodyProps {
  gameStatus: GameStatus;
  lobbyId: number;
  hostSid: number;
  powerUp: PowerUp | null;
}
interface DataProps {
  gameStatus: GameStatus;
}
const saveNewMove = async (body: BodyProps) => {
  const { data } = await axios.put(`${url}/api/board`, body);
  return data;
};
const sendNewMove = (data: DataProps, body: BodyProps) => {
  socket.emit("new-move", {
    gameStatus: data.gameStatus,
    hostSid: body.hostSid,
    lobbyId: body.lobbyId,
  });
};
const makeNewMove = async (
  body: BodyProps
): Promise<GameStatus | undefined> => {
  try {
    const data = await saveNewMove(body);
    sendNewMove(data, body);

    return await data.gameStatus;
  } catch (e) {
    console.log("Failed to make a move! Error:" + e);
  }
};

export default makeNewMove;
