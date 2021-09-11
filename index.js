const fs = require('fs');
const http = require('http');
const url = require('url');

///// Server
const tempOverview = fs.readFileSync(`${__dirname}/template/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if(pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');

  // Product page
  } else if(pathName === '/product') {
    res.end('This is the PRODUCT');

  // API
  } else if( pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

  // Not Found
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