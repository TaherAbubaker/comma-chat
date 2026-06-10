// commands/handler.ts
import { Client } from "../types";

type CommandFn = (client: Client, clients: Client[], args: string[]) => void;

const registry: Record<string, CommandFn> = {
  // commands go here later
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