import { CommandFn } from "../types";

export const helpCommand: CommandFn = (client, clients, args) => {
  client.socket.write(`
     ┌─────────────────────────────────┐
     │         COMMA — COMMANDS        │
     ├─────────────────────────────────┤
     │  /help     → show this menu     │
     │  /online   → who's connected    │
     │  /nick     → change username    │
     │  /msg      → private message    │
     │  /ascii    → show ascii art     │
     │  /camera   → open camera feed   │
     │  /ai       → talk to Comma AI   │
     │  /quit     → disconnect         │
     └─────────────────────────────────┘
`);
};