import { Client } from "../types";
import { CommandFn } from "../types";
import { broadcast } from "../brodcast";

export const quitCommand: CommandFn = (client, clients, args) => {
    client.socket.write("Goodbye!\n");

    setTimeout(()=>{
        client.socket.destroy();
    } , 2000);

    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);

    broadcast(`🟥 ${client.name} left the chat\n`);
};