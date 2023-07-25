const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const bodyParser = require('body-parser');
const { create } = require('domain');
const ipSubnetCalculator = require('ip-subnet-calculator').calculateSubnet;

const app = express();

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../front_end/build')));

app.post('/api/search', async (req, res) => {
  const data = req.body;

  console.log(data);

  const query = createQuery(data);

  const pythonProcess = spawn('python3', ['../python_api/main.py']);

  // Send the JSON object to the Python script as a string
  pythonProcess.stdin.write(JSON.stringify(query));
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (outputData) => {
    // Process the output from the Python script, if needed
    console.log(outputData.toString());
  });

  pythonProcess.stderr.on('data', (outputError) => {
    // Handle any error messages from the Python script, if needed
    console.error(outputError.toString());
  });

  pythonProcess.on('close', (code) => {
    // Python script has finished running
    console.log(`Python script exited with code ${code}`);
  });

  console.log(query);

  res.sendStatus(200);
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
    query['i:name__contains'] = data.name;
  }
  if ((data.usePoNumber) || (data.poNumber !== '')) {
    query['i:po_number__contains'] = data.poNumber;
  }
  if ((data.useSerialNumber) || (data.serialNumber !== '')) {
    query['i:serial_number__contains'] = data.serialNumber;
  }
  if ((data.useLocation) || (data.location !== '')) {
    query['i:location__contains'] = data.location;
  }
  if ((data.useHardwareType) || (data.hardwareType !== '')) {
    query['i:hardware_type__contains'] = data.hardwareType;
  }
  if ((data.useIP) || (data.ipAddr !== '')) {
    query['i:ip_addr__contains'] = data.ipAddr;
  }
  if ((data.useMac) || (data.macAddr !== '')) {
    query['i:mac_addr__contains'] = data.macAddr;
  }

  return query;
}