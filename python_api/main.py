import urllib.request
import urllib.error
import urllib.parse
import endpoints
import lib
import json

fields = lib.to_json((lib.api_connect(endpoints.CORE_SYSTEM)).decode().replace("/api/v1", ""))

print(fields)