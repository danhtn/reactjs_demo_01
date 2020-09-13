const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

var fs = require("fs");

function readJsonFileSync(filepath, encoding) {

  if (typeof (encoding) == 'undefined') {
    encoding = 'utf8';
  }
  var file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getConfig(file) {

  var filepath = __dirname + '/' + file;
  return readJsonFileSync(filepath);
}

app.use('/api', function (req, res, next) {
  next();
});

var masterData = getConfig('./data/master-data.json');
app.get('/api/master-data', function (req, res, next) {
  res.send(masterData);
});

var customers = getConfig('./data/customer.json');
app.get('/api/customers', function (req, res, next) {
  res.send(customers);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})