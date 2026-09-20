import net from "net";

export type AiMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type Client = {
  socket: net.Socket;
  name: string;
  gotaname: boolean;
  color: string;
  authenticated: boolean;
  attempts: number;
  inAiMode: boolean;
  aiHistory: AiMessage[];
};

export type CommandFn = (
  client: Client,
  clients: Client[],
  args: string[]
) => void;