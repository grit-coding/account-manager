# Account Manager API
This repository is created for teaching purposes, demonstrating an AWS setup using API Gateway, Lambda, and DynamoDB. It provides practical API examples for creating, retrieving, updating, and deleting accounts. To gain a better understanding of unit testing, be sure to check out how it's done in the *src/common/utils* folder.

Feel free to download, fork, and deploy this repository to your own AWS account. To do so, follow the detailed instructions provided in [Local Setup and Deployment Guide](https://github.com/grit-coding/account-manager/blob/main/docs/local-README.md). This will enable you to set up the project locally and deploy it to AWS Lambda.

## Base URL

The Base URL serves as the root URL for all of the API endpoints. If you ever come across a reference to `{BASE_URL}` in the documentation, you'll need to replace it with your own Base URL. Upon deploying this to your AWS account, a unique Base URL will be provided to you in the console.

## API Endpoints

### `POST /account`

**Full URL:** `{BASE_URL}/account`

Creates a new account.

#### Request body

- `firstName` (string) **[required]**
- `lastName` (string) **[required]**
- `email` (string) **[required]**
- `address` (string) [optional]
- `phoneNumber` (number) [optional]

#### Example

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Oxford street, London",
    "phoneNumber": 1234567890
}
```

### `GET /account/{id}`

**Full URL:** `{BASE_URL}/account/{id}`

Retrieves account information for the given account ID.

### `PATCH /account/{id}`

**Full URL:** `{BASE_URL}/account/{id}`

Updates account information for the given account ID.

#### Request body

- `firstName` (string) [optional]
- `lastName` (string) [optional]
- `email` (string) [optional]
- `address` (string) [optional]
- `phoneNumber` (number) [optional]

#### Example

```json
{
    "lastName": "Smith",
    "address": "123 Oxford street, Leeds",
}
```

### `DELETE /account/{id}`

**Full URL:** `{BASE_URL}/account/{id}`

Deletes the account with the given account ID.

**Note:** Make sure to replace `{id}` with the actual account ID.

## API Key

To use this API, you will need to provide your API key in the header of your HTTP requests. The key should be included as the value for the `x-api-key` field.
