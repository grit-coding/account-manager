import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { sendResponse200, sendResponse400 } from '../common/api_responses';
import { getItemById } from '../common/resources/dynamoDB/dynamoDB';

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return sendResponse400({ message: "missing id from the path" });
  }

  let id = event.pathParameters.id;

  const account = await getItemById(id, process.env.ACCOUNTS_TABLE as string).catch((error) => {
    console.log("error in Dynamo Get", error);
    return null;
  });

  if (!account) {
    return sendResponse400({ message: "Failed to get account by id" });
  }

  return sendResponse200({ account });
};