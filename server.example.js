
// так нужно подключать сервер без express

const http = require('http');
const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');
const {addNote} = require('./notes.controller');

const port = 3000;

const basePath = path.join(__dirname, 'pages');

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        const content = await fs.readFile(path.join(basePath, 'index.html'), {encoding: 'utf-8'}); // читаем файл
        // res.setHeader('Content-Type', 'text/html');
        res.writeHead(200, {
            'Content-Type': 'text/html' // можно использовать вместо setHeader
        });
        res.end(content);
    } else if (req.method === 'POST') {
        const body = [];
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8' // делается для того, чтобы браузерам было понятно, что это текст
        });
        req.on('data', (data) => {
            body.push(Buffer.from(data));
        })

        req.on('end', async () => {
            const title = body.toString().split('=')[1];
            addNote(title);
            res.end(`Title = ${title}`)
        })

        
    }
})    

server.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})