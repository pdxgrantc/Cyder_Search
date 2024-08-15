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

// TODO create a route for next page that takes a url and returns the next page of results
app.get('/api/nextpage', async (req, res) => {
  res.status(200).send('Not implemented');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
