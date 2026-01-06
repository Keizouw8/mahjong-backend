import { createServer } from "http";
import { Server } from "socket.io";

import { app } from "./app/app";
import { run } from "./database/database";
import { socketHandler } from "./sockets/socketHandler";

const PORT = 8080;

await run();

const server = createServer(app);
const io = new Server(server);
io.on("connection", socketHandler);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
