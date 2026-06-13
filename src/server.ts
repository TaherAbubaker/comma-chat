import net from "net";
import readline from "readline";
import { Client } from "./types";
import { colors, RESET } from "./colors";
import { handleCommand } from "./commands/handler";
import { broadcast } from "./brodcast";


export const clients: Client[] = [];



const server = net.createServer((socket) => {
  console.log("A client connected!");

  const client: Client = {
    socket,
    name: `User${clients.length + 1}`,
    gotaname: false,
    color: colors[Math.floor(Math.random() * colors.length)],
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
  socket.write("\nType your name below:\n");

  socket.on("data", (data) => {
    const msg = data.toString().trim();

    if (client.gotaname === false) {
      client.name = msg;
      client.gotaname = true;

      socket.write(`Welcome, ${client.color}${client.name}${RESET}!\n`);
      socket.write("Type your messages below:\n");

      broadcast(`🟩 ${client.color}${client.name}${RESET} joined the chat\n`);

    } else if (msg.startsWith("/")) {
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
    console.log("Server closed the connection\n Client sent FIN (ended connection)");
  });

  socket.on("error", () => {
    console.log("Trying to handle client error");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});