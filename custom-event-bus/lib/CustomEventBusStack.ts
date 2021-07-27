import * as sst from '@serverless-stack/resources';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import * as iam from '@aws-cdk/aws-iam';

export default class EventBusStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);    

    const bus = new events.EventBus(this, 'custom-bus');

    const rule = new events.Rule(this, 'custom-rule', {
      eventBus: bus,
      eventPattern: {
        source: ['custom-event-bus.orders'],
        detailType: ['OrderPlaced'],
      }
    });

    const orderProcessor = new sst.Function(this, 'order-processor', {
      handler: 'src/create-invoice.handler',
    });
    rule.addTarget(new targets.LambdaFunction(orderProcessor));

    const placeOrderFunction = new sst.Function(this, 'place-order', {
      handler: 'src/place-order.handler',
      environment: {
        CUSTOM_BUS: bus.eventBusName,
      },
    });

    const api = new sst.Api(this, 'Api', {
      routes: {
        'POST /orders': placeOrderFunction,
      }
    });

    placeOrderFunction.attachPermissions([
      new iam.PolicyStatement({
        actions: ["events:PutEvents"],
        effect: iam.Effect.ALLOW,
        resources: [
          bus.eventBusArn
        ],
      }),
    ]);    

    this.addOutputs({
      ApiEndpoint: api.url,
      EventBusName: bus.eventBusName
    });
  }
}