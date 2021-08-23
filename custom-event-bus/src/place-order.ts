import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import OrderDto from './orderDto';
import Order from './Order';

export const handler: Handler = 
  async (event: APIGatewayProxyEvent & OrderDto ): Promise<APIGatewayProxyResult> => {
  const { orderId, product, count } = JSON.parse(event.body);

  const order: Order = {
    orderId,
    orderDate: new Date().toISOString(),
    product,
    count,
  };

  const params = {
    Entries: [
      {
        Detail: JSON.stringify(order),
        DetailType: 'OrderPlaced',
        Source: 'custom-event-bus.orders',
        EventBusName: process.env.CUSTOM_BUS,
      }
    ]
  }

  try {
    const eventbridge = new AWS.EventBridge();
    const result = await eventbridge.putEvents(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    }).promise();

    return {
      statusCode: 201,
      body: `event params: ${JSON.stringify(params)}`,
    };

  } catch (err) {
    console.log(err, err);
    return {
      statusCode: 500,
      body: err
    }
  }
}
