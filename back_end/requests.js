const axios = require('axios');

function buildQueryString(params) {
    const queryParts = [];
    for (const key in params) {
        if (params[key]) {
            queryParts.push(`${key}=${encodeURIComponent(params[key])}`);
        }
    }
    return queryParts.join('&');
}

function runQuery(queryString) {
    return axios.get(`https://cyder.oregonstate.edu/api/v1/core/system/${queryString}`, {
        headers: {
            'Authorization': 'Token 1ba31a00e6569df39390e0dba2d8f90b772564ba'
        }
    });
}

function searchSystem({
    name = '',
    department = '',
    hardwareType = '',
    location = '',
    operatingSystem = '',
    otherID = '',
    owningUnit = '',
    poNumber = '',
    purchaseDate = '',
    serialNumber = '',
    userID = '',
    warrantyDate = '',
    limitToForestry = '',
}) {

    

    var queryString = '';

    const attributes = {
        'a:user+id': department,
        'a:hardware+type': hardwareType,
        'a:location': location,
        'a:operating+system': operatingSystem,
        'a:other+id': otherID,
        'a:owning+unit': owningUnit,
        'a:po+number': poNumber,
        'a:purchase+date': purchaseDate,
        'a:serial+number': serialNumber,
        'a:user+id': userID,
        'a:warranty+date': warrantyDate
    };

    if (limitToForestry === true) {
        queryString = "?ctnr=zone.forestry";
    }

    if (name !== '') {
        if (queryString === '') {
            queryString = queryString + "?" + "i:name__contains=" + name;
        } else {
            queryString = queryString + "&" + "i:name__contains=" + name;
        }
    }

    const attributesString = buildQueryString(attributes);

    if (queryString === '') {
        queryString = queryString + "?" + attributesString;
    } else {
        queryString = queryString + "&" + attributesString;
    }

    //return queryString;
    return axios.get(`https://cyder.oregonstate.edu/api/v1/core/system/${queryString}`, {
        headers: {
            'Authorization': 'Token 1ba31a00e6569df39390e0dba2d8f90b772564ba'
        }
    });
}


/*
function searchSystem({
    name = '',
    department = '',
    hardwareType = '',
    location = '',
    operatingSystem = '',
    otherID = '',
    owningUnit = '',
    poNumber = '',
    purchaseDate = '',
    serialNumber = '',
    userID = '',
    warrantyDate = ''
}) {
    const params = {
        'i:name__contains': name,
        'a:user+id': department,
        'a:hardware+type': hardwareType,
        'a:location': location,
        'a:operating+system': operatingSystem,
        'a:other+id': otherID,
        'a:owning+unit': owningUnit,
        'a:po+number': poNumber,
        'a:purchase+date': purchaseDate,
        'a:serial+number': serialNumber,
        'a:user+id': userID,
        'a:warranty+date': warrantyDate
    };

    const queryString = buildQueryString(params);

    return axios.get(`https://cyder.oregonstate.edu/api/v1/core/system/?${queryString}`, {
        headers: {
            'Authorization': 'Token 1ba31a00e6569df39390e0dba2d8f90b772564ba'
        }
    });
    
}
*/

module.exports = {
    searchSystem
};
