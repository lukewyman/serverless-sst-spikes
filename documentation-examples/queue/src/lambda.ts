import { SqsDlq } from "@aws-cdk/aws-lambda-event-sources";
import { APIGatewayProxyEvent, Handler, Context, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from 'aws-sdk'

const sqs = new AWS.SQS();

export const handler: Handler = 
async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {

  await sqs
    .sendMessage({
      QueueUrl: process.env.queueUrl!,
      MessageBody: JSON.stringify({ ordered: true }),
    })
    .promise();

  console.log('Message queued!');

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'successful' }),
  };
}