import * as sst from "@serverless-stack/resources";
import CognitoAuthenticationStack from "./CognitoAuthenticationStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  new CognitoAuthenticationStack(app, "cognito-authentication-stack");
}
