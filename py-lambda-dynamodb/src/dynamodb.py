import os
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

def create_customer(customer):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['CUSTOMERS_TABLE'])

    response = table.put_item(
        Item = customer
    )

    return response


def get_customer(customer_id):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['CUSTOMERS_TABLE'])

    try:
        response = table.get_item(Key={'customer_id': customer_id})
    except ClientError as e:
        print(e.response['Error']['Message'])
        raise e
    else:
        return response.get('Item')


def get_customers():
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['CUSTOMERS_TABLE'])

    scan_kwargs = {
        'ProjectionExpression': "customer_id, first_name, last_name, address, phone"
    }

    return table.scan(**scan_kwargs)['Items']


def update_customer(customer):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['CUSTOMERS_TABLE'])

    response = table.update_item(
        Key = {
            'customer_id': customer['customer_id']
        },
        UpdateExpression = 'set first_name=:fn, last_name=:ln, address=:a, phone=:p',
        ExpressionAttributeValues = {
            ':fn': customer['first_name'],
            ':ln': customer['last_name'],
            ':a' : customer['address'],
            ':p' : customer['phone']
        },
        ReturnValues = 'ALL_NEW'
    )
    
    return response.get('Attributes')


def delete_customer(customer_id):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['CUSTOMERS_TABLE'])

    response = table.delete_item(
        Key = { 'customer_id': customer_id },        
    )

    return response