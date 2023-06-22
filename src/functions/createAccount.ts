import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { postItem, queryItem } from '../common/resources/dynamoDB/dynamoDB';
import { sendResponse200, sendResponse400, sendResponse409, sendResponse500 } from '../common/api_responses';
import { DateTime } from 'luxon';
import { CreateAccountDto, CreateAccountDtoInterface } from './dto/createAccount.dto';
import { validateOrReject } from 'class-validator';
const accountsTable = process.env.ACCOUNTS_TABLE as string;
export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
    if (!event.body) {
        return sendResponse400({ message: "missing body" });
    }

    const createBody: any = JSON.parse(event.body);

    const validKeys: (keyof CreateAccountDtoInterface)[] = ["firstName", "lastName", "email", "phoneNumber", "address"];

    for (const key in createBody) {
        if (!validKeys.includes(key as keyof CreateAccountDtoInterface)) {
            return sendResponse400({ message: `invalid key in body: ${key}` });
        }
    }

    const eventBodyDto = new CreateAccountDto(createBody);
    try {
        await validateOrReject(eventBodyDto);
    } catch (error) {
        return sendResponse400({ message: 'invalid body', error });
    }
    const data = eventBodyDto;

    const existingAccounts = await queryItem({
        tableName: accountsTable,
        index: "email-index",
        queryKey: "email",
        queryValue: data.email,
    }).catch(((error) => { return sendResponse500({ message: "Failed to query accounts by email", error }) }))

    if (existingAccounts.length) {
        return sendResponse409({ message: "email already exists" });
    }

    const account = {
        id: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
        createdAt: DateTime.utc().toISO(),
    };

    const newAccount = await postItem(account, accountsTable).catch((error) => { return sendResponse500({ message: "Failed to create account", error }) });


    return sendResponse200({ newAccount });
};