import json
from dynamodb import get_customers

def handler(event, context):

    response = {}
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'

    try:
        response['body'] = json.dumps(get_customers())
    except Exception as e:
        response['statusCode'] = 500
        response['body'] = str(e)
    else:
        response['statusCode'] = 200

    return response