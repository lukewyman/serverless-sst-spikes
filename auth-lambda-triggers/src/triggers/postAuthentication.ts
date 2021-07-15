import { PostAuthenticationTriggerEvent, PostAuthenticationTriggerHandler, Context, Callback } from 'aws-lambda';

export const handler: PostAuthenticationTriggerHandler = 
  (event: PostAuthenticationTriggerEvent, context: Context, callback: Callback) => {

    console.log(`Event: ${JSON.stringify(event)}`);
    console.log(`Callback: ${callback}`);

    callback(null, event);
}