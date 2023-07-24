// write a node js server that listens on port 3000 and serves a react app at ../front_end/build/index.html
// use express and path modules
// use express.static to serve the static files in ../front_end/build
// use app.get to serve the index.html file
// use app.listen to listen on port 3000


// Path: back_end/server.js

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../front_end/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front_end/build/index.html'));
}
);

app.listen(3000, () => {
  console.log('Listening on port 3000');
}
);
