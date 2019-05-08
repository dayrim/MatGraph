const functions = require('firebase-functions');
const express = require('express');
const app = express();
const request = require('request');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const PORT = process.env.PORT || 9090;
  

//KK91

app.get('/api/stat-ee/:tableName', (req, res) => {
    console.log(req.params)
    request('http://andmebaas.stat.ee/sdmx-json/data/'+req.params.tableName, function (error, response, body) {
        res.send(body);
    });
  });

//   api.get('/stat-ee/:tableName/column-titles', (req, res) => {
//     console.log(req.params)
//     request('http://andmebaas.stat.ee/sdmx-json/data/'+req.params.tableName, function (error, response, body) {
//         res.send(body);
//     });
//   });

//   api.get('/stat-ee/:tableName/column-data', (req, res) => {
//     console.log(req.params)
//     request('http://andmebaas.stat.ee/sdmx-json/data/'+req.params.tableName, function (error, response, body) {
//         res.send(body);
//     });
//   });

//   api.get('/stat-ee/:tableName/row-data', (req, res) => {
//     console.log(req.params)
//     request('http://andmebaas.stat.ee/sdmx-json/data/'+req.params.tableName, function (error, response, body) {
//         res.send(body);
//     });
//   });

//   api.get('/stat-ee/:tableName/row-data', (req, res) => {
//     console.log(req.params)
//     request('http://andmebaas.stat.ee/sdmx-json/data/'+req.params.tableName, function (error, response, body) {
//         res.send(body);
//     });
//   });
  
app.listen(PORT, () => {
  console.log(`NodeJS App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

exports.api = functions.https.onRequest(app);