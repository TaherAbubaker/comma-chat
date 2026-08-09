import net from "net";
import readline from "readline";
import { Client } from "./types";
import { colors, RESET } from "./colors";
import { handleCommand } from "./commands/handler";
import { broadcast } from "./brodcast";
import dotenv from "dotenv";

export const clients: Client[] = [];
dotenv.config();

const server = net.createServer((socket) => {
  console.log("A client connected!");

  const client: Client = {
    socket,
    name: `User${clients.length + 1}`,
    gotaname: false,
    color: colors[Math.floor(Math.random() * colors.length)],
    authenticated: false,
    ATTEMPTS: 0,
  };

  clients.push(client);

  socket.write(`
 ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ 
██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗
██║     ██║   ██║██╔████╔██║██╔████╔██║███████║
██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
        terminal chat — type /help to get help
`);
  socket.write("Enter room password:\n");

  socket.on("data", (data) => {
  const msg = data.toString().trim();

  // step 1 — authentication
  if (!client.authenticated) {
    if (msg === process.env.ROOM_PASSWORD) {
      client.authenticated = true;
      socket.write("✅ Password correct!\n");
      socket.write("Enter your name:\n");
    } else {
      client.ATTEMPTS++;
      if (client.ATTEMPTS === 3) {
        console.log("🚫 Client got kicked out...");
        socket.destroy();
      }
      socket.write("❌ Wrong password. Try again:\n attempts left " + (3 - client.ATTEMPTS) + "\n");
    }
    return;
  }

  // step 2 — name
  if (!client.gotaname) {
    if (msg.startsWith("/")) {
      socket.write("Please enter a name first, not a command.\n");
      return;
    }
    client.name = msg;
    client.gotaname = true;
    socket.write(`Welcome, ${client.color}${client.name}${RESET}!\n`);
    socket.write("Type your messages below:\n");
    broadcast(`🟩 ${client.color}${client.name}${RESET} joined the chat\n`);
    return;
  }

  // step 3 — commands and chat
  if (msg.startsWith("/")) {
    handleCommand(msg, client, clients);
  } else {
    broadcast(`${client.color}${client.name}${RESET}: ${msg}\n`);
  }
});

  socket.on("close", () => {
    console.log("A client disconnected");

    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);
  });

  socket.on("end", () => {
    client.socket.write("Server closed the connection\n");
    console.log(
      "Server closed the connection\n Client sent FIN (ended connection)",
    );
  });

  socket.on("error", () => {
    console.log("Trying to handle client error like a good boy!");
  });
});

server.listen(3000, () => {
  console.log(`
 ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ 
██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗
██║     ██║   ██║██╔████╔██║██╔████╔██║███████║
██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
  `);
  console.log("✅ Server running on port 3000");
  console.log("⏳ Waiting for connections...\n");
});
