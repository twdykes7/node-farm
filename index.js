//core modules
const fs = require('fs');
const http = require('http');
const url = require('url');

//own modules
const replaceTemplate = require('./modules/replaceTemplate');

///// Server
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if(!product.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//   }
//   return output;

// }

const tempOverview = fs.readFileSync(`${__dirname}/template/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/template/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

  // console.log(req.url);
  const { query, pathname } = (url.parse(req.url, true));
  // const pathname = req.url;

  // Overview page
  if(pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    //console.log(cardsHtml);

    res.end(output);

  // Product page
  } else if(pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

  // API
  } else if( pathname === '/api') {
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