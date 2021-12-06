import io from "socket.io-client";
import Store from "./store"
const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");
  socket.on("player-join-lobby", (lobby) => {
    Store(null, lobby)
    console.log(lobby, "SOCKETLOBBY")
        
  });
  socket.on("add-user-lobby", (id) => {});
  socket.on("game-status", (data) => {});
  socket.on("new-move", (data) => {});
});

export default socket;
