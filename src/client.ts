import net from "net";
import readline from "readline";

const host = process.argv[2] || "localhost";
const port = parseInt(process.argv[3] || "3000");

const socket = net.createConnection({ host, port });

socket.on("connect", () => {
  console.log(`Connected to ${host}:${port}`);
});

socket.on("close", () => {
  console.log("Disconnected from server.");
  process.exit(0);
});

socket.on("error", (err) => {
  console.error("Connection error:", err.message);
  process.exit(1);
});

socket.on("data", (data) => {
  const text = data.toString();

  if (text.includes("__AI__")) {
    process.stdout.write(text.split("__AI__").join(""));
  } else {
    process.stdout.write(`[${new Date().toLocaleTimeString()}] ${text}`);
  }
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