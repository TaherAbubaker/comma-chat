import net from "net";

type Client = {
  socket: net.Socket;
  name: string;
};

const clients: Client[] = [];

const server = net.createServer((socket) => {
  console.log("A client connected!");

  const client: Client = {
    socket,
    name: `User${clients.length + 1}`,
  };

  clients.push(client);

  socket.write("Welcome to Comma Chat!\n");
  socket.write("Type your messages below:\n");

  socket.on("data", (data) => {
    const msg = data.toString().trim();

    for (const c of clients) {
        if (c.socket !== socket) {
            c.socket.write(`[${client.name}]: ${msg}\n`);
        }
    }
  });

  // handle disconnect
  socket.on("close", () => {
    console.log("A client disconnected");

    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);
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