import * as cdk from '@aws-cdk/core';
import * as sst from '@serverless-stack/resources';

export default class TriggersStack extends sst.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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
        userPool: {
          signInAliases: { email: true },
          removalPolicy: cdk.RemovalPolicy.DESTROY,
        },
        triggers: {
          preSignUp: 'src/triggers/preSignup.handler',
          postConfirmation: 'src/triggers/postConfirmation.handler',
          preAuthentication: 'src/triggers/preAuthentication.handler',
          postAuthentication: 'src/triggers/postAuthentication.handler',
        },
      },
    });

    auth.attachPermissionsForAuthUsers([api]);

    this.addOutputs({
      ApiEndpoint: api.url,
      UserPoolId: auth.cognitoUserPool!.userPoolId,
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: auth.cognitoUserPoolClient!.userPoolClientId,
    });
  }
}