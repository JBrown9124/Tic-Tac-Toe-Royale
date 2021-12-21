import {socket} from "../socket";
import axios from "axios";
import {Win} from '../Models/Win'
import {NewMove} from '../Models/NewMove'
interface BodyProps {
 
  newMove:NewMove,
  lobbyId:number,
  hostSid:number,

}
const saveNewMove = async (body: BodyProps) => {
  console.log(body, "newMoveBody");
  const { data } = await axios.put("http://127.0.0.1:8000/api/board", 
    body,
  );
  return data;
};
const sendNewMove = (data: any, body:BodyProps) => {
  
  socket.emit("new-move", 
    {data:data, hostSid:body.hostSid},
  );
};
const newMove = async (body: BodyProps) => {
  try {
    const data = await saveNewMove(body);
    sendNewMove(data, body);
    console.log(data, "playerReadyData");
    return await data.lobby;
  } catch (e) {
    console.log(e);
  }
};

export default newMove;
