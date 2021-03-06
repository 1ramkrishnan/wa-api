var cluster = require('cluster');
if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {
  // put your code here
  
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { stringify } = require('querystring');

const app = express()
const port = process.env.PORT || 3000;
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
        res.send('{"replies":[  {  "message":"🤖: '+JSON.parse(data).content+'- '+JSON.parse(data).author+'"     }  ]}');

      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
});

app.get('/quotes', (req, res) => {
    res.json(quotes);

});
app.get('/', (req, res) => {
  res.send("wa-api for Whatsapp Chatbot experimental project by rk thevar.");

});

app.post('/hi', (req, res) => {
  console.log(req.body.query.sender);
  res.send('{"replies":[  {  "message":"🤖: hi '+req.body.query.sender+'"     }  ]}');
}).on("error", (err) => {
  console.log("Error: " + err.message);

});
app.post('/advice', (req, res) => {
 

  const https = require('https');

  https.get('https://api.adviceslip.com/advice', (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).slip);
      res.send('{"replies":[  {  "message":"🤖: '+JSON.parse(data).slip.advice+'"     }  ]}');

    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});


app.post('/insult', (req, res) => {
 

  const https = require('https');

  https.get('https://evilinsult.com/generate_insult.php?lang=en&type=json', (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).insult);
      res.send('{"replies":[  {  "message":"🤖: '+JSON.parse(data).insult+'"     }  ]}');

    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});




app.post('/ping', (req, res) => {
try{
  console.log(req.body.query.message);  
  if(req.body.query.message.length<8)
  return res.send('{"replies":[  {  "message":"🤖: Not valid url i guess."     }  ]}');
  const urls=req.body.query.message;
  console.log(urls);
 
  const https = require('https');
  https.get('https://steakovercooked.com/api/ping/?host='+urls.replace("@ping ",""), (resp) => {
    let data = '';
  
    // A chunk of data has been received.  req.body.query.sender
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    
    resp.on('end', () => {
      if(data.length>0)
    {
      console.log(JSON.parse(data).slip);
      res.send('{"replies":[  {  "message":"🤖: '+JSON.parse(data)+'"     }  ]}');
    }
    
    else
    {
      res.send('{"replies":[  {  "message":"🤖: Hmmm! No response i guess"     }  ]}');
    }
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
catch (e) {
  res.send('{"replies":[  {  "message":"🤖: Hmmm! something wrong"     }  ]}');
  console.log(e);
 
}
});

try
{
app.listen(port, () => console.log(`responding on port ${port}!`));
}
catch (e) {
  res.send('{"replies":[  {  "message":"🤖: Hmmm! something wrong"     }  ]}');
  console.log(e);
 
}
}

