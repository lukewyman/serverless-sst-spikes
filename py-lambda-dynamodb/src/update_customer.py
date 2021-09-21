import json
from dynamodb import update_customer

def handler(event, context):
    customer_id = event['pathParameters']['customerId']
    customer = json.loads(event['body'])
    customer['customer_id'] = customer_id
    
    response = {}
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'

    try:
        response['statusCode'] = 201
        response['body'] = json.dumps(update_customer(customer))
    except Exception as e:
        print(e)
        response['statusCode'] = 500
        response['body'] = str(e)

    return response