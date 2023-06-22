import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { updateItem } from '../common/resources/dynamoDB/dynamoDB';
import { sendResponse200, sendResponse400, sendResponse409, sendResponse500 } from '../common/api_responses';
import { DateTime } from 'luxon';
import { UpdateAccountDto, UpdateAccountDtoInterface } from './dto/updateAccount.dto';
import { validateOrReject } from 'class-validator';

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    if (!event.pathParameters || !event.pathParameters.id) {
        return sendResponse400({ message: "missing id from the path" });
    }


    if (!event.body || (event.body && event.body === "{}")) {
        return sendResponse400({ message: "missing body" });
    }


    const updateBody: any = JSON.parse(event.body);

    const validKeys: (keyof UpdateAccountDtoInterface)[] = ["firstName", "lastName", "email", "phoneNumber", "address"];

    for (const key in updateBody) {
        if (!validKeys.includes(key as keyof UpdateAccountDtoInterface)) {
            return sendResponse400({ message: `invalid key in body: ${key}` });
        }
    }

    const eventBodyDto = new UpdateAccountDto(JSON.parse(event.body));

    try {
        await validateOrReject(eventBodyDto);
    } catch (error) {
        return sendResponse400({ message: 'invalid body', error });
    }

    let id = event.pathParameters.id;

    const updates = JSON.parse(event.body);

    updates.updatedAt = DateTime.utc().toISO();

    const updatedAccount = await updateItem({
        tableName: process.env.ACCOUNTS_TABLE as string,
        primaryKey: "id",
        primaryKeyValue: id,
        updates,
    }).catch(((error) => { return sendResponse500({ message: "Failed to update user by id", error }) }));

    if (!Object.keys(updatedAccount).length) {
        return sendResponse409({ message: "update not found" });
    }

    return sendResponse200({ updatedAccount });
};
