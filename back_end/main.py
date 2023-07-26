import sys
import json
import urllib.request
import urllib.error
import urllib.parse
import json
import sys
import endpoints

if __name__ == '__main__':
    # Read the JSON object from stdin
    input_data = sys.stdin.read()

    # Convert the JSON string to a Python dictionary
    json_object = json.loads(input_data)

    # Now you can work with the JSON object in your Python script
    print(json_object)

    # Perform any processing needed on the JSON object

    # Convert the response to a JSON string and write to stdout
    response_data = json.dumps({'message': 'Hello from Python'})
    sys.stdout.write(response_data)
    sys.stdout.flush()


MY_TOKEN = "ae7db609154457b6e2b77e33cdf9747608c28854"  # Fill your token in here as a string.

def api_connect(url, params=None):
    if params:
        url += '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url)
    req.add_header('Authorization', 'Token ' + MY_TOKEN)
    return urllib.request.urlopen(req).read()

def to_json(input):
    json_object = json.loads(input)
    return json_object

def process_data(data):
    try:
        json_data = json.loads(data)
        response = {'message': 'Processed data successfully'}
        return json.dumps(json_data)    #return json.dumps(response) #<--- testing
    except json.JSONDecodeError:
        return json.dumps({'error': 'Invalid JSON'})