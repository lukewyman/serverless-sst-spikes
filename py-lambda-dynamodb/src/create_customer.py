import json
import uuid
from dynamodb import create_customer

def handler(event, context):
    
    customer = json.loads(event['body'])
    customer['customer_id'] = str(uuid.uuid4())

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