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
}

async function api_connect(url, params = null) {
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

// TODO replace /api/v1 with empty string

module.exports = start;

async function get_static_interface(static_interface_obj) { }

async function get_core_system(core_system_objF) { }

async function call_api(query_obj) {
  if ((query_object.ip_str !== '') || (query_object.mac_addr !== '')) {
    // create static_interface object
    const static_interface_obj = {}

    if (query_object.ip_str !== '') {
      static_interface_obj["i:ip_str__exact"] = query_object.ip_str;
    }
    if (query_object.mac_addr !== '') {
      static_interface_obj['i:mac_addr__contains'] = query_object.mac_addr;
    }

    console.log(static_interface_obj);

    // call static_interface endpoint
  }
}

module.exports = call_api;