'use strict';


const express = require('express');
const app = express();
const request = require('request');

app.use(express.static(__dirname + '/dist/'));




const PORT = process.env.PORT || 9090;
  
// app.route("/api/locations/*").get((req, res) => {

// });
request('http://andmebaas.stat.ee/sdmx-json/data/KK91', function (error, response, body) {
  console.log('body:', body); 
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

