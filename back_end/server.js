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

testOBJ = {
  "count": 1,
  "next": null,
  "previous": null,
  "results": [{
    "systemav_set": [{ "id": "https://cyder.oregonstate.edu/core/system/attributes/213305/", "attribute": "Department", "value": "FCR" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213306/", "attribute": "Hardware type", "value": "Optiplex 7050" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213307/", "attribute": "Location", "value": "RH 313" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213308/", "attribute": "Operating system", "value": "Windows 10" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213309/", "attribute": "Owning unit", "value": "FCR" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213310/", "attribute": "PO number", "value": "P0106250" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213311/", "attribute": "Purchase date", "value": "06/07/2017" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213312/", "attribute": "Serial number", "value": "3Y7HKH2" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213313/", "attribute": "User ID", "value": "Paul Foshay" },
    { "id": "https://cyder.oregonstate.edu/api/v1/core/system/attributes/213314/", "attribute": "Warranty date", "value": "06/07/2021" }],
    "ctnr": "https://cyder.oregonstate.edu/api/v1/core/ctnr/70/",
    "id": 107680,
    "created": "2017-06-19T16:19:05",
    "modified": "2020-03-18T10:27:29",
    "name": "PATHOS"
  }]
}

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../front_end/build')));

app.get('/api/search', async (req, res) => {
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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front_end/build/index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

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