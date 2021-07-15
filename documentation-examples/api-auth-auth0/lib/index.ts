import Auth0Stack from "./Auth0Stack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  new Auth0Stack(app, "auth0-stack");

  // Add more stacks
}
