// commands/handler.ts
import { Client } from "../types";
import {CommandFn} from "../types";
import { helpCommand } from "./help";
import { quitCommand } from "./quit";
import { nickCommand } from "./nick";
import { onlineCommand } from "./online";
import { directMsgCommand } from "./directmsg";
import { asciiCommand } from "./ascii"; 
import { asciiArt } from "../asciiArt";
import { RESET } from "../colors";


const registry: Record<string, CommandFn> = {
  help: helpCommand,
  quit: quitCommand,
  nick: nickCommand,
  msg: directMsgCommand,
  online: onlineCommand,
  ascii: asciiCommand,
};

export function handleCommand(msg: string, client: Client, clients: Client[]) {
  const parts = msg.slice(1).split(" ");
  const commandName = parts[0];
  const args = parts.slice(1);

  const command = registry[commandName];

  if (command) {
    command(client, clients, args);
    return;
  }

  const art = asciiArt[commandName];

  if (art) {
    client.socket.write(`${client.color}${client.name}${RESET} sent:\n ${art}\n`);
    return;
  }

  client.socket.write(`Unknown command: /${commandName}\n`);
}