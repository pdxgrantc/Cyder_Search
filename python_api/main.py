import urllib.request
import urllib.error
import urllib.parse
import endpoints
import lib
import json
import sys

#fields = lib.to_json((lib.api_connect(endpoints.CORE_SYSTEM)).decode().replace("/api/v1", ""))

#print(fields)

if __name__ == '__main__':
    input_data = sys.stdin.read()
    response_data = lib.process_data(input_data)
    sys.stdout.write(response_data)
    sys.stdout.flush()