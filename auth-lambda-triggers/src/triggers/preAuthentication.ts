import { PreAuthenticationTriggerEvent, PreAuthenticationTriggerHandler, Context, Callback } from 'aws-lambda';

export const handler: PreAuthenticationTriggerHandler = 
  (event: PreAuthenticationTriggerEvent, context: Context, callback: Callback) => {

    console.log(`Event: ${JSON.stringify(event)}`);
    console.log(`Callback: ${callback}`);

    callback(null, event);
}