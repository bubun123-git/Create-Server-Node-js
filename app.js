const http = require('http');

const server = http.createServer((req, res) => {
  console.log('tested ok');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bubun');
});

server.listen(4000);