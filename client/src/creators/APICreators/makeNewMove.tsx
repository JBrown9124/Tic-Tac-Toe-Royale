import { socket } from "../../socket";
import axios from "axios";
import { NewMove } from "../../Models/NewMove";
import { GameStatus } from "../../Models/GameStatus";
import url from "../../storage/url";
interface BodyProps {
  newMove: NewMove;
  lobbyId: number;
  hostSid: number;
}
interface DataProps {
  gameStatus: GameStatus;
  newMove: NewMove;
}
const saveNewMove = async (body: BodyProps) => {
  const { data } = await axios.put(`${url}/api/board`, body);
  return data;
};
const sendNewMove = (data: DataProps, body: BodyProps) => {
  socket.emit("new-move", { data: data, hostSid: body.hostSid });
};
const makeNewMove = async (
  body: BodyProps
): Promise<GameStatus | undefined> => {
  try {
    const data = await saveNewMove(body);
    sendNewMove(data, body);

    return await data.gameStatus;
  } catch (e) {
    console.log(
      "Failed to make a move! Please try refreshing your browser first. If that does not work clear your cookies for this website. Error" +
        e
    );
  }
};

export default makeNewMove;
