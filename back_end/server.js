const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { create } = require('domain');

const app = express();

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../front_end/build')));

app.post('/api/search', async (req, res) => {
  const data = req.body;

  console.log(data)

  const query = createQuery(data);

  console.log(query);


  res.send(200);
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