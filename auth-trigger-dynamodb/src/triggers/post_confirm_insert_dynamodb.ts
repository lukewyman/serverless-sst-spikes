import { PostConfirmationTriggerEvent, Context, PostConfirmationTriggerHandler, Callback } from 'aws-lambda';
import * as dynamodb from 'aws-sdk/clients/dynamodb';

export const handler: PostConfirmationTriggerHandler = 
  async (event: PostConfirmationTriggerEvent, context: Context, callback: Callback) => {

    const { sub, email, given_name, family_name, preferred_username } = event.request.userAttributes;
    const tableName = process.env.testUsersTable!;
    const test_user = {
      user_id: sub,
      first_name: given_name,
      last_name: family_name,
      stage_name: preferred_username,
      email: email,
    };

    try {
      const docClient = new dynamodb.DocumentClient();

      await docClient.put({
        TableName: tableName,
        Item: test_user,
      })
      .promise();

      console.log(JSON.stringify(test_user));

      callback(null, event);
    } catch (err) {
      console.log(err);
      callback(err, null);
    }
  }