import os
import json
import uuid
from datetime import datetime
import boto3

def handler(event, context):
    message_body = json.loads(event['body'])

    order = {}
    order['order_id'] = str(uuid.uuid4())
    order['order_date'] = datetime.utcnow().strftime('%B %d, %Y')
    order['product'] = message_body['product']
    order['count'] = message_body['count']

    entries = [
                {
                    'Detail': json.dumps(order),
                    'DetailType': 'OrderPlaced',
                    'Source': 'custom-event-bus.orders',
                    'EventBusName': os.environ['CUSTOM_BUS'],
                }
            ]

    client = boto3.client('events')

    response = {}
    try:
        result = client.put_events(Entries=entries)
        print(result)
    except Exception as e:
        print(e)
        response['statusCode'] = 500
        response['body'] = str(e)
    else:
        response['statusCode'] = 200
        response['body'] = json.dumps(order) 

    return response