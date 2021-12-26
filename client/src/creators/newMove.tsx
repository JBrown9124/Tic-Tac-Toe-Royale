import {socket} from "../socket";
import axios from "axios";
import {Win} from '../Models/Win'
import {NewMove} from '../Models/NewMove'
import url from "../storage/url"
interface BodyProps {
 
  newMove:NewMove,
  lobbyId:number,
  hostSid:number,

}
const saveNewMove = async (body: BodyProps) => {
 
  const { data } = await axios.put(`${url}/api/board`, 
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

    return await data.gameStatus;
  } catch (e) {
    console.log(e);
  }
};

export default newMove;
