const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const express = require('express');
const api = express();
const request = require('request');

api.use(express.static(__dirname + '/dist/'));




const PORT = process.env.PORT || 9090;
  
// api.route("/api/locations/*").get((req, res) => {

// });
api.get('/', (req, res) => {
  res.send(process.env.NODE_ENV);
});

api.get('/api', (req, res) => {
    res.send(process.env.NODE_ENV);
  });
  

request('http://andmebaas.stat.ee/sdmx-json/data/KK91', function (error, response, body) {
  console.log('body:', body); 
});

api.listen(PORT, () => {
  console.log(`api listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

exports.api = functions.https.onRequest(api);