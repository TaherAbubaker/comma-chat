import net from "net";
import readline from "readline";

const host = process.argv[2] || "localhost";
const port = parseInt(process.argv[3] || "3000");

const socket = net.createConnection({ host, port });


socket.on("connect", () => {
  console.log("Connected to server!");
});

socket.on("close", () => {
  console.log("Disconnected from server.");
  process.exit(0);
});

let time = new Date().toLocaleTimeString();

socket.on("data", (data) => {
  //console.log("Server:", data.toString());
  console.log(`[${time}] ${data.toString()}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(0);

  socket.write(input);
});