import { clients } from "./server";

export function broadcast(message: string) {
  for (const c of clients) {
    c.socket.write(message);
  }
}