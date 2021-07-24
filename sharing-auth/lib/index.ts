import AuthStack from "./AuthStack";
import ApiStack  from "./ApiStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  const authStack = new AuthStack(app, 'auth');
  new ApiStack(app, 'api', authStack.auth);
  // Add more stacks
}
