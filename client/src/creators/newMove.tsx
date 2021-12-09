import socket from "../socket";
import axios from "axios";
interface BodyProps {
  newMove:{rowIdx:number, tileIdx:number, playerNumber:number},
  lobbyId:number
  
}
const saveNewMove = async (body: BodyProps) => {
  console.log(body, "newMoveBody");
  const { data } = await axios.put("http://127.0.0.1:8000/api/board", 
    body,
  );
  return data;
};
const sendNewMove = (data: any) => {
  socket.emit("new-move", 
    data,
  );
};
const newMove = async (body: BodyProps) => {
  try {
    const data = await saveNewMove(body);
    sendNewMove(data);
    console.log(data, "playerReadyData");
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default newMove;
