// *************** SOCKET.IO ****************
import { Server } from 'socket.io';
// *************** SOCKET.IO ****************

// 
import fs from 'fs';
import https from 'https';
import next from 'next';
import path from 'path';

// Configuración de Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE || path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(process.env.SSL_CRT_FILE || path.join(__dirname, 'ssl', 'server.crt')),
};

app.prepare().then(() => {
    const server = https.createServer(httpsOptions, (req: import('http').IncomingMessage, res: import('http').ServerResponse) => {
        return handle(req, res);
    });

    // *************** SOCKET.IO ****************
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hour}:${minutes}`;

    const roomMessages: Record<string, { sender: string; message: string, fullname: string }[]> = {};

    const io = new Server(server);
    io.on("connection", (socket) => {
        console.log(`User connected ${socket.id}`);

        socket.on("join-room", ({ room, fullname, email }) => {
            console.log(`User: ${fullname}`);
            socket.join(room);
            console.log(`User ${fullname} (${email}) se unió: ${room}`);


            // Enviar historial de mensajes al nuevo usuario
            if (roomMessages[room]) {
                socket.emit("message_history", roomMessages[room]);
            }

            socket.to(room).emit("user_joined", { message: `${fullname} (${email}) se unió a las ${time}`, fullname, email });
        });

        socket.on("message", ({ room, message, sender, email, fullname }) => {
            console.log(`Message from ${sender} in room ${room}: ${message}`);

            // Guardar mensaje en el historial
            if (!roomMessages[room]) {
                roomMessages[room] = [];
            }
            roomMessages[room].push({ sender: email, message, fullname });

            // Emitir mensaje con correo como sender principal y fullname incluido
            socket.to(room).emit("message", { sender: email, fullname, message, email });
        });

        socket.on("file", ({ room, sender, email, fileName, fileUrl, fullname }) => {
            // Emitir archivo con correo como sender principal y fullname incluido
            socket.to(room).emit("file", { sender, fullname, email, fileName, fileUrl });
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected ${socket.id}`);
        });
        socket.on("typing", ({ room, fullname, email }) => {
            socket.to(room).emit("user_typing", `${fullname} (${email}) está escribiendo...`);
        });

        socket.on("stop_typing", ({ room }) => {
            socket.to(room).emit("user_stop_typing");
        });
    });
    // *************** SOCKET.IO ****************


    server.listen(443, (err?: Error): void => {
        if (err) throw err;
        console.log('> Ready on https://localhost:443');
    });
});
