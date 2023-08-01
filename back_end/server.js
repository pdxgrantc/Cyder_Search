const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
const { create } = require('domain');
const ipSubnetCalculator = require('ip-subnet-calculator').calculateSubnet;
const start = require('../api_interface/lib.js')
const util = require('util');
const call_api = require('../api_interface/lib.js');

const app = express();

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../front_end/build')));

app.post('/api/search', async (req, res) => {
  const data = req.body;

  var query = createQuery(data);

  console.log(query);

  await call_api(query)
    .then((result) => {
      // Send the response back to the client
      // pasrse
      result = JSON.stringify(result);
      result = JSON.parse(result);
      //result = JSON.parse(result);
      console.log(result)
      // send the json as data.results
      res.json(result);
    })
    .catch((error) => {
      console.error('Error occurred t:', error.message);
      res.status(500).json({ error: error.message }); // Send an error response to the client.
    });
});

app.get('/api/search', async (req, res) => {
  // Retrieve the query parameters from the request
  const { NAME, NAMEU, PO, POU, SN, SNU, LOC, LOCU, HT, HTU, IP, IPU, MAC, MACU } = req.query;

  console.log(HTU)

  // Build the query object
  const query = JSON.parse(JSON.stringify(build_query(NAME, NAMEU, PO, POU, SN, SNU, LOC, LOCU, HT, HTU, IP, IPU, MAC, MACU)));

  console.log(query);

  await call_api(query)
    .then((result) => {
      // pasrse
      result = JSON.stringify(result);
      result = JSON.parse(result);

      console.log(result)
      // send the json as data.results
      res.json(result);
    })
    .catch((error) => {
      console.error('Error occurred t:', error.message);
      res.status(500).json({ error: error.message }); // Send an error response to the client.
    });
      // Send the response back to the client
      

  // Return a response (you can customize this as per your needs)
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front_end/build/index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});


function build_query(NAME, NAMEU, PO, POU, SN, SNU, LOC, LOCU, HT, HTU, IP, IPU, MAC, MACU) {
  let query = {
  }
  // add on the name if it exists
  if (NAME !== '') {
    query.name = NAME;
  }
  // for each of these fields if they exist add them to the query
  // or if the user specified that they want to search for empty fields
  if (PO !== '') {
    query.po_number = PO;
  }
  else if (POU === "true") {
    query.po_number = "";
  }
  if (SN !== '') {
    query.serial_number = SN;
  }
  else if (SNU === "true") {
    query.serial_number = "";
  }
  if (LOC !== '') {
    query.location = LOC;
  }
  else if (LOCU === "true") {
    query.location = "";
  }
  if (HT !== '') {
    query.hardware_type = HT;
  }
  else if (HTU === "true") {
    query.hardware_type = "";
  }
  // add on the ip and mac if they exist
  if (IP !== '') {
    query.ip_str = IP;
  }
  if (MAC !== '') {
    query.mac_addr = MAC;
  }

  return query;
}



/*
function createQuery(data) {
  let query = {
  }
  if (data.ctnr !== '') {
    query['i:ctnr__contains'] = data.ctnr;
  }
  if ((data.useName) || (data.name !== '')) {
    query.name = data.name;
  }
  if ((data.usePoNumber) || (data.poNumber !== '')) {
    query.po_number = data.poNumber;
  }
  if ((data.useSerialNumber) || (data.serialNumber !== '')) {
    query.serial_number = data.serialNumber;
  }
  if ((data.useLocation) || (data.location !== '')) {
    query.location = data.location;
  }
  if ((data.useHardwareType) || (data.hardwareType !== '')) {
    query.hardware_type = data.hardwareType;
  }
  if ((data.useIP) || (data.ipAddr !== '')) {
    query.ip_str = data.ipAddr;
  }
  if ((data.useMac) || (data.macAddr !== '')) {
    query.mac_addr = data.macAddr;
  }

  return query;
}
*/