import { CommandFn } from "../types";
import { Client } from "../types";

export const nickCommand: CommandFn = (client, clients, args) => {
    if (args.length === 0) {
        client.socket.write(`Give me a username\n`);
        return;
    }

    client.name = args[0];
    client.socket.write(`Your username has been changed to: ${client.name}\n`);
};