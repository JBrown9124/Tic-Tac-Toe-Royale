import { socket } from "../../socket";
import axios from "axios";
import { Move } from "../../Models/Move";
import { GameStatus } from "../../Models/GameStatus";
import { PowerUp } from "../../Models/PowerUp";
import url from "../../storage/url";
interface BodyProps {
  gameStatus: GameStatus;
  lobbyId: number;
  hostSid: number;
}
interface DataProps {
  gameStatus: GameStatus;
}
const saveMove = async (body: BodyProps) => {
  const { data } = await axios.put(`${url}/api/board`, body);
  return data;
};
const sendMove = (data: DataProps, body: BodyProps) => {
  console.log(data.gameStatus,"DATAGAMESTATUS")
  socket.emit("new-move", {
    gameStatus: data.gameStatus,
    hostSid: body.hostSid,
    lobbyId: body.lobbyId,
  });
};
const makeMove = async (body: BodyProps): Promise<GameStatus | undefined> => {
  try {
    const data = await saveMove(body);
    sendMove(data, body);

    return await data.gameStatus;
  } catch (e) {
    console.log("Failed to make a move! Error:" + e);
  }
};

export default makeMove;
