const http = require('http');


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log(req.headers);
    res.end('ok');
});

server.listen(1337, '127.0.0.1', () => {
    console.log('1337 listen');
});


