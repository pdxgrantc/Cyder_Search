const call_api = require('./lib.js');

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
        query['a:po_number__contains'] = data.poNumber;
    }
    if ((data.useSerialNumber) || (data.serialNumber !== '')) {
        query['a:serial_number__contains'] = data.serialNumber;
    }
    if ((data.useLocation) || (data.location !== '')) {
        query['a:location__contains'] = data.location;
    }
    if ((data.useHardwareType) || (data.hardwareType !== '')) {
        query['a:hardware_type__contains'] = data.hardwareType;
    }
    if ((data.useIP) || (data.ipAddr !== '')) {
        query.ip_str = data.ipAddr;
    }
    if ((data.useMac) || (data.macAddr !== '')) {
        query.mac_addr = data.macAddr;
    }

    return query;
}

async function main() {

    const query = {
        name: 'FOR-SUPPER',
        ip_str: '10.207.18.175',
        //mac_addr: 'aC:1A:3D:6F:53:27',
        //po_number: 'P0247244',
        //serial_number: '9B0JFY3',
        hardware_type: 'Lenovo',
        //location: 'PFSC 208',
    }
    /*
    const query = {
        ip_str: '10.207.18.175',
        serial_number: '9B0JFY3',
        po_number: 'P024',
    }
    */
    await call_api(query)
        .then((result) => {
            console.log(JSON.stringify(result, null, 2));
        })
}

main()
