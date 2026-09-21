# COMMA 💬
> A walkie-talkie for your terminal — chat, AI, and device commands, all over raw TCP.

Comma is a terminal-based real-time communication system built from scratch in Node.js and TypeScript. No chat libraries, no frameworks — just raw TCP sockets doing what Discord, Slack, and WhatsApp do under the hood, stripped down and made visible.

Anyone on the same WiFi network can open a terminal, connect, and talk in real time. No app installs, no accounts, no cloud server in between.

---

## ✨ Features

- 🔐 Password-authenticated rooms
- 🎨 Colored usernames, unique per user
- ⏱️ Timestamps on every message
- 🖼️ ASCII art banner on connect
- 📟 Full command system with a registry-based handler
- 🤖 Built-in AI assistant (Groq-powered, streams responses live, remembers context)
- 📷 Live camera feed with face detection
- 🔥 Sendable ASCII art library
- 🌐 Connect from any device on the same network, phone included

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Node.js | Runtime |
| TypeScript | Type safety |
| `net` (built-in) | Raw TCP sockets |
| `readline` (built-in) | Terminal input |
| Groq SDK | AI chatbot |
| OpenCV (Python) | Camera + face detection |

---

## 📁 Project Structure

src/
├── server.ts — TCP server, auth, connection handling
├── client.ts — Terminal client
├── types.ts — Shared types (Client, CommandFn, AiMessage)
├── colors.ts — ANSI color constants
├── broadcast.ts — Broadcast helper
├── banner.ts — ASCII banner (single source)
├── asciiArt.ts — ASCII art library
├── camera.py — Camera + face detection script
└── commands/
├── handler.ts — Command router + ASCII fallback
├── help.ts — /help
├── online.ts — /online
├── nick.ts — /nick
├── directmsg.ts — /msg
├── ascii.ts — /ascii
├── camera.ts — /camera
├── ai.ts — /ai
└── quit.ts — /quit


---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
pip install opencv-python
```

### 2. Set up your `.env`
Create a `.env` file in the project root:

ROOM_PASSWORD=yourpassword
GROQ_API_KEY=your_groq_api_key
PORT=3000


Get a free Groq API key at **console.groq.com**.

### 3. Start the server
```bash
npm run dev:server
```

### 4. Connect as a client
```bash
npm run dev:client
```

You'll be asked for the room password, then your name, then you're in.

---

## 💬 Chat Commands

| Command | Description |
|---|---|
| `/help` | Show the command menu |
| `/online` | List connected users with count |
| `/nick <name>` | Change your username |
| `/msg <user> <message>` | Send a private message |
| `/ascii` | List available ASCII art |
| `/<art-name>` | Send that ASCII art to everyone |
| `/camera` | Open a live camera feed with face detection |
| `/ai` | Enter AI assistant mode |
| `/quit` | Disconnect gracefully |

---

## 🤖 Using the AI Assistant

Type `/ai` to enter AI mode. From there you're talking directly to Comma AI, no need to prefix every message.

/ai
🤖 Comma AI — type /exit to return to chat
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You: explain TCP in simple terms
🤖 Comma AI: TCP is like a phone call, both sides confirm they're
listening before any data is sent...

You: /exit
👋 Back to chat.


The AI remembers context within a session (last 10 exchanges), then resets each time you re-enter `/ai`.

---

## 📷 Using the Camera

Type `/camera` to open a live webcam window on the host machine. It detects faces and labels the box with your Comma username.

/camera
📷 Opening camera on host machine (press Q in the window to close)...


Press **Q** or close the window to exit.

---

## 🎨 ASCII Art

Run `/ascii` to see what's available:

/ascii
Available ASCII arts: cat1, cat2, spider1, spider2
Type /<name> to send one!


Then just:

/cat1

And it broadcasts to everyone in the chat.

---

## 🔌 Connecting Friends on the Same Network

**Step 1 — Host finds their local IP**
```bash
ipconfig
# look for IPv4 under your Wi-Fi adapter
# example: 192.168.0.103
```

**Step 2 — Host opens Windows Firewall for the port (one-time, run as admin)**
```powershell
New-NetFirewallRule -DisplayName "Comma Chat" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

**Step 3 — Friends connect using the host's IP**
```bash
ts-node src/client.ts 192.168.0.103
```

> 📱 **Connecting from a phone?** Install Termux, run `pkg install nodejs`, then create `client.js` with `nano client.js` and paste the plain JS client (see `/docs` or ask in the repo), then run `node client.js <host-ip>`.

> ⚠️ University or corporate WiFi often blocks device-to-device traffic (client isolation). This setup works reliably on home networks.

---

## 📌 Roadmap

### Next Up
- [ ] Chat rooms (`/join <room>`)
- [ ] TLS encryption

### Planned
- [ ] Smart home service commands (AC, lights)
- [ ] ngrok / Cloudflare Tunnel support for cross-network connections
- [ ] Persistent chat history
- [ ] File sharing

---

## 🎯 Why I Built This

Comma started as a way to learn how real communication systems work, TCP sockets, client-server architecture, and command routing, without hiding behind a library. It grew into something I actually use with friends.

The chat is the first layer. The command system is the real product.

---

## 👨‍💻 Author

**Taher Abubaker**
Computer Systems Engineering student, Arab American University (AAUP)
[GitHub](https://github.com/TaherAbubaker) · [LinkedIn](https://linkedin.com/in/taabubaker)
