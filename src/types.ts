// types.ts
import net from "net";

export type Client = {
  socket: net.Socket;
  name: string;
  gotaname: boolean;
  color: string;
};

export type CommandFn = 
(
    client: Client, 
    clients: Client[], 
    args: string[]
) => void;
