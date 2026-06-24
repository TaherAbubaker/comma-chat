import { CommandFn } from "../types";
import { exec } from "child_process";
import path from "path";

export const cameraCommand: CommandFn = (client, clients, args) => {
  client.socket.write("📷 Opening camera...\n");
  
  const scriptPath = path.join(__dirname, "../camera.py");
  
  exec(`python "${scriptPath}"`, (error) => {
    if (error) {
      client.socket.write("❌ Failed to open camera.\n");
    }
  });
};