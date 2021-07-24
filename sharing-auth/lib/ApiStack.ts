import * as cdk from '@aws-cdk/core';
import * as sst from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {
  constructor(scope: cdk.Construct, id: string, auth: sst.Auth, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new sst.Api(this, 'Api', {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      routes: {
        'GET /': 'src/lambda.handler',
      },
    });
    
    auth.attachPermissionsForAuthUsers([api]);

    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}