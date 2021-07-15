import { PostConfirmationTriggerEvent, Context, PostConfirmationTriggerHandler, Callback } from 'aws-lambda';

export const handler: PostConfirmationTriggerHandler = 
  (event: PostConfirmationTriggerEvent, context: Context, callback: Callback) => {

    console.log(`Event: ${JSON.stringify(event)}`);
    console.log(`Callback: ${callback}`);
  
    callback(null, event);
}