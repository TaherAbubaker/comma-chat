// commands/handler.ts
import { Client } from "../types";
import {CommandFn} from "../types";
import { helpCommand } from "./help";
import { quitCommand } from "./quit";
import { nickCommand } from "./nick";
import { onlineCommand } from "./online";

const registry: Record<string, CommandFn> = {
  help: helpCommand,
  quit: quitCommand,
  nick: nickCommand,
  online: onlineCommand,
};

export function handleCommand(msg: string, client: Client, clients: Client[]) {
  const parts = msg.slice(1).split(" ");
  const commandName = parts[0];
  const args = parts.slice(1);

  const command = registry[commandName];

  if (!command) {
    client.socket.write(`Unknown command: /${commandName}\n`);
    return;
  }

  command(client, clients, args);
}