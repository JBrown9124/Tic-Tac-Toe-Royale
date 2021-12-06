import io from "socket.io-client";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");
  socket.on("new-lobby", (id) => {
        
  });
  socket.on("add-user-lobby", (id) => {});
  socket.on("game-status", (data) => {});
  socket.on("new-move", (data) => {});
});

export default socket;
