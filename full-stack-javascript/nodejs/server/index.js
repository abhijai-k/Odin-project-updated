const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = './';
  switch (req.url) {
    case '/':
      filePath += 'index.html';
      break;
    case '/about':
      filePath += 'about.html';
      break;
    case '/contact-me':
      filePath += 'contact-me.html';
      break;
    default:
      filePath += '404.html';
      break;
  }

  fs.readFile(path.resolve(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }

    res.writeHead(filePath.includes('404') ? 404 : 200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
