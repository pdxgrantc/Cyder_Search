import urllib.request
import urllib.error
import urllib.parse
import endpoints
import json

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