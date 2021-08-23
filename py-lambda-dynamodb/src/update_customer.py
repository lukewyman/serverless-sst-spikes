import json
from dynamodb import update_customer

def handler(event, context):
    customer_id = event['pathParameters']['customerId']
    body = json.loads(event['body'])
    first_name = body['first_name']
    last_name = body['last_name']
    address = body['address']
    phone = body['phone']

    customer = {
        'customer_id': customer_id,
        'first_name': first_name,
        'last_name': last_name,
        'address': address,
        'phone': phone
    }

    response = {}
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'

    try:
        response['statusCode'] = 201
        response['body'] = json.dumps(update_customer(customer))
    except Exception as e:
        response['statusCode'] = 500
        print(e)
        response['body'] = str(e)

    return response