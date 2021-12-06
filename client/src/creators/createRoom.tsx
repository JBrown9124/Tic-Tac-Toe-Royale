import socket from "../socket";
import axios from "axios";
const saveRoom = async () => {
  const { data } = await axios.post("http://127.0.0.1:8000/api/lobby");
  return data;
};
const sendRoom = (data: any) => {
  socket.emit("new-lobby", {
    lobby_id: data.lobby_id,
  });
};
const createRoom = async () => {
  const data = await saveRoom();
  sendRoom(data);
};

export default createRoom;
