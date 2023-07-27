const STATIC_INTERFACE_API_CALL = require('./lib_files/STATIC_INTERFACE_REQ.js');
const CORE_SYS_API_CALL = require('./lib_files/CORE_SYS_REQ.js');

const axios = require('axios');
const MY_TOKEN = "ae7db609154457b6e2b77e33cdf9747608c28854"; // Fill your token here as a string.

const endpoints = {
  ALLDIR: "https://cyder.oregonstate.edu/api/v1/",
  CORE_CENTER: "https://cyder.oregonstate.edu/api/v1/core/system/",
  CORE_SYSTEM: "https://cyder.oregonstate.edu/api/v1/core/system/",
  CORE_SYSTEM_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/core/system/attributes/",
  CORE_USER: 'https://cyder.nws.oregonstate.edu/api/v1/core/user/',
  DYNAMIC_INTERFACE: "https://cyder.oregonstate.edu/api/v1/dhcp/dynamic_interface/",
  DYNAMIC_INTERFACE_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/dynamic_interface/attributes/", // returns 404.
  NETWORK: "https://cyder.oregonstate.edu/api/v1/dhcp/network/",
  NETWORK_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/network/attributes/",
  DHCP_RANGE: "https://cyder.oregonstate.edu/api/v1/dhcp/range/",
  DHCP_RANGE_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/range/attributes/",
  SITE: "https://cyder.oregonstate.edu/api/v1/dhcp/site/",
  SITE_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/site/attributes/",
  STATIC_INTERFACE: "https://cyder.oregonstate.edu/api/v1/dhcp/static_interface/", // contains all static interfaces, including multiple entries for systems with multiple entries. Does not display attributes, does display IP, MAC, Domain etc.
  STATIC_INTERFACE_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/static_interface/attributes/", // returns 404
  VLAN: "https://cyder.oregonstate.edu/api/v1/dhcp/vlan/",
  VLAN_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/vlan/attributes/",
  VRF: "https://cyder.oregonstate.edu/api/v1/dhcp/vrf/",
  VRF_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/vrf/attributes/",
  WORKGROUP: "https://cyder.oregonstate.edu/api/v1/dhcp/workgroup/",
  WORKGROUP_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dhcp/workgroup/attributes/",
  ADDRESS_RECORD: "https://cyder.oregonstate.edu/api/v1/dns/address_record/",
  CNAME: 'https://cyder.oregonstate.edu/api/v1/dns/cname/', // only contains cname. Guide on cyder API found: https://cyder.oregonstate.edu/docs/api/intro_python/index.html#. Uses cname for examples.
  DOMAIN: "https://cyder.oregonstate.edu/api/v1/dns/domain/",
  MX: "https://cyder.oregonstate.edu/api/v1/dns/mx/",
  NAMESERVER: 'https://cyder.oregonstate.edu/api/v1/dns/nameserver/',
  PTR: "https://cyder.oregonstate.edu/api/v1/dns/ptr/",
  SOA: "https://cyder.oregonstate.edu/api/v1/dns/soa/",
  SOA_ATTRIBUTES: "https://cyder.oregonstate.edu/api/v1/dns/soa/attributes/",
  SRV: "https://cyder.oregonstate.edu/api/v1/dns/srv/",
  SSHFP: "https://cyder.oregonstate.edu/api/v1/dns/sshfp/",
  DNS_TXT: "https://cyder.oregonstate.edu/api/v1/dns/txt/",
};

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

async function start(json_object) {
  try {
    const response_data = await api_get(endpoints.STATIC_INTERFACE, json_object);
    const response_data_json = JSON.stringify(response_data).replace("/api/v1", "");
    return response_data_json;
  } catch (error) {
    console.error('Error occurred:', error.message);
    return JSON.stringify({ error: error.message });
  }
}

module.exports = start;

async function call_api(query_obj) {
  var query_return_value = {
    static_interface_query: null,
    core_system_query: null,
  }

  var static_interface_query = {}
  if (query_obj.mac_addr) {
    static_interface_query.mac_addr = query_obj.mac_addr;
  }
  if (query_obj.ip_str) {
    static_interface_query.ip_str = query_obj.ip_str;
  }

  if (Object.keys(static_interface_query).length > 0) {
    await STATIC_INTERFACE_API_CALL(static_interface_query).then((result) => {
      query_return_value.static_interface_query = result;
    }
    );
  }

  // make a core_system_query object without the ip_str and mac_addr
  var core_system_query = {}
  if (query_obj.name) {
    core_system_query.name = query_obj.name;
  }
  if (query_obj.po_number) {
    core_system_query.po_number = query_obj.po_number;
  }
  if (query_obj.serial_number) {
    core_system_query.serial_number = query_obj.serial_number;
  }
  if (query_obj.hardware_type) {
    core_system_query.hardware_type = query_obj.hardware_type;
  }
  if (query_obj.location) {
    core_system_query.location = query_obj.location;
  }

  if (Object.keys(core_system_query).length > 0) {
    // call the core_system endpoint
    const core_system_result = await CORE_SYS_API_CALL(core_system_query).then((result) => {
      query_return_value.core_system_query = result;
    });
  }

  return query_return_value;
}

module.exports = call_api;