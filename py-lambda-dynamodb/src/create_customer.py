import json
import uuid
from dynamodb import create_customer

def handler(event, context):
    
    body = json.loads(event['body'])
    first_name = body['first_name']
    last_name = body['last_name']
    address = body['address']
    phone = body['phone']

    customer = {
        'customer_id': str(uuid.uuid4()),
        'first_name': first_name,
        'last_name': last_name,
        'address': address,
        'phone': phone
    }

    response = {}
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'

    try:
        create_customer(customer)        
    except Exception as e:
        print(e)
        response['statusCode'] = 500
        response['body'] = json.dumps(str(e))
    else:
        response['statusCode'] = 201
        response['body'] = json.dumps(customer)

    return response