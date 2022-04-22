import io from "socket.io-client";

const ENDPOINT = "http://192.168.254.32:8080";
const socket = io(ENDPOINT);

export default socket;
