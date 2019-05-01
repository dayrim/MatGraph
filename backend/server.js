'use strict';


const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/'));


const PORT = process.env.PORT || 9090;
  
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

