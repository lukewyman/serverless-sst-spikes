import * as cdk from '@aws-cdk/core';
import * as sst from '@serverless-stack/resources';

export default class FacebookStack extends sst.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new sst.Api(this, 'Api', {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      routes: {
        'GET /private': 'src/private.main',
        'GET /public': {
          function: 'src/public.main',
          authorizationType: sst.ApiAuthorizationType.NONE,
        },
      },
    });

    const auth = new sst.Auth(this, 'Auth', {
      facebook: { appId: '527357675179538'},
    });

    auth.attachPermissionsForAuthUsers([api]);

    this.addOutputs({
      ApiEndpoint: api.url,
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
    });
  }
}