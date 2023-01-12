require('dotenv').config()
var express = require('express')
const cors = require('cors')
const app = express();
const Redis = require('ioredis');

app.use(cors())
app.use(express.json());



let publisher;

(async () => {

  publisher = new Redis(process.env.REDIS_URL)

  const subscriber = publisher.duplicate();


  //listen to event
  subscriber.subscribe('verify_kyc', (err) => {
    if (err) {
      console.log(err)
    }
  });
  subscriber.on('message', async (channel, message) => {
    const data = JSON.parse(message);
    console.log(data, '***sub****')
  });

})()




//create user
app.get('/createUser', async (req, res) => {
  const user = {
    userId: 40,
    firstName: "tester",
    lastName: "tester",
    email: "tester@example.com",
    phone: "0909999999"
  }

  await publisher.publish('create_user', JSON.stringify(user))
  res.send("Published event using Redis");
})



//verify KYC
app.get('/verifyKyc', async (req, res) => {
  const kyc = {
    userId: 40,
    verifiedKYC: true
  }

  await publisher.publish('verify_kyc', JSON.stringify(kyc))
  res.send("Published event using Redis");
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)

})


