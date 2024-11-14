import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000"); 


export const emitButtonClicked = (buttonName: string) => {
  socket.emit("buttonClicked", { name: buttonName });
  console.log(`Button ${buttonName} clicked`);
};

export default socket;
