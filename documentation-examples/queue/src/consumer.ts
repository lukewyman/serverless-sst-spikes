import { SQSEvent, Handler, Context } from "aws-lambda";

export const handler: Handler = async (event: SQSEvent, context: Context) => {

  console.log(event);
  console.log('Message processed');

  return {};
}