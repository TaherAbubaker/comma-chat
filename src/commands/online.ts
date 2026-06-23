import { CommandFn } from "../types";
import { Client } from "../types";
import { colors, RESET } from "../colors";


export const onlineCommand: CommandFn = (client, clients, args) => {
  client.socket.write(`👥 ${clients.length} user${clients.length === 1 ? "" : "s"} online:\n`);
  for (const c of clients) {
    const isYou = c.socket === client.socket ? " (you)" : "";
    client.socket.write(`  ${c.color}${c.name}${RESET}${isYou}\n`);
  }
};