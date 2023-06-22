import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { sendResponse200, sendResponse400, sendResponse500 } from '../common/api_responses';
import { deleteItem } from '../common/resources/dynamoDB/dynamoDB';

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    if (!event.pathParameters || !event.pathParameters.id) {
        return sendResponse400({ message: "missing id from the path" });
    }

    let id = event.pathParameters.id;

    const deleteComments = await deleteItem(id, process.env.ACCOUNTS_TABLE as string).catch((error) => { return sendResponse500({ message: "Failed to delete account", error }) });

    return sendResponse200({ message: `Account ${id} deleted` });
};

