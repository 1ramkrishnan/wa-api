const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = process.env.PORT;
let quotes=[{"_id":"wIfNy-oDtr","tags":["friendship"],"content":"Friendship needs no words - it is solitude delivered from the anguish of loneliness.","author":"Dag Hammarskjöld","length":84}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/quotes', (req, res) => {
 
    // start

    const https = require('https');

    https.get('https://api.quotable.io/random', (resp) => {
      let data = '';
    
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log(JSON.parse(data).content+JSON.parse(data).author);
        res.send('{"replies":[  {  "message":"🤖:'+JSON.parse(data).content+'- '+JSON.parse(data).author+'"     }  ]}');

      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });




    //end


});

app.get('/quotes', (req, res) => {
    res.json(quotes);

});
app.get('/', (req, res) => {
  res.send("wa-api for Whatsapp Chatbot experimental project by rk thevar.");

});

app.listen(port, () => console.log(`responding on port ${port}!`));
