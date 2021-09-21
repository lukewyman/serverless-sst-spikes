import os
import boto3

def handler(event, context):

    pool_user = event['request']['userAttributes']
    test_user = {}
    test_user['user_id'] = pool_user['sub']
    test_user['first_name'] = pool_user['given_name']
    test_user['last_name'] = pool_user['family_name']
    test_user['stage_name'] = pool_user['preferred_username']
    test_user['email'] = pool_user['email']
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['USERS_TABLE'])
    table.put_item(Item=test_user)

    return event