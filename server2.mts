import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {

    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hour}:${minutes}`;

    const roomMessages: Record<string, { sender: string; message: string }[]> = {};


    const httpServer = createServer(handle);
    const io = new Server(httpServer)
    io.on("connection", (socket) => {
        console.log(`User connected ${socket.id}`);

        socket.on("join-room", ({ room, username }) => {
            socket.join(room);
            console.log(`User ${username} Se unió: ${room}`);

            // Enviar historial de mensajes al nuevo usuario
            if (roomMessages[room]) {
                socket.emit("message_history", roomMessages[room]);
            }

            socket.to(room).emit("user_joined", `${username} se unió a las ${time}`);
        });
        socket.on("message", ({ room, message, sender }) => {
            console.log(`Message from ${sender} in room ${room}: ${message}`);

            // Guardar mensaje en el historial
            if (!roomMessages[room]) {
                roomMessages[room] = [];
            }
            roomMessages[room].push({ sender, message });

            socket.to(room).emit("message", { sender, message });
        });

        socket.on("disconnect", () => {
            console.log(`User disconneted ${socket.id}`);

        });


        socket.on("file", ({ room, sender, fileName, fileUrl }) => {
            socket.to(room).emit("file", { sender, fileName, fileUrl });
        });


        socket.on("typing", ({ room, username }) => {
            socket.to(room).emit("user_typing", `${username} está escribiendo...`);
        });

        socket.on("stop_typing", ({ room }) => {
            socket.to(room).emit("user_stop_typing");
        });


    });
    
    httpServer.listen(port, () => {
        console.log(`Server Runnign  on http://${hostname}:${port}`);
    });
});