import dotenv from "dotenv";
dotenv.config();
import { CommandFn } from "../types";
import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is not set — /ai will not work.");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are Comma AI, a terminal-based assistant built into a chat app called Comma.
Keep answers concise and readable in a plain terminal — no markdown headers, no bold syntax, short paragraphs.
Be direct and helpful.`;

const MAX_HISTORY = 10; // keep last 10 exchanges to control token usage

export const aiCommand: CommandFn = async (client, clients, args) => {
  client.inAiMode = true;
  client.aiHistory = []; // fresh session each time /ai is entered
  client.socket.write("__AI__\n🤖 Comma AI — type /exit to return to chat\n");
  client.socket.write("__AI__━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n");
};

export async function handleAiMessage(client: any, msg: string) {
  if (msg === "/exit") {
    client.inAiMode = false;
    client.aiHistory = [];
    client.socket.write("__AI__\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    client.socket.write("__AI__👋 Back to chat.\n\n");
    return;
  }

  client.socket.write(`__AI__\nYou: ${msg}\n`);
  client.socket.write("__AI__🤖 Comma AI: ");

  client.aiHistory.push({ role: "user", content: msg });
  if (client.aiHistory.length > MAX_HISTORY * 2) {
    client.aiHistory = client.aiHistory.slice(-MAX_HISTORY * 2);
  }

  try {
    const stream = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...client.aiHistory,
      ],
      stream: true,
    });

    let fullReply = "";

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        client.socket.write(`__AI__${text}`);
        fullReply += text;
      }
    }

    client.aiHistory.push({ role: "assistant", content: fullReply });
    client.socket.write("__AI__\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } catch (err) {
    client.socket.write(`__AI__❌ AI error: ${(err as Error).message}\n`);
  }
}