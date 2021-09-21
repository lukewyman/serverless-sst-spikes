import json
from dynamodb import get_customer

def handler(event, context):
    
    customer_id = event['pathParameters']['customerId']

    response = {}
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'
    
    try:
        customer = get_customer(customer_id)
        if customer is None:
            response['statusCode'] = 404
            response['body'] = json.dumps(f'Customer with id {customer_id} not found')
        else:
            response['statusCode'] = 200
            response['body'] = json.dumps(customer)
    except Exception as e:
        print(e)
        response['statusCode'] = 500
        response['body'] = json.dumps(str(e))

    return response