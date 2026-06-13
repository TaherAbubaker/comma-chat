import { Client } from "../types";
import { CommandFn } from "../types";

export const helpCommand: CommandFn = (client, clients, args) => {
  client.socket.write(
  `
     ┌─────────────────────────────────┐
     │         COMMA — COMMANDS        │
     ├─────────────────────────────────┤
     │  /help     → show this menu     │
     │  /online   → who's connected    │
     │  /nick     → change username    │
     │  /msg      → private message    │
     │  /quit     → disconnect         │
     └─────────────────────────────────┘
  `
);
  //then list the services like opening the camera and opening the airconditioner
};
