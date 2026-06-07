import net from "net";
import readline from "readline";

const socket = net.createConnection({
  port: 3000,
});

socket.on("connect", () => {
  console.log("Connected to server!");
});

socket.on("data", (data) => {
  console.log("Server:", data.toString());
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  socket.write(input);
});