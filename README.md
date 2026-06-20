# Comma 💬

A terminal-based real-time communication system built with **Node.js** and **TypeScript**.

Built from scratch as a learning journey through real networking — TCP sockets, client-server architecture, command systems, and real-time communication. Comma is actively used and tested between friends on the same network.

---

## 🚀 Current Features

- TCP server using Node.js `net` module
- Terminal-based client
- Multiple clients can connect simultaneously
- Real-time message broadcasting with **colored usernames**
- **Timestamps** on all messages
- **ASCII art banner** on connect
- **Command system** with a registry-based handler
  - `/help` — bordered command menu
  - `/online` — list connected users
  - `/nick <name>` — change your username
  - `/msg <user> <message>` — private messaging
  - `/quit` — graceful disconnect with 2s delay
- Join/leave notifications
- Graceful error and disconnect handling

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- TCP Sockets (`net`)
- Readline

---

## 📁 Project Structure
src/

├── server.ts

├── client.ts

├── types.ts

├── colors.ts

├── broadcast.ts

└── commands/

├── handler.ts

├── help.ts

├── online.ts

├── nick.ts

├── msg.ts

└── quit.ts

---

## 🔌 How to Run

**Start the server:**
```bash
npm run dev:server
```

**Connect as a client:**
```bash
npm run dev:client
```

---

## 📌 Planned Features

- [ ] Easy join for friends on the same network (dynamic IP/port via CLI args)
- [ ] `/ascii` command for sending ASCII art in chat
- [ ] Chat rooms (`/join <room>`)
- [ ] TLS encryption (ISP can't read messages)
- [ ] Local AI chatbot via Ollama (`/ai <prompt>`)
- [ ] Authentication (`/login`, `/register`)
- [ ] Persistent message history
- [ ] File sharing

---

## 🎯 Purpose

The main goal of this project is educational: to build a real-world networking application from scratch while learning how TCP, sockets, and communication protocols actually work under the hood. Comma is growing into a lightweight command platform — chat is just the first layer.