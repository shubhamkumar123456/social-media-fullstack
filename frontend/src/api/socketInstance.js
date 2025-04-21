import { io } from "socket.io-client";
import URL from "../../url";
let url = URL;
const socket = io(url, {
    transports: ["websocket"],
    reconnection:true,
    reconnectionAttempts:5,
    autoConnect:false
 });
 export default socket;




