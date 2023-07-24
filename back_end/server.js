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
