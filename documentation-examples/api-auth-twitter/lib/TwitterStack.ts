import { HttpVersion } from '@aws-cdk/aws-cloudfront';
import * as cdk from '@aws-cdk/core';
import * as sst from '@serverless-stack/resources';

export default class TwitterStack extends sst.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new sst.Api(this, 'Api', {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      routes: {
        'GET /private': 'scr/private.main',
        'GET /public': {
          function: 'src/public.main',
          authorizationType: sst.ApiAuthorizationType.NONE,
        }
      }
    });

    const auth = new sst.Auth(this, 'Auth', {
      twitter: {
        consumerKey: 'twitter consumer key',
        consumerSecret: 'twitter consumer secret',
      }
    });

    this.addOutputs({
      ApiEndpoint: api.url,
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
    });
  }
}