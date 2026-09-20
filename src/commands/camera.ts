import { CommandFn } from "../types";
import { spawn } from "child_process";
import path from "path";

let cameraRunning = false;

export const cameraCommand: CommandFn = (client, clients, args) => {
  if (cameraRunning) {
    client.socket.write("📷 Camera is already open on the host machine.\n");
    return;
  }

  client.socket.write("📷 Opening camera on host machine (press Q in the window to close)...\n");

  const scriptPath = path.join(__dirname, "../camera.py");
  const proc = spawn("python", [scriptPath]);

  cameraRunning = true;

  proc.on("error", (err) => {
    client.socket.write(`❌ Failed to open camera: ${err.message}\n`);
    cameraRunning = false;
  });

  proc.on("close", (code) => {
    cameraRunning = false;
    client.socket.write("📷 Camera closed.\n");
  });
};