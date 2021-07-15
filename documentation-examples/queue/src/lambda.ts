import * as AWS from 'aws-sdk';

const sqs = new AWS.SQS();

export async function main() {
  await sqs.sendMessage({
    QueueUrl: process.env.queueUrl!,
    MessageBody: JSON.stringify({ ordered: true })
  })
  .promise();

  console.log("Message queued!");

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "successful" }),
  };
}