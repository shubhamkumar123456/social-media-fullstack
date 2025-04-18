import { io } from "socket.io-client";
let url = "http://localhost:8080";
const socket = io(url, {
    transports: ["websocket"],
    reconnection:true,
    reconnectionAttempts:5,
    autoConnect:false
 });
 export default socket;




