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

  try {
    const response = await requests.searchSystem(searchQuery);
    console.log('Response data:', response.data);

    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from external API');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});