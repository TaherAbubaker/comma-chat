import { Client } from "../types";
import { CommandFn } from "../types";

export const quitCommand: CommandFn = (client, clients, args) => {
  client.socket.write(`
 ██████╗  ██████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███████╗
██╔════╝ ██╔═══██╗██╔═══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██╔════╝
██║  ███╗██║   ██║██║   ██║██║  ██║██████╔╝ ╚████╔╝ █████╗  
██║   ██║██║   ██║██║   ██║██║  ██║██╔══██╗  ╚██╔╝  ██╔══╝  
╚██████╔╝╚██████╔╝╚██████╔╝██████╔╝██████╔╝   ██║   ███████╗
 ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝
       — connection closed cleanly — see you next time —
`);

  setTimeout(() => {
    client.socket.destroy(); // triggers the 'close' handler in server.ts
    // which now handles removal + broadcast — no duplication here
  }, 1500);
};