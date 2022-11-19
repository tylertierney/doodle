import io from "socket.io-client";

const ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "https://kadoodle-backend.onrender.com";

const socket = io(ENDPOINT);

export default socket;
