import { Client } from "../types";
import { CommandFn } from "../types";

export const helpCommand: CommandFn = (client, clients, args) => {
  client.socket.write(
  `📖 Available commands:\n` +
  `  /help               → show this message\n` +
  `  /online             → list connected users\n` +
  `  /nick <name>        → change your username\n` +
  `  /msg <user> <msg>   → private message\n` +
  `  /quit               → disconnect\n`
);
  //then list the services like opening the camera and opening the airconditioner
};
