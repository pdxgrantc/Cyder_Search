import urllib.request
import urllib.error
import urllib.parse
import endpoints
import json
import sys

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