const functions = require('firebase-functions');
const express = require('express');
const api = express();
const request = require('request');

api.use(express.static(__dirname + '/dist/'));




const PORT = process.env.PORT || 9090;
  
api.get('/api/*', (req, res) => {
    request('http://andmebaas.stat.ee/sdmx-json/data/'+req.params[0], function (error, response, body) {
        res.send(body);
    });
  });
  
api.listen(PORT, () => {
  console.log(`NodeJS App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

exports.api = functions.https.onRequest(api);