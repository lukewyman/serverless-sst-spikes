import * as cdk from '@aws-cdk/core';
import * as sst from '@serverless-stack/resources';

export default class QueueStack extends sst.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sst.Queue(this, 'Queue', {
      consumer: 'src/consumer.handler',
    });

    const api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        environment: {
          queueUrl: queue.sqsQueue.queueUrl,
        },
      },
      routes: {
        'POST /': 'src/lambda.handler',
      },
    });

    api.attachPermissions([queue]);

    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}