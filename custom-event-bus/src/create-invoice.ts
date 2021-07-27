import { EventBridgeEvent, EventBridgeHandler } from 'aws-lambda';
import Order from './Order';

export const handler = async (event: EventBridgeEvent<string, Order>) => {

  console.log(event);

}