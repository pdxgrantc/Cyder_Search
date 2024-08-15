const requests = require('./requests');

async function main() {
    const test = {
        "isForestryZone": true,
        "name": "example",
        "department": "IT",
        "hardwareType": "laptop",
        "location": "office",
        "operatingSystem": "Windows",
        "otherID": "12345",
        "owningUnit": "unit1",
        "poNumber": "PO123456",
        "purchaseDate": "2023-01-01",
        "serialNumber": "SN123456",
        "userID": "user123",
        "warrantyDate": "2024-01-01"
    };

    const response = await requests.searchSystem(test);

    console.log(response.data);
}

main();