import {socket} from "../../socket";
import axios from "axios";
import {Win} from '../../Models/Win'
import {NewMove} from '../../Models/NewMove'
import url from "../../storage/url"
interface BodyProps {
 
  playerId:string,
  lobbyId:number,
  turnNumber:number,

}
const saveBotNewMove = async (body: BodyProps) => {
 
  const { data } = await axios.post(`${url}/api/bot`, 
    body,
  );
  return data;
};

const botNewMove = async (body: BodyProps) => {
  try {
    const data = await saveBotNewMove(body);
   

    return await data;
  } catch (e) {
    console.log(e);
  }
};

export default botNewMove;
