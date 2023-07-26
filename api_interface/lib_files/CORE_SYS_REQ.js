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
  var po_number_results = {};
  var serial_number_results = {};
  var hardware_type_results = {};
  var location_results = {};

  if (query_str.po_number) {
    var query = "a:PO number=" + query_str.po_number;

    try {
      await api_get(CORE_SYSTEM, query).then((result) => {
        const response_data_json = JSON.stringify(result).replace("/api/v1", "");
        po_number_results = JSON.parse(response_data_json);
      });
    } catch (error) {
      console.error('Error occurred:', error.message);
      return JSON.stringify({ error: error.message });
    }
    if (query_str.serial_number) {
      var query = "a:Serial number=" + query_str.serial_number;

      try {
        await api_get(CORE_SYSTEM, query).then((result) => {
          const response_data_json = JSON.stringify(result).replace("/api/v1", "");
          serial_number_results = JSON.parse(response_data_json);
        }
        );
      } catch (error) {
        console.error('Error occurred:', error.message);
        return JSON.stringify({ error: error.message });
      }
    }
    if (query_str.hardware_type) {
      var query = "a:Hardware type=" + query_str.hardware_type;

      try {
        await api_get(CORE_SYSTEM, query).then((result) => {
          const response_data_json = JSON.stringify(result).replace("/api/v1", "");
          hardware_type_results = JSON.parse(response_data_json);
        }
        );
      }
      catch (error) {
        console.error('Error occurred:', error.message);
        return JSON.stringify({ error: error.message });
      }
    }
    if (query_str.location) {
      var query = "a:Location=" + query_str.location;

      try {
        await api_get(CORE_SYSTEM, query).then((result) => {
          const response_data_json = JSON.stringify(result).replace("/api/v1", "");
          location_results = JSON.parse(response_data_json);
        });
      } catch (error) {
        console.error('Error occurred:', error.message);
        return JSON.stringify({ error: error.message });
      }
    }

    // TODO: run queries for each query string then store results in arrays
  }

  console.log("PO NUMBER RESULTS");
  console.log(po_number_results);
  console.log();
  console.log("SERIAL NUMBER RESULTS");
  console.log(serial_number_results);
  console.log();
  console.log("HARDWARE TYPE RESULTS");
  console.log(hardware_type_results);
  console.log();
  console.log("LOCATION RESULTS");
  console.log(location_results);


  return null;
}



module.exports = CORE_SYS_API_CALL;