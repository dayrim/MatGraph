'use strict';


const express = require('express');
const api = express();
const request = require('request');
const functions = require('firebase-functions');

api.use(express.static(__dirname + '/dist/'));




const PORT = process.env.PORT || 9090;
  
// api.route("/api/locations/*").get((req, res) => {

// });
api.get('/', (req, res) => {
    console.log("get me ?")
  res.send(process.env.NODE_ENV);
});
api.get('/api', (req, res) => {
    console.log("get me ?")
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