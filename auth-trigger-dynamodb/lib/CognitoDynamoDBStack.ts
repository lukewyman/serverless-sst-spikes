import * as cdk from '@aws-cdk/core';
import * as sst from '@serverless-stack/resources';

export default class CognitoDynamoDBStack extends sst.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const testUsersTable = new sst.Table(this, 'test_users', {
      fields: {
        user_id: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'user_id' },
      dynamodbTable: {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      },
    });

    const api = new sst.Api(this, 'Api', {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      routes: {
        'GET /private': 'src/resources/private.main',
        'GET /public': {
          function: 'src/resources/public.main',
          authorizationType: sst.ApiAuthorizationType.NONE,
        },
      },
    });

    const auth = new sst.Auth(this, 'Auth', {      
      cognito: {
        defaultFunctionProps: {
          environment: {
            testUsersTable: testUsersTable.dynamodbTable.tableName,
          },
        },
        userPool: {
          signInAliases: { email: true },
          removalPolicy: cdk.RemovalPolicy.DESTROY,
          
        },
        triggers: {
          postConfirmation: 'src/triggers/post_confirm_insert_dynamodb.handler',
        },
      },
    });

    auth.attachPermissionsForAuthUsers([api]);  
    auth.attachPermissionsForTriggers([testUsersTable]);

    this.addOutputs({
      ApiEndpoint: api.url,
      UserPoolId: auth.cognitoUserPool!.userPoolId,
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: auth.cognitoUserPoolClient!.userPoolClientId,
    });
  }
}