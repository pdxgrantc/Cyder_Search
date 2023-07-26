import urllib.request
import urllib.error
import urllib.parse
import endpoints
import json
import sys
import lib

#fields = lib.to_json((lib.api_connect(endpoints.CORE_SYSTEM)).decode().replace("/api/v1", ""))




if __name__ == '__main__':
    input_data = sys.stdin.read()

    # make input data a string
    json_data = json.loads(input_data)

    response_data = (lib.api_connect(endpoints.CORE_SYSTEM, json_data)).decode().replace("/api/v1", "")
    json_convert = lib.to_json(response_data)
    sys.stdout.write(response_data)
    sys.stdout.flush()


