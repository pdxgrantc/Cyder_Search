const axios = require('axios');
const util = require("util");
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

function Process_Raw_Query(raw_query_result) {
  var processed_query_result = {
    count: 0,
    systems: [],
  };

  if (!(Object.keys(raw_query_result).length > 0)) {
    return null;
  }

  for (var i = 0; i < raw_query_result.count; i++) {
    var cache = {};
    cache.id = raw_query_result.results[i].id;
    cache.name = raw_query_result.results[i].name;
    cache.ctnr = raw_query_result.results[i].ctnr;

    processed_query_result.systems.push(cache);
    processed_query_result.count++;
  }

  return processed_query_result;
}

function TEST_Process_Raw_Query(raw_query_result) {
  var processed_query_result = {
    count: 0,
    systems: [],
  };

  if (!(Object.keys(raw_query_result).length > 0)) {
    return processed_query_result;
  }

  for (var i = 0; i < raw_query_result.results.length; i++) {
    var cache = {};
    var result = JSON.parse(JSON.stringify(raw_query_result.results[i]));

    cache.id = result.id;
    cache.name = result.name;
    cache.ctnr = result.ctnr;

    processed_query_result.systems.push(cache);
    processed_query_result.count++;
  }

  return processed_query_result;
}

function De_Duplicate_Query_Results(query_results) {
  var processed_query_results = {
    count: 0,
    systems: [],
  };

  var ids = [];

  for (var i = 0; i < query_results.length; i++) {
    var cache_ary = [];
    for (var j = 0; j < query_results[i].count; j++) {
      // push the id into the ids array if it is not already in there
      cache_ary.push(query_results[i].systems[j].id);
    }
    ids.push(cache_ary);
  }

  var all_objects = [];
  // push all of the objects from the query_results into the all_objects array
  for (var i = 0; i < query_results.length; i++) {
    for (var j = 0; j < query_results[i].count; j++) {
      all_objects.push(query_results[i].systems[j]);
    }
  }

  // create a new array of ids that appear in all of the arrays in the ids array
  var common_ids = ids.reduce((a, b) => a.filter(c => b.includes(c)));

  for (var i = 0; i < common_ids.length; i++) {
    var found = false;
    // iterate through all of the objects in the all_objects array 
    // then push the object into the processed_query_results array if the id matches
    for (var j = 0; j < all_objects.length; j++) {
      if (all_objects[j].id == common_ids[i]) {
        processed_query_results.systems.push(all_objects[j]);
        processed_query_results.count++;
        found = true;
        break;
      }
    }
  }

  return processed_query_results;
}

async function CORE_SYS_API_CALL(query_str) {
  var processed_query_result = [];

  if (query_str.po_number) {
    var query = "a:PO number=" + query_str.po_number;

    try {
      await api_get(CORE_SYSTEM, query).then((result) => {
        const response_data_json = JSON.stringify(result).replace("/api/v1", "");
        processed_query_result.push(TEST_Process_Raw_Query(JSON.parse(response_data_json)));
      });
    } catch (error) {
      console.error('Error occurred:', error.message);
      return JSON.stringify({ error: error.message });
    }
  }
  if (query_str.serial_number) {
    var query = "a:Serial number=" + query_str.serial_number;

    try {
      await api_get(CORE_SYSTEM, query).then((result) => {
        const response_data_json = JSON.stringify(result).replace("/api/v1", "");
        processed_query_result.push(TEST_Process_Raw_Query(JSON.parse(response_data_json)));
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
        processed_query_result.push(TEST_Process_Raw_Query(JSON.parse(response_data_json)));
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
        const response_data_json = JSON.stringify(result)
        processed_query_result.push(TEST_Process_Raw_Query(JSON.parse(response_data_json)));
      });
    } catch (error) {
      console.error('Error occurred:', error.message);
      return JSON.stringify({ error: error.message });
    }
  }
  
  if (processed_query_result.length == 0) {
    return null;
  }
  else {
    return De_Duplicate_Query_Results(processed_query_result);
  }
}



module.exports = CORE_SYS_API_CALL;