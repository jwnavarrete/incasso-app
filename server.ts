const fs = require('fs');
const https = require('https');
const next = require('next');
const path = require('path');

// Configuración de Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE || path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(process.env.SSL_CRT_FILE || path.join(__dirname, 'ssl', 'server.crt')),
};

app.prepare().then(() => {
    const server = https.createServer(httpsOptions, (req: import('http').IncomingMessage, res: import('http').ServerResponse) => {
        return handle(req, res);
    });

    server.listen(443, (err?: Error): void => {
        if (err) throw err;
        console.log('> Ready on https://localhost:443');
    });
});
