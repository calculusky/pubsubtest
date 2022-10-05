var express = require('express')
var app = express();

app.use(express.json());

app.get('/', function (req, res) {
  console.log()
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  console.log(req.body, '******************** res body *******')
  res.send('Hello World Post!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000...')
})
