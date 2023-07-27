const axios = require('axios');
const MY_TOKEN = "ae7db609154457b6e2b77e33cdf9747608c28854"; // Fill your token here as a string.

const STATIC_INTERFACE = "https://cyder.oregonstate.edu/api/v1/dhcp/static_interface/"; // static_interface endpoint

async function api_get(url, params = null) {
  if (params) {
    url += '?' + new URLSearchParams(params).toString();
  }
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Token ${MY_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function Process_Query(raw_query_result) {
  var processed_query_result = {};

  if (!(Object.keys(raw_query_result).length > 0)) {
    return null;
  }

  raw_query_result = JSON.parse(raw_query_result);
  processed_query_result.count = Number(raw_query_result.count);
  processed_query_result.systems = [];

  for (var i = 0; i < raw_query_result.count; i++) {
    // creat
    var cache = {};
    // add data to cache object
    cache.id = raw_query_result.results[0].id;
    cache.name = raw_query_result.results[0].label;
    cache.fqdn = raw_query_result.results[0].fqdn;
    cache.ip_str = raw_query_result.results[0].ip_str;
    cache.mac_addr = raw_query_result.results[0].mac;
    cache.system_url = raw_query_result.results[0].system;

    processed_query_result.systems.push(cache);
  }

  return processed_query_result;
}

async function Run_Query(static_interface_obj) {
  if (Object.keys(static_interface_obj).length > 0) {
    // call static_interface endpoint
    try {
      const response_data = await api_get(STATIC_INTERFACE, static_interface_obj);
      const response_data_json = JSON.stringify(response_data).replace("/api/v1", "");

      return response_data_json;
    } catch (error) {
      console.error('Error occurred:', error.message);
      return JSON.stringify({ error: error.message });
    }
  }
}

async function STATIC_INTERFACE_API_CALL(query_obj) {
  // code to create query object and call api STATIC_INTERFACE endpoint
  if ((query_obj.ip_str !== '') || (query_obj.mac_addr !== '')) {
    // create static_interface object
    const static_interface_obj = {}

    if (query_obj.ip_str) {
      static_interface_obj["i:ip_str__exact"] = query_obj.ip_str;
    }
    if (query_obj.mac_addr) {
      static_interface_obj['i:mac__exact'] = query_obj.mac_addr;
    }

    await Run_Query(static_interface_obj).then((result) => {
      if (Object.keys(result).length > 0) {
        const processed_query_result = Process_Query(result);
        console.log("Processed_query_result return value:", processed_query_result);
        return processed_query_result;
      } else {
        return null;
      }
    });
  } else {
    return null;
  }
}

module.exports = STATIC_INTERFACE_API_CALL;