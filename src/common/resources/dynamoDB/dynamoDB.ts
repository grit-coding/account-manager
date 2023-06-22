import { Item, QueryItem, UpdateItem } from "./dynamoDB.interface";

import AWS from "aws-sdk";

const documentClient = new AWS.DynamoDB.DocumentClient();

export const getItemById = async (id: string, TableName: string) => {
    const params = {
        TableName,
        Key: {
            id,
        },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
        throw Error(
            `There was an error fetching the data for id of ${id} from ${TableName}`
        );
    }
    console.log(data);

    return data.Item;
};

export const postItem = async (data: Item, TableName: string) => {
    if (!data.id) {
        throw Error(`no id on the data`);
    }

    const params = {
        TableName,
        Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
        throw Error(
            `There was an error inserting id of ${data.id} in table ${TableName}`
        );
    }

    return data;
};

export const updateItem = async ({
    tableName,
    primaryKey,
    primaryKeyValue,
    updates,
}: UpdateItem) => {
    let updateExpression = 'set ';
    let expressionAttributeValues = {};

    for (const key in updates) {
        updateExpression += `${key} = :${key}, `;
        expressionAttributeValues[`:${key}`] = updates[key];
    }

    // Remove trailing comma and space
    updateExpression = updateExpression.slice(0, -2);

    const params = {
        TableName: tableName,
        Key: { [primaryKey]: primaryKeyValue },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
    };

    const data = await documentClient.update(params).promise();

    return data;
};


export const queryItem = async ({
    tableName,
    index,
    queryKey,
    queryValue,
}: QueryItem) => {
    const params = {
        TableName: tableName,
        IndexName: index,
        KeyConditionExpression: `${queryKey} = :hkey`,
        ExpressionAttributeValues: {
            ":hkey": queryValue,
        },
    };
    const data = await documentClient.query(params).promise();

    return data.Items || [];
};

export const deleteItem = async (id: string, TableName: string) => {
    const params = {
        TableName,
        Key: {
            id,
        },
    };

    const data = await documentClient.delete(params).promise();

    return data;
};