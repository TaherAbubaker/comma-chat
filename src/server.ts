import net from "net";
import { Client } from "./types";
import { colors, RESET } from "./colors";
import { handleCommand } from "./commands/handler";
import { broadcast } from "./brodcast";
import { handleAiMessage } from "./commands/ai";
import { WELCOME_BANNER, BANNER } from "./banner";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const MAX_LOGIN_ATTEMPTS = 3;

if (!process.env.ROOM_PASSWORD) {
  console.error("❌ ROOM_PASSWORD is not set in .env — refusing to start.");
  process.exit(1);
}

export const clients: Client[] = [];

const server = net.createServer((socket) => {
  const client: Client = {
    socket,
    name: `User${clients.length + 1}`,
    gotaname: false,
    color: colors[Math.floor(Math.random() * colors.length)],
    authenticated: false,
    attempts: 0,
    inAiMode: false,
    aiHistory: [],
  };

  clients.push(client);
  console.log(`🔌 Connection opened (${clients.length} total)`);

  socket.write(WELCOME_BANNER);
  socket.write("🔒 Enter room password:\n");

  socket.on("data", (data) => {
    const msg = data.toString().trim();
    if (!msg) return; // ignore empty lines / keepalive noise

    // Step 1 — authentication
    if (!client.authenticated) {
      if (msg === process.env.ROOM_PASSWORD) {
        client.authenticated = true;
        socket.write("✅ Password correct!\n");
        socket.write("Enter your name:\n");
      } else {
        client.attempts++;
        const remaining = MAX_LOGIN_ATTEMPTS - client.attempts;

        if (remaining <= 0) {
          socket.write("🚫 Too many failed attempts. Disconnecting...\n");
          socket.destroy();
          return;
        }

        socket.write(`❌ Wrong password. Attempts left: ${remaining}\n`);
      }
      return;
    }

    // Step 2 — username
    if (!client.gotaname) {
      if (msg.startsWith("/")) {
        socket.write("Please enter a name first, not a command.\n");
        return;
      }
      if (msg.length > 20) {
        socket.write("Name too long (max 20 characters).\n");
        return;
      }
      if (clients.some((c) => c !== client && c.name === msg)) {
        socket.write("That name is already taken.\n");
        return;
      }

      client.name = msg;
      client.gotaname = true;
      socket.write(`Welcome, ${client.color}${client.name}${RESET}!\n`);
      socket.write("Type your messages below:\n");
      broadcast(`🟩 ${client.color}${client.name}${RESET} joined the chat\n`);
      return;
    }

    // Step 3 — AI mode
    if (client.inAiMode) {
      handleAiMessage(client, msg);
      return;
    }

    // Step 4 — commands and chat
    if (msg.startsWith("/")) {
      handleCommand(msg, client, clients);
    } else {
      broadcast(`${client.color}${client.name}${RESET}: ${msg}\n`);
    }
  });

  socket.on("close", () => {
    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);

    if (client.gotaname) {
      broadcast(`🟥 ${client.color}${client.name}${RESET} left the chat\n`);
    }
    console.log(`🔌 Connection closed (${clients.length} total)`);
  });

  socket.on("error", (err) => {
    console.log(`⚠️  Socket error from ${client.name}:`, err.message);
  });
});

server.on("error", (err) => {
  console.error("💥 Server error:", err.message);
});

server.listen(PORT, () => {
  console.log(BANNER);
  console.log(`✅ Comma server running on port ${PORT}`);
  console.log("⏳ Waiting for connections...\n");
});