import sys
import json

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
