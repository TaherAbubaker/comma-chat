import { CommandFn } from "../types";
import { Client } from "../types";
import { colors, RESET } from "../colors";


export const onlineCommand: CommandFn = (client, clients, args) => {
    client.socket.write('online users:\n');
    for (const c of clients) {
        client.socket.write(`${c.color}${c.name}${RESET}\n`);
    }
};