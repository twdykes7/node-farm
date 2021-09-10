const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if(pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');
  } else if(pathName ==='/product') {
    res.end('This is the PRODUCT');
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    });
    res.end('<hi>Page not found!</h1>');
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening to requests on port 3000');
})