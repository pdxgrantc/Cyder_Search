const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../front_end/build')));

app.post('/api/search', async (req, res) => {
  const data = req.body;

  console.log(data);

  res.status(200);
}
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front_end/build/index.html'));
}
);

app.listen(3000, () => {
  console.log('Listening on port 3000');
}
);
