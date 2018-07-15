const path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const base_url = process.env.BASE_URL || `http://localhost:${port}`;
const redis = require('redis');


app.use(cors());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//create Redis client
let client = redis.createClient();

client.on('connect', function () {
    console.log('Now Connected to Redis');
});

//cutify URL
app.post('/cut.ly', function (req, res) {
    let key, cutifiedURL;
    let urltoCutify = req.body.urltoCutify;

    // Create a hashed short version
    key = generateKey();
    
    cutifiedURL = `${base_url}/cut.ly/${key}`;

    // Store them in Redis
    client.set(key, urltoCutify, function () {
        res.send(JSON.stringify({ cutifiedURL: cutifiedURL }));
    });
});

//return original URL
app.get('/cut.ly/:key', function (req, res) {
    // Declare variables
    
    let key = req.params.key;

    client.get(key, function (error, originalURL) {
        
        if (error) {
            console.log(error);
            throw error;
        }
        // redirect to original URL
        console.log('GET originalURL ->' + originalURL);
        res.redirect(originalURL);
    });
});

// Serve any static files
app.use(express.static(path.join(__dirname, 'client-cuteurl/dist')));
// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client-cuteurl/dist', 'index.html'));
});



app.listen(port, () => {
    console.log(`Server started on port`, port);
});



var generateKey = function() {
 const ALPHANUMERIC= '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
 const KEY_LENGTH = 10;
 let returnKey = '';
 let alphaCharArray = ALPHANUMERIC.split('');  
 
 do {
    [...Array(KEY_LENGTH)].map(input =>{
        returnKey += ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length));
     })
     client.get(returnKey, function (error, keyValue) {
        
        if (error) {
            console.log(error);
            throw error;
        }
        if(!!keyValue) {
            returnKey = '';
        } 
    });
 } while(!returnKey) 
 
  return returnKey;
}