const axios = require('axios');
const MY_TOKEN = "ae7db609154457b6e2b77e33cdf9747608c28854"; // Fill your token here as a string.

const CORE_SYSTEM = "https://cyder.oregonstate.edu/api/v1/core/system/";

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


async function CORE_SYS_API_CALL(query_str) {
  // call core_system endpoint
  console.log(query_str);
  const name_results = [];
  const po_number_results = [];
  const serial_number_results = [];
  const hardware_type_results = [];
  const location_results = [];

  const queries = [];
  if (query_str.po_number) {
    var query = "a:PO number=" + query_str.po_number;
    queries.push(query);
  }
  if (query_str.serial_number) {
    var query = "a:Serial number=" + query_str.serial_number;
    queries.push(query);
  }
  if (query_str.hardware_type) {
    var query = "a:Hardware type=" + query_str.hardware_type;
    queries.push(query);
  }
  if (query_str.location) {
    var query = "a:Location=" + query_str.location;
    queries.push(query);
  }

  // TODO: run queries for each query string then store results in arrays

}


module.exports = CORE_SYS_API_CALL;