import { CommandFn } from "../types";
import { Client } from "../types";
import { colors, RESET } from "../colors";
//${client.color}${client.name}${RESET}

export const directMsgCommand: CommandFn = (client, clients, args) => {
  if (args.length < 2) {
    client.socket.write(`Give me a username and a message\nUsage: /msg <user> <message>\n`,);
    return;
  }

    const targetName = args[0];
    const message = args.slice(1).join(" ");
    const target = clients.find((c) => c.name === targetName);
    if (!target) {
      client.socket.write(`User "${targetName}" not found.\n`);
      return;
    }

    target.socket.write(`[DM from ${client.color}${client.name}${RESET}]: ${message}\n`);
    client.socket.write(`[DM to ${target.color}${target.name}${RESET}]: ${message}\n`);
  
};
