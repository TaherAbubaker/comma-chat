import { asciiArt } from "../asciiArt";
import { CommandFn } from "../types";
import {broadcast} from "../brodcast";

export const asciiCommand: CommandFn = (client, clients, args) => {
  const names = Object.keys(asciiArt).join(", ");
  client.socket.write(`Available ASCII arts: ${names}\nType /<name> to send one!\n`);
};