var express = require('express')
const cors = require('cors')
const app = express();


app.use(cors())
app.use(express.json());


app.get('/', function (req, res) {
  console.log()
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  const { events } = req.body;
  for (let e of events) {
    console.log(e.data, '________ data ________')
  }
  console.log(req.body, '******************** req body *******')

  res.send('Hello World Post!')
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
})
