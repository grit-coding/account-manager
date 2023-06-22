export const sendResponse = (statusCode: number, data: any = {}): any => ({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
    },
    statusCode: statusCode,
    body: JSON.stringify(data),
});

export const sendResponse200 = (data: any = {}) => sendResponse(200, data);
export const sendResponse400 = (data: any = {}) => sendResponse(400, data);
export const sendResponse409 = (data: any = {}) => sendResponse(409, data);
export const sendResponse500 = (data: any = {}) => sendResponse(500, data);
