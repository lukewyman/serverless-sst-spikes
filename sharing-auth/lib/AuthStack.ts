import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as sst from '@serverless-stack/resources';
import { Api, Auth } from '@serverless-stack/resources';

export default class AuthStack extends sst.Stack {
  
  private _auth: sst.Auth;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const auth = new Auth(this, 'Auth', {
      cognito: {
        userPool: {
          signInAliases: { email: true }
        },
      },
    });

    this._auth = auth;

    this.addOutputs({
      UserPoolId: auth.cognitoUserPool!.userPoolId,
      IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: auth.cognitoUserPoolClient!.userPoolClientId,
    })
  }

  public get auth() {
    return this._auth;
  }
}