const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const requests = require('./requests');

// Enable CORS for all routes
app.use(cors());

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/api/search', async (req, res) => {

  const searchQuery = req.body;

  //log the search query
  if (!searchQuery) {
    return res.status(400).send('Query parameter "q" is required');
  }

  const response = await requests.searchSystem(searchQuery);

  res.status(response.status).send(response.data);

});

app.get('/api/nextpage', async (req, res) => {
  f
  const arg = req.query.arg;

  if (!arg) {
    return res.status(400).send('Missing required argument: arg');
  }

  const response = await requests.getNextPage(arg);

  res.status(response.status).send(response.data);
});

// if no route is matched by now, it must be a 404
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
