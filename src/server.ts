import net from "net";
import readline from "readline";

const colors = [
  "\x1b[31m", // red
  "\x1b[32m", // green
  "\x1b[33m", // yellow
  "\x1b[34m", // blue
  "\x1b[35m", // magenta
  "\x1b[36m", // cyan
];

const RESET = "\x1b[0m";

type Client = {
  socket: net.Socket;
  name: string;
  gotaname: boolean;
  color: string;
};

const clients: Client[] = [];

const server = net.createServer((socket) => {
  console.log("A client connected!");

  const client: Client = {
    socket,
    name: `User${clients.length + 1}`,
    gotaname : false,
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  clients.push(client);

  socket.write("Welcome to Comma Chat!\n");
  socket.write("Type your name below:\n");
  
  socket.on("data", (data) => {
    const msg = data.toString().trim();
    
    if (client.gotaname === false) {
      client.name = msg;
      client.gotaname = true;
      socket.write(`Welcome, ${client.name}!\n`);
      socket.write("Type your messages below:\n");
  } else {
    for (const c of clients) {
      c.socket.write(`🟩 ${client.name} joined the chat\n`);
      c.socket.write(`${client.color}${client.name}${RESET}: ${msg}\n`);
    }
  }
});

  // handle disconnect
  socket.on("close", () => {
    console.log("A client disconnected");

    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);

    for (const c of clients) {
      c.socket.write(`❌ ${client.name} left the chat\n`);
    }
    
  });
  
  socket.on("end", () => {
    console.log("Client sent FIN (ended connection)");
  });

  socket.on("error", () => {
    console.log("Trying to handle client error");
  });

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});