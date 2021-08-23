import json
from dynamodb import delete_customer

def handler(event, context):
    customer_id = event['pathParameters']['customerId']

    response = {}
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'

    try:
        delete_customer(customer_id)
    except Exception as e:
        print(e)
        response['statusCode'] = 500
        response['body'] = json.dumps(str(e))
    else:
        response['statusCode'] = 204

    return response