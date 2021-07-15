import { PreSignUpTriggerEvent, PreSignUpTriggerHandler, Context, Callback } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = 
  (event: PreSignUpTriggerEvent, context: Context, callback: Callback) => {

    console.log(`Event: ${JSON.stringify(event)}`);
    console.log(`Callback: ${callback}`);

    callback(null, event);
}