import * as cdk from '@aws-cdk/core';
import * as apigAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers';
import * as sst from '@serverless-stack/resources';

export default class Auth0JwtStack extends sst.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new sst.Api(this, 'Api', {
      defaultAuthorizer: new apigAuthorizers.HttpJwtAuthorizer({
        jwtAudience: [''],
        jwtIssuer: 'https://xxxxxx.us.auth0.com/',
      }),
      defaultAuthorizationType: sst.ApiAuthorizationType.JWT,
      routes: {
        'GET /private': 'src/private.main',
        'GET /public': {
          function: 'src/public.main',
          authorizationType: sst.ApiAuthorizationType.NONE,
        },
      },
    });

    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}